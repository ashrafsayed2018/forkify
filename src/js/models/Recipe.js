import axios from "axios";
import {proxy,key,ID} from '../config';
import { elements } from "../views/base";


export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    // method to get recipe 

   async getRecipe() {
          try {
            // geting the result from axios fetch

            const res = await axios(`${proxy}https://api.edamam.com/search?q=${this.id}&app_id=${ID}&app_key=${key}&from=0&to=10&exact=true`)
            // console.log(res.data.hits[0].recipe)
            this.label = res.data.hits[0].recipe.label;
            this.source = res.data.hits[0].recipe.source;
            this.image = res.data.hits[0].recipe.image;
            this.url = res.data.hits[0].recipe.url;
            this.ingredients = res.data.hits[0].recipe.ingredients
            console.log(res.data.hits[0].recipe)
            
          } catch(err) {
              console.log(err)
          }
    }

    // method to calculate the time of cooking 

     calcTime() {

        // assuming we need 15 minutes for each 3 ingredients 
        if(this.ingredients) {
            const numIng =  this.ingredients.length;
            const periods = Math.ceil(numIng/3);
            this.time = periods * 15;
        }
      
    }

    // calculate servings
    calcServings() {
        this.servings = 4 
    }
}