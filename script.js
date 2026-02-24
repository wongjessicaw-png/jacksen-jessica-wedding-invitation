// script.js

// ----------------------
// 1. Guest greeting
// ----------------------
function greetGuest() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('guest');
    const greetingEl = document.getElementById('guestGreeting');

    if (guestName && greetingEl) {
        greetingEl.innerText = `Welcome to the wedding, ${guestName}!`;
    }
}

// ----------------------
// 2. Open Invitation button with fade animation
// ----------------------
function setupOpenInvitation() {
    const btn = document.getElementById('openInvitationBtn');
    const welcomeSection = document.getElementById('section1');
    const mainSections = document.querySelectorAll('#section2, #section3, #section4, #section5, #section6, #section7');

    if (!btn || !welcomeSection) return;

    btn.addEventListener('click', () => {
        // Fade out welcome section
        welcomeSection.classList.add('fade-out');

        // After fade-out, hide welcome and show main sections
        setTimeout(() => {
            welcomeSection.style.display = 'none';

            mainSections.forEach((section, index) => {
                section.classList.remove('hidden');
                // Add fade-in with staggered delay
                section.style.animationDelay = `${index * 0.2}s`;
                section.classList.add('fade-in');
            });

            // Optionally scroll to first section
            if (mainSections[0]) {
                mainSections[0].scrollIntoView({ behavior: 'smooth' });
            }
        }, 1000); // matches CSS fade-out duration
    });
}

// ----------------------
// 3. RSVP Form submission
// ----------------------
function setupRsvpForm() {
    const form = document.getElementById('rsvpForm');
    const rsvpMessage = document.getElementById('rsvpMessage');
    if (!form || !window.firebaseDatabase) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {
            nama: formData.get('nama'),
            jumlah_tamu: Number(formData.get('jumlah_tamu')),
            kehadiran: formData.get('kehadiran'),
            timestamp: Date.now()
        };

        // Push data to Firebase
        const rsvpRef = firebaseDatabase.ref('rsvps');
        rsvpRef.push(data)
            .then(() => {
                rsvpMessage.innerText = 'RSVP submitted successfully! Thank you.';
                form.reset();
            })
            .catch((error) => {
                rsvpMessage.innerText = 'Error submitting RSVP: ' + error.message;
            });
    });
}

// ----------------------
// 4. Message Board
// ----------------------
function setupMessageBoard() {
    const form = document.getElementById('messageForm');
    const input = document.getElementById('messageInput');
    const board = document.getElementById('messageBoard');
    if (!form || !input || !board || !window.firebaseDatabase) return;

    // Submit new message
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = input.value.trim();
        if (!msg) return;

        const messagesRef = firebaseDatabase.ref('messages');
        messagesRef.push({
            message: msg,
            timestamp: Date.now()
        });

        input.value = '';
    });

    // Listen for new messages in real-time
    const messagesRef = firebaseDatabase.ref('messages');
    messagesRef.on('child_added', (snapshot) => {
        const msgData = snapshot.val();
        const div = document.createElement('div');
        div.classList.add('message');
        div.innerText = msgData.message;
        board.appendChild(div);
        board.scrollTop = board.scrollHeight;
    });
}

// ----------------------
// 5. Initialize all
// ----------------------
window.addEventListener('DOMContentLoaded', () => {
    greetGuest();
    setupOpenInvitation();
    setupRsvpForm();
    setupMessageBoard();
});
