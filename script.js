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
// 2. Open Invitation button
// ----------------------
function setupOpenInvitation() {
    const btn = document.getElementById('openInvitationBtn');
    if (!btn) return;

    btn.addEventListener('click', () => {
        const hiddenSections = document.querySelectorAll('.section.hidden');
        hiddenSections.forEach(section => {
            section.classList.remove('hidden');
            section.classList.add('visible');
        });
        // Optionally scroll to the first revealed section
        const firstSection = document.getElementById('section2');
        if (firstSection) firstSection.scrollIntoView({ behavior: 'smooth' });
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
