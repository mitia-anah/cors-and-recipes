const baseEndpoint = "http://www.recipepuppy.com/api";

async function fetchRecipes(query) {
    const res = fetch(`${baseEndpoint}?q=${query}`);
    console.log(res);
}

fetchRecipes('pizza');