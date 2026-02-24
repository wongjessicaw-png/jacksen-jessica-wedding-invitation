// script.js

// Functionality to greet guests based on URL parameters
function greetGuest() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('guest');
    if (guestName) {
        const greeting = `Welcome to the wedding, ${guestName}!`;
        document.getElementById('greeting').innerText = greeting;
    }
}

// RSVP form handling
function handleRsvp(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const rsvpDetails = {};
    formData.forEach((value, key) => {
        rsvpDetails[key] = value;
    });
    console.log('RSVP Details:', rsvpDetails);
    // Here you can implement further handling, like sending data to a server.
}

// Message board functionality
function submitMessage(event) {
    event.preventDefault();
    const message = document.getElementById('messageInput').value;
    const messageBoard = document.getElementById('messageBoard');
    const newMessage = document.createElement('div');
    newMessage.innerText = message;
    messageBoard.appendChild(newMessage);
    document.getElementById('messageInput').value = '';
}

// Firebase placeholder setup (assuming Firebase has been initialized)
function setupFirebase() {
    // Placeholder for Firebase configuration and initialization
    const firebaseConfig = {
        apiKey: 'YOUR_API_KEY',
        authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
        databaseURL: 'https://YOUR_PROJECT_ID.firebaseio.com',
        projectId: 'YOUR_PROJECT_ID',
        storageBucket: 'YOUR_PROJECT_ID.appspot.com',
        messagingSenderId: 'YOUR_SENDER_ID',
        appId: 'YOUR_APP_ID'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // You can implement further database interactions here.
}

// Event Listeners
window.onload = function() {
    greetGuest();
    document.getElementById('rsvpForm').addEventListener('submit', handleRsvp);
    document.getElementById('messageForm').addEventListener('submit', submitMessage);
    setupFirebase();
};
