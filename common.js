// Common utility functions for authentication

export function showMessage(message, type = 'success') {
    // Remove existing messages
    const existingMessage = document.querySelector('.success-message, .error-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message div
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;

    // Insert above form
    const form = document.querySelector('.auth-form');
    if (form && form.parentNode) {
        form.parentNode.insertBefore(messageDiv, form);
    } else {
        console.warn('No .auth-form found to display message');
    }

    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validatePassword(password) {
    return password.length >= 6;
}
export function validateTerms(){
    return document.getElementById('terms').checked;
}
