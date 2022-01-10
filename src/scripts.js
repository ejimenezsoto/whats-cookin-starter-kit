import './styles.css';
import apiCalls from './apiCalls';
import Cookbook from './classes/Cookbook';
import './images/cooking.png'
import './images/like.png'
import './images/plus.png'
import './images/menu.png'
import './images/shopping-cart.png'
import './images/heart.png'
import Recipe from './classes/Recipe';
import User from './classes/User';
import { userData, recipesData, ingredientData } from './apiCalls';
import Pantry from './classes/Pantry';
import domUpdates from './domUpdates';



// html sections 
const allRecipesSection = document.querySelector('.all-recipes-section');
const singleRecipeSection = document.querySelector('.all-single-recipe');
const favoriteRecipeSection = document.querySelector('.my-favorites-section');
const mealsToCookSection = document.querySelector('.meals-to-cook-section');
const tagNavSection = document.querySelector('.side-nav');
const pantrySection = document.querySelector('.pantry-section');
const pantryTable = document.querySelector('.pantry-table');
const searchBox = document.querySelector('.search-box')
const sectionTitles = document.querySelector('.section-titles')
const mealSingleRecipe = document.querySelector(".meal-single-recipe")

// html titles
const pageTitle = document.querySelector('.page-title');

// html inputs
const checkboxes = document.querySelectorAll('input[type=checkbox][name=tag]')

// html buttons
const favoriteRecipesButton = document.querySelector('#favoritesButton');
const clearButton = document.querySelector('.tag-button');
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
  .then((data) => {
    recipes = data[1].map((recipe) => {
      return new Recipe(
        recipe.id,
        recipe.image,
        recipe.ingredients,
        recipe.instructions,
        recipe.name,
        recipe.tags,
        data[2]
      );
    });
    users = data[0].map((user) => {
      return new User(
        user.name,
        user.id,
        (pantry = new Pantry(user.pantry, data[2])),
        data[2]
      );
    });

    cookBook = new Cookbook(recipes);
    filter = cookBook;
    currentUser = users[Math.floor(Math.random() * users.length)];
    currentUser.pantry.listIngredientsNameAndAmount();
    domUpdates.displayRecipes(
      singleRecipeSection,
      favoriteRecipeSection,
      allRecipesSection,
      cookBook
    );
    filterByCheckBoxes();
  })
  .catch((error) => domUpdates.displayError(error, pageTitle));

//reusable functions ***************************
const hide = (element) => {
  element.classList.add('hidden')
};

const show = (element) => {
  element.classList.remove('hidden')
};


// Event Hnadlers *******************************



const addMissingIngredients = (event) => {
  if (event.target.id === 'shoppingCart') {
    currentUser.pantry.addMissingIngredients(currentUser)
  }
}

const cookMeal = (event) => {
  if (event.target.id === 'cookImg' && currentUser.pantry.listOfMissingIngredients.length === 0) {
    const showPantryDiv = document.querySelector('.show-pantry') 
    currentUser.pantry.cookRecipe(currentUser)
    currentUser.pantry.checkPantry(currentRecipe.listOfRecipeIngredients)
    domUpdates.showPantrySection(showPantryDiv, currentUser);
  } else {
    console.log('Not enough ingredients');
    hide(singleRecipeSection)
    sectionTitles.innerHTML += `
    <div id="myModal" class="modal">
  <div class="modal-content">
  <div class="modal-header">
    <span class="close">&times;</span>
    <h2 class="title">Oops Something Went Wrong</h2>
  </div>
  <div class="modal-body">
    <p>looks like you dont have enough ingdredients!</p>
    <p>Click the shopping cart to add ingredients</p>
  </div>
</div>
</div>`
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
        domUpdates.showFilteredRecipes(filter, allRecipesSection, pageTitle, tagList);
        checkboxes.forEach(checkbox => {
          if (!checkbox.checked) {
            checkbox.disabled = true;
          }
        })
      } else if (!this.checked && filter === cookBook) {
        cookBook.filteredRecipes = []
        allRecipesSection.innerHTML = ''
        domUpdates.displayRecipes(
          singleRecipeSection,
          favoriteRecipeSection,
          allRecipesSection,
          cookBook
        );
        checkboxes.forEach(checkbox => {
          checkbox.disabled = false
        })
      } else {
        domUpdates.showFavoriteRecipes(
          favoriteRecipeSection,
          allRecipesSection,
          singleRecipeSection,
          currentUser,
          filter,
          pageTitle
        );
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
    const addToMealPlanButton = document.querySelector('.add-meal-button')
    hide(addToMealPlanButton)
  } else if (event.target.id === 'favorite-button') {
    currentUser.addToFavorites(currentRecipe)
    const favoriteImage = document.querySelector('.favorite-image')
    favoriteImage.src = './images/heart.png'
};
}

const clickRecipe = (event) => {
  singleRecipeSection.innerHTML = ''
  if (event.target.id) {
    hide(favoriteRecipeSection)
    hide(allRecipesSection)
    hide(mealsToCookSection)
    show(singleRecipeSection)
    hide(searchBox)
    hide(clearButton)
    const findRecipeId = recipes.find(({ id }) => id == event.target.id)
    currentRecipe = findRecipeId;
    domUpdates.displaySingleRecipe(
      singleRecipeSection,
      currentRecipe,
      findRecipeId
    );
  }
};




  
// event listeners ***********************************************

allRecipesSection.addEventListener('click', (event) => {
    clickRecipe(event);
});

allRecipesSection.addEventListener('keydown', (event) => {
  if (event.which === 13) {
    clickRecipe(event);
  } else {
    console.log('outside')
  }
});   
favoriteRecipeSection.addEventListener('click', (event) => {
    clickRecipe(event);
});

favoriteRecipeSection.addEventListener('keydown', (event) => {
  if (event.which === 13) {
    clickRecipe(event);
  } else {
    console.log('outside')
  }
});
 
mealsToCookButton.addEventListener('click', () => {
  domUpdates.showMealPlan(
    pageTitle,
    mealsToCookSection,
    allRecipesSection,
    pantrySection,
    favoriteRecipeSection,
    searchBox,
    filter,
    currentUser,
    singleRecipeSection
  );
});


mealsToCookSection.addEventListener('click', (event) => {
  domUpdates.mealsToCookSingleRecipe(
    event,
    mealSingleRecipe,
    favoriteRecipeSection,
    allRecipesSection,
    mealsToCookSection,
    currentRecipe,
    currentUser,
    recipes
  );
  
});

favoriteRecipesButton.addEventListener("click", () => {
  domUpdates.showFavoriteRecipes(
    favoriteRecipeSection,
    allRecipesSection,
    singleRecipeSection,
    currentUser,
    filter,
    pageTitle
  );
  hide(clearButton)
  hide(pantrySection)
  hide(allRecipesSection)
  hide(singleRecipeSection)
  show(favoriteRecipeSection)
  hide(searchBox)
  hide(tagNavSection)
});

searchBox.addEventListener('input', (e) => {
  domUpdates.populateSearch(e, filter, cookBook, allRecipesSection, favoriteRecipeSection);
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
  domUpdates.displayRecipes(
    singleRecipeSection,
    favoriteRecipeSection,
    allRecipesSection,
    cookBook
  );
  show(clearButton)
  show(searchBox)
  hide(tagNavSection)
  hide(pantrySection)
});

pantryButton.addEventListener('click', () => {
  pageTitle.innerHTML = 'Pantry'
  const showPantryDiv = document.querySelector('.show-pantry') 
  hide(mealsToCookSection)
  hide(allRecipesSection)
  hide(favoriteRecipeSection)
  hide(singleRecipeSection)
  hide(clearButton)
  hide(searchBox)
  hide(tagNavSection)
  show(pantrySection)
  domUpdates.showPantrySection(pantryTable, currentUser);
});

mealsToCookSection.addEventListener('keydown', (event) => {
  if (event.which === 13) {
    domUpdates.mealsToCookSingleRecipe(
      event,
      mealSingleRecipe,
      favoriteRecipeSection,
      allRecipesSection,
      mealsToCookSection,
      currentRecipe,
      currentUser,
      recipes
    );
  } else {
    console.log('outside')
  }
});

mealSingleRecipe.addEventListener('click', (event) => {
  addMissingIngredients(event)
  cookMeal(event)
  hide(tagNavSection)
  hide(pantrySection)
});   

singleRecipeSection.addEventListener('click', (event) => {
  addSingleRecipe(event)
  hide(tagNavSection)
  hide(pantrySection)
});  







