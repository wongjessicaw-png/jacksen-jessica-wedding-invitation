// ==========================
// script.js
// ==========================

// 1. Guest greeting from URL ?guest=
function greetGuest() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('guest');
    const greetingEl = document.getElementById('guestGreeting');
    if (guestName && greetingEl) {
        greetingEl.innerText = `Welcome, ${guestName}!`;
    }
}

// 2. Reveal all sections after Open Invitation button click
function setupOpenInvitation() {
    const openBtn = document.getElementById('openInvitationBtn');
    if (!openBtn) return;

    openBtn.addEventListener('click', () => {
        const sections = document.querySelectorAll('.section');
        sections.forEach((section, index) => {
            if (index > 0) { // Skip Section 1
                section.classList.remove('hidden'); // remove hidden class
                section.classList.add('visible');   // trigger fade/slide animation
            }
        });
        // Scroll to the first revealed section
        const firstReveal = sections[1];
        if (firstReveal) {
            firstReveal.scrollIntoView({ behavior: 'smooth' });
        }
        // Hide the Open Invitation button
        openBtn.style.display = 'none';
    });
}

// 3. RSVP form handling (placeholder)
function handleRsvp(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const rsvpDetails = {};
    formData.forEach((value, key) => {
        rsvpDetails[key] = value;
    });
    console.log('RSVP Details:', rsvpDetails);

    const rsvpMessage = document.getElementById('rsvpMessage');
    if (rsvpMessage) {
        rsvpMessage.innerText = "Thank you for your RSVP! Firebase integration will be added later.";
    }
    event.target.reset();
}

// 4. Message board handling (placeholder)
function submitMessage(event) {
    event.preventDefault();
    const messageInput = document.getElementById('messageInput');
    const messageBoard = document.getElementById('messageBoard');
    if (messageInput && messageBoard && messageInput.value.trim() !== '') {
        const newMessage = document.createElement('div');
        newMessage.innerText = messageInput.value.trim();
        messageBoard.appendChild(newMessage);
        messageInput.value = '';
    }
}

// 5. Firebase placeholder setup
function setupFirebase() {
    if (typeof firebase !== 'undefined' && window.firebaseConfig) {
        firebase.initializeApp(window.firebaseConfig);
        // Later: implement database push for RSVP and messages
    }
}

// 6. Optional: reveal sections on scroll (fade-in)
function revealSectionsOnScroll() {
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
// Event listeners on page load
// ==========================
window.addEventListener('DOMContentLoaded', () => {
    greetGuest();
    setupOpenInvitation();
    setupFirebase();

    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) rsvpForm.addEventListener('submit', handleRsvp);

    const messageForm = document.getElementById('messageForm');
    if (messageForm) messageForm.addEventListener('submit', submitMessage);

    // Optional: reveal sections on scroll
    revealSectionsOnScroll();
    window.addEventListener('scroll', revealSectionsOnScroll);
});
