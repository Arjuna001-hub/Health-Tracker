document.addEventListener('DOMContentLoaded', () => {
    const guestNav = document.getElementById('guest-nav');
    const userNav = document.getElementById('user-nav');
    const navUsername = document.getElementById('nav-username');
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if (currentUser) {
        guestNav.style.display = 'none';
        userNav.style.display = 'flex';
        userNav.style.alignItems = 'center';
        navUsername.textContent = `Welcome, ${currentUser.username}!`;
    } else {
        guestNav.style.display = 'flex';
        userNav.style.display = 'none';
    }

    const healthTips = [
        "Drink at least 8 glasses of water a day to stay hydrated and boost your metabolism.",
        "Incorporate at least 30 minutes of moderate exercise into your daily routine.",
        "Aim for 7-9 hours of quality sleep per night for better physical and mental health.",
        "Fill half of your plate with fruits and vegetables at every meal.",
        "Practice mindfulness or meditation for 10 minutes a day to reduce stress.",
        "Choose whole grains like oats, brown rice, and quinoa over refined grains.",
        "Limit processed foods, sugary drinks, and excessive saturated fats.",
        "Take short breaks to stand and stretch if you have a sedentary job."
    ];

    const healthTipText = document.getElementById('health-tip-text');
    const newTipButton = document.getElementById('new-tip-button');

    newTipButton.addEventListener('click', () => {
        let newTip = healthTips[Math.floor(Math.random() * healthTips.length)];
        while (newTip === healthTipText.textContent) {
            newTip = healthTips[Math.floor(Math.random() * healthTips.length)];
        }
        healthTipText.textContent = newTip;
    });
});