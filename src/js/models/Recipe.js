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
    
    // parsing the ingredients 

    pareseIngredients() {
        const unitsLong = ['tablespoons','tablespoon','ounces','ounce','cups','cup','teaspoons','teaspoon','pounds','pound'];
        const unitsShort = ['tbsp','tbsp','oz','oz','cup','cup','tsp','tsp','pound','pound'];
        const units = [...unitsShort,'kg','g']
        const newIngredient = this.ingredients.map(el => {
      
         // uniform uinit
         let ingredient = el.text.toLowerCase();
         console.log(ingredient)

         unitsLong.forEach((unit,i) => {
             ingredient = ingredient.replace(unit,units[i])
         })

         // remove parantheses
         ingredient.replace(/ *\([^)]*\) */g, ' ');

         // parse ingredients into [ unit count ingredient ]
             // converting the ingredient text to an array
             const arrIng  = ingredient.split(' ');
             // define the loaction of the unit like tbsp or cup or pound or oz
             const unitIndex = arrIng.findIndex(element => units.includes(element))
            // final object which will be returned;
            let ingObj;
             if(unitIndex > -1) {
                 // there is unit
                 // ex 4 1/2 cups arrCount is [4,1/2]
                 // ex 7 cups arrCount is [7]
                 const arrCount = arrIng.slice(0,unitIndex);
                 let count;
                 if(arrCount.length === 1) {
                     count = eval(arrIng[0].replace("-","+"));
                 } else {
                     count = eval(arrIng.slice(0,unitIndex).join('+'))
                 }
                 ingObj = {
                     count,
                     unit : arrIng[unitIndex],
                     ingredient : arrIng.slice(unitIndex + 1).join(' ')
                 }
             } else if (parseInt(arrIng[0])) {
               // there is no unit but first element is number
               ingObj = {
                   count :parseInt(arrIng[0]),
                   unit : '',
                   ingredient : arrIng.slice(1).join(' ')
               }
             }
             
             else if (unitIndex === -1) {
                 // there is no unit and no number in first position
                 ingObj = {
                     count : 1,
                     unit : '',
                     ingredient
                 }
             }

            //  console.log(arrIng, ingredient)
            //  console.log(ingObj)
            return ingObj
             
        })
        this.ingredients = newIngredient;
        // console.log(newIngredient)
    }

}

// #5c901aed161f02b38b3d360d7488d425