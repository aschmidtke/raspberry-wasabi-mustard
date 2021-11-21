async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim(); // check email-login id with handlebars
    const password = document.querySelector('#password-login').value.trim(); // check password-login id with handlebars

    if (email && password) {
        const response = await fetch('api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/dashboard'); // check with team to see where we want to send logged in users
        } else {
            alert(response.statusText);
        }
    }
}

async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim(); // dbl check hbars
    const email = document.querySelector('#email-signup').value.trim(); // same
    const password = document.querySelector('#password-signup').value.trim(); // same

    if (username && email && password) {
        const response = await fetch('api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText)
        }
    }
}


// check both of these for form names and button types
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);