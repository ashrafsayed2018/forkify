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
    const uri = el.recipe.uri.split('_');
    const splitedUri = uri[1]
    const markup = `
    <li>
        <a class="results__link" href="#${splitedUri}">
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

const createButton = (page, type) => {
  const button = `

  <button class="btn-inline results__btn--${type}" data-goto="${type === "prev" ? page -1 : page + 1}">
  <span>Page ${type === "prev" ? page -1 : page + 1}</span>
  <svg class="search__icon">
      <use href="img/icons.svg#icon-triangle-${type === "prev" ? 'left' : 'right'}"></use>
  </svg>
</button>
  `

    elements.resultPages.insertAdjacentHTML('afterbegin', button)
}

// function to render buttons 

const renderButtons = (page, numResults,resPerPage) => {
    const pages = Math.ceil(numResults/ resPerPage);
    let button;

    if(page === 1 && pages > 1) {
        // only button next button 
        button = createButton(page,'next')
    }

    else if(page === pages && pages > 1) {
        // only button prev button 
        button = createButton(page,'prev')
    } else {
        // use the both buttons
        button = `
        ${createButton(page,'prev')}
         ${createButton(page,'next')}
        `
    }


}
// function to render the recipes result in the UI view

export const renderRecipes = (recipes,page = 1, resPerPage = 10) => {
    // render result of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
   recipes.slice(start,end).forEach(el => renderRecipe(el))

   // render pagination button 
   renderButtons(page,recipes.length,resPerPage)
}

// clear search input 

export const clearInput = () => elements.searchInput.value = "";

// clear search list 
export const clearResults = () => elements.searchResultList.innerHTML = "";

// clear pagination 
export const clearPagination = () => elements.resultPages.innerHTML = "";

