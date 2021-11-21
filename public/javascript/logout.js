async function logout() {
    const reponse = await fetch('/api/users/logout', { // dbl check routes
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

// check names and button type
document.querySelector('#logout').addEventListener('click', logout);