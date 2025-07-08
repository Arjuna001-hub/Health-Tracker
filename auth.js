document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginError = document.getElementById('login-error');
    const registerError = document.getElementById('register-error');

    const getUsers = () => JSON.parse(localStorage.getItem('users')) || [];
    const saveUsers = (users) => localStorage.setItem('users', JSON.stringify(users));

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const users = getUsers();

            if (users.find(user => user.email === email)) {
                registerError.textContent = 'User with this email already exists.';
                return;
            }

            const newUser = { id: Date.now(), username, email, password };
            users.push(newUser);
            saveUsers(users);
            alert('Registration successful! Please log in.');
            window.location.href = 'login.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const users = getUsers();
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                sessionStorage.setItem('currentUser', JSON.stringify(user));
               
                window.location.href = 'app/nutrition.html';
            } else {
                loginError.textContent = 'Invalid email or password.';
            }
        });
    }
});