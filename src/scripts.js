import './styles.css';
import apiCalls from './apiCalls';
import Cookbook from './classes/Cookbook';
import './images/cooking.png'
import './images/like.png'
import './images/plus.png'
import Recipe from './classes/Recipe';
import User from './classes/User';
import { userData, recipesData, ingredientData } from './apiCalls';
import Pantry from './classes/Pantry';



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
  recipes = data[1].recipeData.map(recipe => {
    return new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags, data[2].ingredientsData)
  });
  users = data[0].usersData.map(user => {
    return new User(user.name, user.id, pantry = new Pantry(user.pantry, data[2].ingredientsData), data[2].ingredientsData)
  });

  cookBook = new Cookbook(recipes);
  filter = cookBook;
  currentUser = users[Math.floor(Math.random() * users.length)];
  // pantry = new Pantry(currentUser.pantry, data[2].ingredientsData, currentUser.recipesToCook );
  console.log(currentUser.pantry);
  currentUser.pantry.listIngredientsNameAndAmount()
  console.log(currentUser.pantry.listOfPantryIngredients);

  displayRecipes();
  filterByCheckBoxes();

})
.catch(error => console.log('Oooops. Something is wrong', error))

//reusable functions ***************************
const hide = (element) => {
element.classList.add('hidden')
};

const show = (element) => {
  element.classList.remove('hidden')
};


// Event Hnadlers *******************************
const displayRecipes = () => {
  hide(singleRecipeSection)
  hide(favoriteRecipeSection)
  const allRecipies = cookBook.recipes.forEach(recipe => {
    return allRecipesSection.innerHTML += `
      <div class='recipe'>
      <img class="recipe-image" src="${recipe.image}" id='${recipe.id}' alt="${recipe.name}">
      <div class= 'name-and-favorite'>
      <p class='recipe-name'>${recipe.name}</p>
      </div>
      </div>`
  });
  return allRecipies;
}; 

const showFavoriteRecipes = () => {

  console.log(currentUser.listIngredients(), '<<<<<<<<<Pantry')
  favoriteRecipeSection.innerHTML = ''
  hide(allRecipesSection)
  hide(singleRecipeSection)
  filter = currentUser
  pageTitle.innerHTML = 'Your Favorite Recipes';
  const displayFavoriteRecipes = currentUser.favoriteRecipes.forEach(recipe => {
    return favoriteRecipeSection.innerHTML += `
    <div class='recipe'>
        <img class="recipe-image" src="${recipe.image}" id='${recipe.id}' alt="${recipe.name}">
        <h5>${recipe.name}</h5>
        </div>` 
      });
      return displayFavoriteRecipes
  };

const populateSearch = (e) => {
  let input = e.target.value
  if (input && input.trim().length > 0) {
    input = input.trim().toLowerCase()
    if (filter === cookBook) {
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
      favoriteRecipeSection.innerHTML = filter.filterByKeyWord(input).reduce((acc, recipe) => {
        acc += `
        <div class='recipe'>
        <img class="recipe-image" src="${recipe.image}" id='${recipe.id}' alt="${recipe.name}">
        <h5>${recipe.name}</h5>
        </div> 
        `
        return acc
      }, '')
    }
  }
};

const clickRecipe = (event) => {
  singleRecipeSection.innerHTML = ''
  if (event.target.name !== undefined) {
    hide(favoriteRecipeSection)
    hide(allRecipesSection)
    hide(mealsToCookSection)
    show(singleRecipeSection)
    const findRecipeId = recipes.find(({ id }) => id == event.target.id)
    currentRecipe = findRecipeId
    
    console.log(currentUser.pantry.checkPantry());
    const recipeInstructions = findRecipeId.instructions.reduce((acc, instruction) => {
      acc += `<li>${instruction.instruction}</li>`
      return acc
    }, '')
    currentRecipe.listIngredients()
    const ingredientList = currentRecipe.listOfRecipeIngredients.reduce((acc, ingredient) => {
      acc += `<li>${ingredient.name} Amount: ${ingredient.amount}</li>`
      return acc
    }, '');
    singleRecipeSection.innerHTML = `
      <div class="single-recipe-img"> <img src="${findRecipeId.image}" alt=""> </div>
      <div class="favorite-meal-buttons">
        <button class='favorite-button '><img class="favorite-image" id="favorite-button" src="./images/like.png"  alt="favorite"> </button>
        <button class='add-meal-button'><img class="add-image" src="./images/plus.png" id="add-meal-button" alt="add"> </button>
        <div class="total-cost"> <h1 class="price">$${findRecipeId.costOfIngredients()}</h1></div> 
      </div>
      <div class="ingredient-instructions">
        <div class="ingredient-instructions-section">${recipeInstructions} </div>
        <div class="ingredient-list"><p> ${ingredientList} </p> </div>
      </div>
    `
  } else {
    console.log('clicking outside')
  }
};


const mealsToCookSingleRecipe = (event) => {
  singleRecipeSection.innerHTML = ''
  if (event.target.name !== undefined) {
    hide(favoriteRecipeSection)
    hide(allRecipesSection)
    hide(mealsToCookSection)
    show(singleRecipeSection)
    const findRecipeId = recipes.find(({ id }) => id == event.target.id)
    currentRecipe = findRecipeId
    const recipeInstructions = findRecipeId.instructions.reduce((acc, instruction) => {
      acc += `<li>${instruction.instruction}</li>`
      return acc
    }, '')
    currentRecipe.listIngredients()
    const ingredientList = findRecipeId.listOfRecipeIngredients.reduce((acc, ingredient) => {
      acc += `<li>${ingredient.name} Amount: ${ingredient.amount}</li>`
      return acc
    }, '');
    singleRecipeSection.innerHTML = `
      <div class="single-recipe-img"> <img src="${findRecipeId.image}" alt=""> </div>
      <div class="favorite-meal-buttons">
        <button class='favorite-button '><img class="favorite-image" id="favorite-button" src="./images/like.png"  alt="favorite"> </button>
        <button class='add-meal-button'><img class="add-image" src="./images/plus.png" id="add-meal-button" alt="add"> </button>
        <div class="total-cost"> <h1 class="price">$${findRecipeId.costOfIngredients()}</h1></div> 
      </div>
      <div class="ingredient-instructions">
        <div class="ingredient-instructions-section">${recipeInstructions} </div>
        <div class="ingredient-list"><p> ${ingredientList} </p> </div>
      </div>
    `
  } else {
    console.log('clicking outside')
  }
}

const showFilteredRecipes = () => {
  const filteredRecipes = filter.filterByTags(tagList).reduce((acc, recipe) => {
    allRecipesSection.innerHTML = ``
    pageTitle.innerHTML = `Filtered Recipes`
    acc += `
    <div class='recipe'>
    <img class="recipe-image" src="${recipe.image}" id='${recipe.id}' alt="${recipe.name}">
    <h5>${recipe.name}</h5>
    </div>
    `
    return acc
  }, '');
  allRecipesSection.innerHTML = filteredRecipes
};

const filterByCheckBoxes = () => {
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
};

const showMealPlan = () => {
  pageTitle.innerHTML = 'Meals to cook'
  mealsToCookSection.innerHTML = '';
  hide(allRecipesSection)
  hide(singleRecipeSection)
  show(mealsToCookSection)
  hide(pantrySection)
  filter = currentUser
  const displayMealsToCook = currentUser.recipesToCook.forEach(recipe => {
    return mealsToCookSection.innerHTML += `
    <div class='recipe'>
        <img class="recipe-image" src="${recipe.image}" id='${recipe.id}' alt="${recipe.name}">
        <h5>${recipe.name}</h5>
        </div>`
  });
  return displayMealsToCook
};

const addSingleRecipe = (event) => {
  if (event.target.id === 'add-meal-button') {
    currentUser.addToCook(currentRecipe)
  } else if (event.target.id === 'favorite-button') {
    currentUser.addToFavorites(currentRecipe)
  }
};

const showPantrySection = () => {
  // DISABLE PANTRY BUTTON IF ON PANTRY SECTION
  pantryTable.innerHTML = ``
  
  const pantryList = currentUser.listIngredients().forEach(ingredient => {
    pantryTable.innerHTML += `
      <tr class='ingredient-table'>
        <td>${ingredient[0]}</td>
        <td>${ingredient[1]} units</td>
      </tr>
    `
  })
  return pantryList
}


  
  // event listeners ***********************************************

allRecipesSection.addEventListener('click', clickRecipe);
favoriteRecipeSection.addEventListener('click', clickRecipe);
mealsToCookSection.addEventListener('click', mealsToCookSingleRecipe);
mealsToCookButton.addEventListener('click', showMealPlan);

favoriteRecipesButton.addEventListener("click", () => {
  showFavoriteRecipes()
  hide(clearButton)
  hide(pantrySection)
  hide(allRecipesSection)
  hide(singleRecipeSection)
  show(favoriteRecipeSection)
  hide(searchInput)
  hide(tagNavSection)
});

searchInput.addEventListener('input', (e) => {
  populateSearch(e)
});

clearButton.addEventListener("click", () => {
    if(window.getComputedStyle(tagNavSection).display === 'none'){
      show(tagNavSection)
    } else {
      hide(tagNavSection)
    }
    currentUser.checkPantry()
    
});
    
allRecipesButton.addEventListener('click', () => {
  filter = cookBook
  pageTitle.innerHTML = 'All Recipes'
  hide(singleRecipeSection)
  hide(favoriteRecipeSection)
  show(allRecipesSection)
  displayRecipes()
  show(clearButton)
  show(searchInput)
  hide(tagNavSection)
  hide(pantrySection)
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
  showPantrySection()
  
  

});

singleRecipeSection.addEventListener('click', (event) => {
  addSingleRecipe(event)
  hide(tagNavSection)
  hide(pantrySection)
});







