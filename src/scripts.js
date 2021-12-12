import './styles.css';
import apiCalls from './apiCalls';
import Cookbook from './classes/Cookbook';
import './images/cooking.png'
import './images/like.png'
import './images/plus.png'
import Recipe from './classes/Recipe';
import recipeData from './data/recipes.js'
import User from './classes/User';
import usersData from './data/users';



const recipes = recipeData.map(recipe => {
    return new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags)
});

const users = usersData.map(user => {
  return new User(user.name, user.id, user.pantry)
})

// sections 
const allRecipesSection = document.querySelector('.all-recipes-section');
const singleRecipeSection = document.querySelector('.single-recipe');
const filteredRecipesSection = document.querySelector('#filter-recipes-section');
const filterBox = document.querySelector('.side-nav');
//buttons
const favoriteRecipesButton = document.querySelector('#favoritesButton');
const clearButton = document.querySelector('.clear-button');
const searchInput = document.querySelector('#userInput');
const allRecipesButton = document.querySelector('.recipies');

//global variables 
let tagList = [];
let currentUser = users[Math.floor(Math.random() * users.length)];
const cookBook = new Cookbook(recipes)
let filter = cookBook

//reusable functions 
const hide = (element) => {
  element.classList.add('hidden')
}

const show = (element) => {
  element.classList.remove('hidden')
}

const showFavoriteRecipes = () => {
  allRecipesSection.innerHTML = ''
  filter = currentUser
  const displayFavoriteRecipes = currentUser.favoriteRecipes.forEach(recipe => {
    return allRecipesSection.innerHTML += `
        <div class='recipe'>
        <img class="recipe-image" src="${recipe.image}" id='${recipe.id}' alt="${recipe.name}">
        <h5>${recipe.name}</h5>
        </div>` 
  });
  return displayFavoriteRecipes

}

favoriteRecipesButton.addEventListener("click", () => {
  showFavoriteRecipes()

});


searchInput.addEventListener('input', (e) => {

  let input = e.target.value

  searchInput.addEventListener('input', (e) => {

  if (input && input.trim().length > 0) {
    input = input.trim().toLowerCase()

    allRecipesSection.innerHTML = filter.filterByKeyWord(input).reduce((acc, recipe) => {
      acc += `
        <div class='recipe'>
      <img class="recipe-image" src="${recipe.image}" id='${recipe.id}' alt="${recipe.name}">
      <h5>${recipe.name}</h5>
      </div> 
      `
      return acc
    }, '')
    } else {
      console.log('Input is invalid')
    }
  })
})


clearButton.addEventListener("click", () => {
  searchInput.value = ''
  displayRecipes()
})

    
const displayRecipes = () => {
  const allRecipies = cookBook.recipes.forEach(recipe => {
    return allRecipesSection.innerHTML += `
        <div class='recipe'>
          <img class="recipe-image" src="${recipe.image}" id='${recipe.id}' alt="${recipe.name}">
          <div class= 'name-and-favorite'>
            <h5>${recipe.name}</h5>
            <img class="favorite-image" src="./images/like.png"  alt="favorite">
            <img class="add-image" src="./images/plus.png"  alt="add">
          </div>
        </div>` 
  });
  return allRecipies;
}

const clickRecipe = (event) => { 
  
  if( event.target.name !== undefined){
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
  } else {
    console.log('clicking outside')
  }
  
}


const showFilteredRecipes = () => {
    const filteredRecipes =  filter.filterByTags
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
        allRecipesSection.innerHTML = filteredRecipes
}

// event listeners

window.addEventListener('load', function () {
  displayRecipes();
});


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
        if (!checkbox.checked) {
          checkbox.disabled = true;
        }
      })
    } else if (!this.checked && filter === cookBook) {
      cookBook.filteredRecipes = []
      allRecipesSection.innerHTML = ''
      displayRecipes()
      checkboxes.forEach(checkbox => {
        checkbox.disabled = false
      })
    } else {
      showFavoriteRecipes()
      checkboxes.forEach(checkbox => {
        checkbox.disabled = false
      })
    }
  });

});
