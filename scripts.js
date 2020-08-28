const baseEndpoint = "http://www.recipepuppy.com/api";
const proxy = 'https://cors-anywhere.herokuapp.com/';
const form = document.querySelector('form.search');
const recipesEl = document.querySelector('.recipes')
const ingredientEl = document.querySelectorAll('[type="checkbox"]');

async function fetchRecipes(query, ing) {
    // ingredient will be an array ['salt', 'oil',.....]
    const ingString = ing.join(',')
    const res = await fetch(`${proxy}${baseEndpoint}?q=${query}&i=${ingString}`);
    const data = await res.json();
    console.log(data);
    return data;
}

async function handleSubmit(event) {
    event.preventDefault();
    const el = event.currentTarget;
    fetchAndDisplay(el.query.value);
}

async function fetchAndDisplay(query) {
    // turn the form off
    form.submit.disabled = true;
    //handle checkbox here
    let ing = [];
    ingredientEl.forEach(checkbox => {
        if (checkbox.checked) {
            ing.push(checkbox.name);
        }
    });
    // submit the search
    const recipes = await fetchRecipes(query, ing);
    // turn the form off
    form.submit.disabled = false;
    console.log(recipes);
    displayRecipes(recipes.results);
}


function displayRecipes(recipes) {
    console.log('creating html');
    const html = recipes.map(recipe => {
                return `
            <div>
                <h2>${recipe.title}</h2>
                <p>${recipe.ingredients}</p>
                ${recipe.thumbnail && 
                    `<img src="${recipe.thumbnail}"
                    alt="${recipe.title}"/>`}
                <a href="${recipe.href}">View Recipe -></a>
            </div>
        `;
    });
        recipesEl.innerHTML = html.join('');
}
    form.addEventListener('submit', handleSubmit);
    fetchAndDisplay('pizza');