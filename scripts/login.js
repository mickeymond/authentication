// Access login btn
const loginBtn = document.getElementById('login-btn');
// Access the login form from the DOM
const loginForm = document.getElementById('login-form');
// Attach submit event listener to login form
loginForm.addEventListener('submit', function (event) {
    // Show loading indicator
    loginBtn.classList.add('animate-spin');
    // Prevent default submit behaviour
    event.preventDefault();
    // Collect user inputs
    const data = new FormData(event.target);
    // Post inputs to backend API
    fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            "email": data.get('email'),
            "password": data.get('password')
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.access_token) {
                // Store access token in localStorage
                localStorage.setItem('ACCESS_TOKEN', data.access_token);
                // Naviagte to profile page
                location.replace('./profile.html');
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.log(error))
        .finally(() => {
            // Hide loading indicator
            loginBtn.classList.remove('animate-spin');
        });
});