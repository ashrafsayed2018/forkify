// Global app controller
import Search from "./models/Search"
import Recipe from './models/Recipe';
import * as searchView from "./views/searchView"
import {elements, renderLoader, clearLoader, elementClass} from "./views/base"

/* *  - the global state of the app 

   - the search object 
   - current recipe object 
   - shopping list object 
   - liked recipes
*/
const state = {} 
// Search Controller

const controlSearch = async () => {

    // 1) get the query from the view 
         const query = searchView.getInput() // TODO
         if(query) {
           // add new search object to the state 
           state.search = new Search(query)  
       
        // 2) preparing UI for results
          searchView.clearResults();
          searchView.clearInput()
          renderLoader(elements.searchRes)
        try {
          // 3) search for recipes
              await state.search.getResults();
      
          // 4) rednder results on UI
      
            searchView.renderRecipes(state.search.recipes)
      
            clearLoader(elements.searchRes)

        } catch(err) {
          alert(err)
          clearLoader(elements.searchRes)
        }
    }

}
// // adeventlister to form submit 

elements.searchForm.addEventListener('submit', (event) => {
   event.preventDefault();
    controlSearch();
})

// add event listener to result page for pagination 

elements.resultPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if(btn) {
    const goToPage = parseInt(btn.dataset.goto,10);
    searchView.clearResults();
    searchView.clearPagination()
    searchView.renderRecipes(state.search.recipes,goToPage)

  }
} )

// Recipe Controller 

// const r = new Recipe("77c46394614816ca97c0b371970afe0e")
// r.getRecipe()
// r.calcTime()
// console.log(r)
const controlRecipe = async () => {
  // get the id from url
  const id = window.location.hash.replace('#','');

  if(id) {
    // prepare UI for changes 

    // create new recipe object

    state.recipe = new Recipe(id)

    try {
      // get recipe data 

      await state.recipe.getRecipe()

      // calculate servings and time 

      state.recipe.calcTime();
      state.recipe.calcServings()

      // render the recipe 
      console.log(state.recipe)

    } catch(err) {
      alert ('error processing recipe')
    }

  }
  
  
}
// window.addEventListener('hashchange',controlRecipe)
['hashchange','load'].forEach(event =>  window.addEventListener(event,controlRecipe));



