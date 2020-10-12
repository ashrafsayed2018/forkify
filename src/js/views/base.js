export const elements = {
    searchForm : document.querySelector('.search'),
    searchInput : document.querySelector('.search__field'),
    searchRes : document.querySelector('.results'),
    searchResultList : document.querySelector('.results__list')
}

export const elementClass = {
    loader : "loader"
}
 
// render the loader 

export const renderLoader = parent => {
    const loader = `
      <div class="${elementClass.loader}">
         <img src="img/loader.png" alt="loader image">
      </div>
    `;

    parent.insertAdjacentHTML('afterbegin',loader)
}

// function to clear loader

export const clearLoader = parent => {
    const loader = document.querySelector(`.${elementClass.loader}`);

    if(loader) 
        parent.removeChild(loader)

}