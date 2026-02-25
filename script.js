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
// 2. Open Invitation button with smooth animation
// ----------------------
function setupOpenInvitation() {
    const btn = document.getElementById('openInvitationBtn');
    const welcomeSection = document.getElementById('section1');
    const mainSections = document.querySelectorAll('#section2, #section3, #section4, #section5, #section6, #section7');

    if (!btn || !welcomeSection) return;

    btn.addEventListener('click', () => {
        // 1. Fade out welcome
        welcomeSection.classList.add('fade-out');

        // 2. PREPARE main sections BEFORE animation ends
        mainSections.forEach((section) => {
            section.classList.remove('hidden');
            section.style.opacity = 0;
            section.style.transform = 'translateY(30px)';
        });

        // 3. After fade-out completes
        setTimeout(() => {
            // Instead of removing → just hide safely
            welcomeSection.style.display = 'none';

            // 4. Trigger smooth fade-in
            mainSections.forEach((section, index) => {
                setTimeout(() => {
                    section.style.transition = 'all 0.8s ease';
                    section.style.opacity = 1;
                    section.style.transform = 'translateY(0)';
                }, index * 150);
            });

            // 5. Smooth scroll
            if (mainSections[0]) {
                mainSections[0].scrollIntoView({ behavior: 'smooth' });
            }

        }, 600); // match CSS (important!)
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
