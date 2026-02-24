// script.js

// ==========================
// Guest greeting from URL ?guest=
// ==========================
function greetGuest() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('guest');
    const greetingEl = document.getElementById('guestGreeting');
    if (guestName && greetingEl) {
        greetingEl.innerText = `Welcome, ${guestName}!`;
    }
}

// ==========================
// Section reveal animation on scroll
// ==========================
function revealSections() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight - 100;
        if(sectionTop < triggerPoint) {
            section.classList.add('visible');
        }
    });
}

// ==========================
// Smooth scroll for Open Invitation button
// ==========================
function setupOpenInvitation() {
    const openBtn = document.getElementById('openInvitationBtn');
openBtn.addEventListener('click', () => {
    // Select all sections except the first one
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        if(index > 0) { // skip Section 1
            section.classList.add('visible');
        }
    });
    // Scroll smoothly to the first revealed section
    sections[1].scrollIntoView({ behavior: 'smooth' });
});
    }
}

// ==========================
// RSVP form handling
// ==========================
function handleRsvp(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const rsvpDetails = {};
    formData.forEach((value, key) => {
        rsvpDetails[key] = value;
    });

    console.log('RSVP Details:', rsvpDetails);

    // Display temporary message
    const rsvpMessage = document.getElementById('rsvpMessage');
    if(rsvpMessage) {
        rsvpMessage.innerText = "Thank you for your RSVP! Firebase integration will be added later.";
    }

    event.target.reset();
}

// ==========================
// Message board handling (placeholder)
// ==========================
function submitMessage(event) {
    event.preventDefault();
    const messageInput = document.getElementById('messageInput');
    const messageBoard = document.getElementById('messageBoard');
    if(messageInput && messageBoard && messageInput.value.trim() !== '') {
        const newMessage = document.createElement('div');
        newMessage.innerText = messageInput.value.trim();
        messageBoard.appendChild(newMessage);
        messageInput.value = '';
    }
}

// ==========================
// Firebase placeholder setup
// ==========================
function setupFirebase() {
    // Firebase config will be added after deployment
    const firebaseConfig = {
        apiKey: 'YOUR_API_KEY',
        authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
        databaseURL: 'https://YOUR_PROJECT_ID.firebaseio.com',
        projectId: 'YOUR_PROJECT_ID',
        storageBucket: 'YOUR_PROJECT_ID.appspot.com',
        messagingSenderId: 'YOUR_SENDER_ID',
        appId: 'YOUR_APP_ID'
    };
    if(typeof firebase !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
    }
    // Later: add database push for RSVP and messages
}

// ==========================
// Event listeners on page load
// ==========================
window.addEventListener('DOMContentLoaded', () => {
    greetGuest();
    setupOpenInvitation();
    setupFirebase();

    const rsvpForm = document.getElementById('rsvpForm');
    if(rsvpForm) rsvpForm.addEventListener('submit', handleRsvp);

    const messageForm = document.getElementById('messageForm');
    if(messageForm) messageForm.addEventListener('submit', submitMessage);

    // Reveal sections on scroll
    revealSections();
    window.addEventListener('scroll', revealSections);
});
