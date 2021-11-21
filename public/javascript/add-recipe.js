async function newRecipe(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="recipe-title"]').value; //check these inputs
    const ingredients = document.querySelector('input[name="recipe-ingredients"]').value; //check these inputs
    const directions = document.querySelector('input[name="recipe-directions"]').value;

    const response = await fetch(`/api/recipes`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            ingredients,
            directions
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        document.location.replace('/dashboard'); //check location
    } else {
        alert(response.statusText);
    }
}

//check these values
document.querySelector('.new-recipe-form').addEventListener('submit', newRecipe);