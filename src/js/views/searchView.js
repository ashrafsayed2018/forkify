import {elements} from './base';
export const getInput = () => elements.searchInput.value;

// function to limit the title length to 17 chars and add ... if it more

const limitRecipeTitle = (title, limit = 17) => {
    let newTitle = []
    if(title.length > limit) {
            title.split(' ').reduce((acc,cur) => {

                if(acc + cur.length <= limit) {

                    newTitle.push(cur)
                }
                
                    return cur.length + acc;
            }, 0)

            // return the result 

            return `${newTitle.join(' ')} ...`;

        }

        return title;
}

// function to render one recipe 

const renderRecipe = el => {
    const markup = `
    <li>
        <a class="results__link" href="#">
            <figure class="results__fig">
                <img src="${el.recipe.image}" alt="${el.recipe.label}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(el.recipe.label)}</h4>
                <p class="results__author">${el.recipe.source}</p>
            </div>
        </a>
    </li>
    `;

    elements.searchResultList.insertAdjacentHTML('beforeend',markup)

}

// function to render the recipes result in the UI view

export const renderRecipes = recipes => {
   recipes.forEach(el => renderRecipe(el))
}

// clear search input 

export const clearInput = () => elements.searchInput.value = "";

// clear search list 
export const clearResults = () => elements.searchResultList.innerHTML = "";