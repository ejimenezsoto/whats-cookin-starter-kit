import './styles.css';
import apiCalls from './apiCalls';
import Cookbook from './classes/Cookbook';
import './images/cooking.png'
import Recipe from './classes/Recipe';
import recipeData from './data/recipes.js'

const recipes = recipeData.map(recipe => {
    return new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags)
});

const allRecipesSection = document.querySelector('.all-recipes-section');
const singleRecipeSection = document.querySelector('.single-recipe');
const filterBox = document.querySelector('.side-nav');
const filteredRecipesSection = document.querySelector('#filter-recipes-section');
let tagList = [];




const cookBook = new Cookbook(recipeData)


const hide = (element) => {
  element.classList.add('hidden')
}

const show = (element) => {
  element.classList.remove('hidden')
}

const getTags = recipes.reduce((acc, recipe) => {
  recipe.tags.forEach(tag => {
    if (!acc.includes(tag)) {
      acc.push(tag);
    }
  });
  return acc;
}, []);
    
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
  const recipeInstructions = findRecipeId.instructions.reduce((acc, instruction) => {
    acc += `<li>${instruction.instruction}</li>`
    return acc
  }, '' )

  const ingredientList  = findRecipeId.listIngredients().reduce((acc, ingredient) => {
    acc += `<li>${ingredient}</li>`
    return acc
  }, '');

  singleRecipeSection.innerHTML = `
            <div class="single-recipe-img"> <img src="${findRecipeId.image}" alt=""> </div>
            <div class="ingredient-instructions-section">${recipeInstructions} </div>
            <div class="ingredient-list"><p> ${ingredientList} </p> </div>
            <div class="total-cost"> <h1>$${findRecipeId.costOfIngredients()} </div> 
    `
}


window.addEventListener('load', function () {
    displayRecipes();
})

allRecipesSection.addEventListener('click', clickRecipe);
const checkboxes = document.querySelectorAll('input[type=checkbox][name=tag]')


checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        document.querySelectorAll('.checkbox').checked = true;
        document.querySelectorAll('.checkbox').checked = false;

        if (this.checked) {
            tagList = Array.from(checkboxes)
                .filter(i => i.checked)
                .map(i => i.id)
            showFilteredRecipes()

              checkboxes.forEach(checkbox => {
                if(!checkbox.checked){
                  checkbox.disabled = true;
                }
              })

        } else if (!this.checked) {
          cookBook.filteredRecipes = []
          allRecipesSection.innerHTML = ''
          displayRecipes()
          checkboxes.forEach(checkbox => {
            checkbox.disabled = false
          })
        }
        console.log(this)
    });
    
});

const showFilteredRecipes = () => {

    const filteredRecipes =  cookBook.filterByTags
    
    (tagList).reduce((acc,recipe) => {
        allRecipesSection.innerHTML = ``
        acc += `
          <div class='recipe'>
        <img class="recipe-image" src="${recipe.image}" id='${recipe.id}' alt="${recipe.name}">
        <h5>${recipe.name}</h5>
        </div> 
        `
        
        return acc
    }, '');
        console.log(tagList)
        console.log(filteredRecipesSection)
        allRecipesSection.innerHTML = filteredRecipes
}
