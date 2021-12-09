import './styles.css';
import apiCalls from './apiCalls';
import Cookbook from './classes/Cookbook';
import './images/cooking.png'
import Recipe from './classes/Recipe';
import recipeData from './data/recipes'
    
console.log(recipeData, "!!!!!!!!")

// const recipes = recipeData.map(recipe => {
//     return new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags)
// });

const recipeRow = document.querySelector('.all-recipes-section')

const cookBook = new Cookbook(recipes)

window.onload = displayRecipes();

const displayRecipes = () => {
  const allRecipies = cookBook.recipies.forEach(recipe => {
    recipeRow.innerHTML += `
    <div >
        <img src="${recipe.image}" alt="${recipe.name}">
        <h3>${recipe.name}</h3>
    </div>` 
  });
  return allRecipies;
}

console.log('Hello world');
