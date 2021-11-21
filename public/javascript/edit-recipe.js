async function editRecipe(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="recipe-title"]').value.trim(); // check values
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ]
    const response = await fetch(`/api/recipes/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            ingredients,
            directions
        }),
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) {
        document.location.replace('/dashboard'); // check values
    } else {
        alert(response.statusText);
    }
}

// check values
document.querySelector('.edit-recipe-form').addEventListener('submit', editRecipe);