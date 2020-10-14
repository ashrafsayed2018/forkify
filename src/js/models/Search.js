import axios from "axios";
import {proxy,key,ID} from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            
            const response = await axios(`${proxy}https://api.edamam.com/search?q=${this.query}&app_id=${ID}&app_key=${key}&to=30`)
    
            this.recipes = response.data.hits;
          
        } catch (error) {
            console.log(error)
        }
        
    }
    
  
}
