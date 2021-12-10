import './styles.css';
import apiCalls from './apiCalls';
import Cookbook from './classes/Cookbook';
import './images/cooking.png'
import Recipe from './classes/Recipe';
import recipeData from './data/recipes.js'
    
console.log(recipeData, "!!!!!!!!")

const recipes = recipeData.map(recipe => {
    return new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags)
});

const allRecipesSection = document.querySelector('.all-recipes-section');
const singleRecipeSection = document.querySelector('.single-recipe');


const cookBook = new Cookbook(recipeData)


const hide = (element) => {
    element.classList.add('hidden')
}

const show = (element) => {
    element.classList.remove('hidden')
}


const displayRecipes = () => {
    const allRecipies = cookBook.recipes.forEach(recipe => {
        return allRecipesSection.innerHTML += `
        <div class='recipe'>
        <img class="recipe-image" src="${recipe.image}" id='${recipe.id}' alt="${recipe.name}">
        <h5>${recipe.name}</h5>
        </div>` 
    });
    return allRecipies;
}

const clickRecipe = (event) => {
    
    hide(allRecipesSection)
    show(singleRecipeSection)
    const findRecipeId =  recipes.find( ( { id} ) => id == event.target.id)
    const recipeInstructions = findRecipeId.instructions.reduce((acc,instruction) => {
        acc += `<li>${instruction.instruction}</li>`
        return acc
    }, '' )

    const ingredientList  = findRecipeId.listIngredients().reduce((acc,ingredient) => {
        acc += `<li>${ingredient}</li>`
        return acc
    }, '');

    
        
    console.log(recipeInstructions)
    

    singleRecipeSection.innerHTML = `
            <div class="single-recipe-img"> <img src="${findRecipeId.image}" alt=""> </div>
            <div class="ingredient-instructions-section">${recipeInstructions} </div>
            <div class="ingredient-list"><p> ${ingredientList} </p> </div>
            <div class="total-cost"> <h1>$${findRecipeId.costOfIngredients()} </div> 
    `
}



window.addEventListener('load', displayRecipes)
allRecipesSection.addEventListener('click', clickRecipe);

