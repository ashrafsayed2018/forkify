import {elements} from './base';
export const getInput = () => elements.searchInput.value;

// function to render one recipe 

const renderRecipe = el => {
    const markup = `
    <li>
        <a class="results__link" href="#">
            <figure class="results__fig">
                <img src="${el.recipe.image}" alt="${el.recipe.label}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${el.recipe.label}</h4>
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