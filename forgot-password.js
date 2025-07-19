// Forgot Password page JavaScript with Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";

// Local helper functions
import { showMessage, validateEmail } from './common.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOeXqRu3sFQMgzJjzjpvoIC2e2OhrRnoM",
  authDomain: "tiens-b1300.firebaseapp.com",
  projectId: "tiens-b1300",
  storageBucket: "tiens-b1300.appspot.com",
  messagingSenderId: "172538440844",
  appId: "1:172538440844:web:b835a71e3b39359601dfa9",
  measurementId: "G-5GGPTW9YDZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app); // Optional
const auth = getAuth(app);

// Forgot password form handler
function handleForgotPassword(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    
    if (!validateEmail(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    showMessage('Sending reset instructions...');
    
    sendPasswordResetEmail(auth, email)
        .then(() => {
            showMessage('Reset instructions sent to your email! Ckeck inbox or spam folder.');
            event.target.reset();
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        })
        .catch((error) => {
            const errorMessage = error.message;
            showMessage(errorMessage, 'error');
        });
}

// DOM ready
document.addEventListener('DOMContentLoaded', function () {
    const loadingOverlay = document.getElementById('loadingOverlay');
    window.addEventListener('load', function () {
        if (loadingOverlay) loadingOverlay.classList.add('hidden');
    });

    const forgotForm = document.getElementById('forgotForm');
    if (forgotForm) {
        forgotForm.addEventListener('submit', handleForgotPassword);
    }

    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        input.addEventListener('blur', function () {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
});
