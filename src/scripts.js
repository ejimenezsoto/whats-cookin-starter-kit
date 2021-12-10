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
    
// const filterTags = () => {
//   const filteredTags = getTags.forEach(tag => {

//     return filterBox.innerHTML += `
//         <div class="tag-container">    
//         <input class="checkbox" type="checkbox" id='${tag}' name='tag'>
//             <label for='${tag}'>'${tag}'</label>
//         </div>
//         `
//   })
//   return filteredTags;
// };



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
  filterTags();
})
allRecipesSection.addEventListener('click', clickRecipe);
const checkboxes = document.querySelectorAll('input[type=checkbox][name=tag]')

let tagList = [];
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        tagList = Array.from(checkboxes)
            .filter(i => i.checked)
            .map(i => i.value)
        console.log(tagList);
    })
})
console.log(checkboxes, '!!!!')
// checkboxes.addEventListener('change', function() {
//     console.log("click")
// })
