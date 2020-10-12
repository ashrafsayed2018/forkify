// Global app controller
import Search from "./models/Search"
import * as searchView from "./views/searchView"
import {elements, renderLoader, clearLoader, elementClass} from "./views/base"

/* *  - the global state of the app 

   - the search object 
   - current recipe object 
   - shopping list object 
   - liked recipes
*/
const state = {}

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

    // 3) search for recipes
        await state.search.getResults();

    // 4) rednder results on UI
      //  searchView.renderRecipes(state.search.getResults())
      // console.log(state.search.recipes[0].recipe.image)
      searchView.renderRecipes(state.search.recipes)
      console.log(state.search.recipes)
      clearLoader(elements.searchRes)
    }

}
// // adeventlister to form submit 

elements.searchForm.addEventListener('submit', (event) => {
   event.preventDefault();
    controlSearch();
})

console.log(elements.searchBtn)

