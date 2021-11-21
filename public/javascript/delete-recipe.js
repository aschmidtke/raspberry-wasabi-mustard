async function deleteRecipe(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ]
    const response = await fetch(`/api/recipes/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        document.location.replace('/dashboard'); // where do we want to send them?
    } else {
        alert(response.statusText);
    }
}

// check these values
document.querySelector('.delete-recipe-btn').addEventListener('click', deleteRecipe);