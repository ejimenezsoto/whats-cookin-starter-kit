import './styles.css';
import apiCalls from './apiCalls';
import Cookbook from './classes/Cookbook';
import './images/cooking.png'
import './images/like.png'
import './images/plus.png'
import './images/menu.png'
import './images/shopping-cart.png'
import Recipe from './classes/Recipe';
import User from './classes/User';
import { userData, recipesData, ingredientData } from './apiCalls';
import Pantry from './classes/Pantry';
import domUpdates from './domUpdates';




// html sections 
const allRecipesSection = document.querySelector('.all-recipes-section');
const singleRecipeSection = document.querySelector('.single-recipe');
const favoriteRecipeSection = document.querySelector('.my-favorites-section');
const mealsToCookSection = document.querySelector('.meals-to-cook-section');
const tagNavSection = document.querySelector('.side-nav');
const pantrySection = document.querySelector('.pantry-section');
const pantryTable = document.querySelector('.pantry-table');

// html titles
const pageTitle = document.querySelector('.page-title');

// html inputs
const checkboxes = document.querySelectorAll('input[type=checkbox][name=tag]')
const searchInput = document.querySelector('#userInput');

// html buttons
const favoriteRecipesButton = document.querySelector('#favoritesButton');
const clearButton = document.querySelector('.clear-button');
const allRecipesButton = document.querySelector('.recipies');
const pantryButton = document.querySelector('.pantry-button');
const mealsToCookButton = document.querySelector('.planner');



//global variables ***************************** 

let tagList = [];
let currentRecipe;
let recipes;
let users;
let cookBook;
let filter;
let currentUser;
let pantry;


// fetch apis *************************************
Promise.all([userData, recipesData, ingredientData])
  .then(data => {
    recipes = data[1].map(recipe => {
      return new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags, data[2])
    });
    users = data[0].map(user => {
      return new User(user.name, user.id, pantry = new Pantry(user.pantry, data[2]), data[2])
    });
    cookBook = new Cookbook(recipes);
    filter = cookBook;
    currentUser = users[Math.floor(Math.random() * users.length)];
    currentUser.pantry.listIngredientsNameAndAmount()
    domUpdates.displayRecipes();
    filterByCheckBoxes();
  })
  .catch(error => domUpdates.displayError(error))

//reusable functions ***************************
const hide = (element) => {
  element.classList.add('hidden')
};

const show = (element) => {
  element.classList.remove('hidden')
};


// Event Hnadlers ******************************

const addMissingIngredients = (event) => {
  if (event.target.id === 'shoppingCart') {
    currentUser.pantry.addMissingIngredients(currentUser)
  } else {
    console.log('didnt hit shopping cart');
  }
}

const cookMeal = (event) => {
  if (event.target.id === 'cookImg') {
    currentUser.pantry.cookRecipe(currentUser)
  } else {
    console.log('didnt hit');
  }
}

const filterByCheckBoxes = () => {
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
      document.querySelectorAll('.checkbox').checked = true;
      document.querySelectorAll('.checkbox').checked = false;
      if (this.checked) {
        tagList = Array.from(checkboxes)
          .filter(i => i.checked)
          .map(i => i.id)
        domUpdates.showFilteredRecipes()
        checkboxes.forEach(checkbox => {
          if (!checkbox.checked) {
            checkbox.disabled = true;
          }
        })
      } else if (!this.checked && filter === cookBook) {
        cookBook.filteredRecipes = []
        allRecipesSection.innerHTML = ''
        domUpdates.displayRecipes()
        checkboxes.forEach(checkbox => {
          checkbox.disabled = false
        })
      } else {
        domUpdates.showFavoriteRecipes()
        checkboxes.forEach(checkbox => {
          checkbox.disabled = false
        })
      }
    });
  });
};

const addSingleRecipe = (event) => {
  if (event.target.id === 'add-meal-button') {
    currentUser.addToCook(currentRecipe)
  } else if (event.target.id === 'favorite-button') {
    currentUser.addToFavorites(currentRecipe)
  }
};

// event listeners ***********************************************

allRecipesSection.addEventListener('click', (event) => {
  domUpdates.clickRecipe(event)
});

allRecipesSection.addEventListener('keydown', (event) => {
  if (event.which === 13) {
    domUpdates.clickRecipe(event)
  } else {
    console.log('outside')
  }
});
  
favoriteRecipeSection.addEventListener('click', (event) => {
  domUpdates.clickRecipe(event)
});

favoriteRecipeSection.addEventListener('keydown', (event) => {
  if (event.which === 13) {
    domUpdates.clickRecipe(event)
  } else {
    console.log('outside')
  }
});

mealsToCookButton.addEventListener('click', domUpdates.showMealPlan);


mealsToCookSection.addEventListener('click', (event) => {
  domUpdates.mealsToCookSingleRecipe(event)
});

favoriteRecipesButton.addEventListener("click", () => {
  domUpdates.showFavoriteRecipes()
  hide(clearButton)
  hide(pantrySection)
  hide(allRecipesSection)
  hide(singleRecipeSection)
  show(favoriteRecipeSection)
  hide(searchInput)
  hide(tagNavSection)
});

searchInput.addEventListener('input', (e) => {
  domUpdates.populateSearch(e)
});

clearButton.addEventListener("click", () => {
  if(window.getComputedStyle(tagNavSection).display === 'none'){
    show(tagNavSection)
  } else {
    hide(tagNavSection)
  }
});
    
allRecipesButton.addEventListener('click', () => {
  filter = cookBook
  pageTitle.innerHTML = 'All Recipes'
  hide(singleRecipeSection)
  hide(favoriteRecipeSection)
  show(allRecipesSection)
  show(clearButton)
  show(searchInput)
  hide(tagNavSection)
  hide(pantrySection)
  domUpdates.displayRecipes()
});

pantryButton.addEventListener('click', () => {
  pageTitle.innerHTML = 'Pantry'
  hide(mealsToCookSection)
  hide(allRecipesSection)
  hide(favoriteRecipeSection)
  hide(singleRecipeSection)
  hide(clearButton)
  hide(searchInput)
  hide(tagNavSection)
  show(pantrySection)
  domUpdates.showPantrySection()
});

mealsToCookSection.addEventListener('keydown', (event) => {
  if (event.which === 13) {
    domUpdates.mealsToCookSingleRecipe(event)
  } else {
    console.log('outside')
  }
});

singleRecipeSection.addEventListener('click', (event) => {
  addSingleRecipe(event)
  addMissingIngredients(event)
  cookMeal(event)
  hide(tagNavSection)
  hide(pantrySection)
});
  



