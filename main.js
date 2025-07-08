document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const logoutButton = document.getElementById('logout-button');

    
    if (!currentUser && logoutButton) {
        window.location.href = 'index.html';
        return; 
    }
    
   
    const welcomeMessage = document.getElementById('welcome-message');
    if (welcomeMessage && currentUser) {
        welcomeMessage.textContent = `Welcome, ${currentUser.username}! Track Your Nutrition`;
    }

    
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            sessionStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }
});