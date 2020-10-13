import axios from "axios";

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const APP_KEY = "8f3fc0459205333fed12f58fabfe91df"
        const APP_ID  = "b7272e98"
        try {
            
            const response = await axios(`${proxy}https://api.edamam.com/search?q=${this.query}&app_id=${APP_ID}&app_key=${APP_KEY}&to=30`)
    
            this.recipes = response.data.hits;
          
        } catch (error) {
            console.log(error)
        }
        
    }
    
  
}
