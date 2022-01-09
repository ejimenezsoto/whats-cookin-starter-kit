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
    displayRecipes();
    filterByCheckBoxes();
  })
  .catch(error => displayError(error))

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
      <div class='recipe' id='${recipe.id}' tabindex="0" >
      <img class="recipe-image" src="${recipe.image}" id='${recipe.id}' alt="${recipe.name}">
      <div class= 'name-and-favorite'>
      <p class='recipe-name'>${recipe.name}</p>
      </div>
      </div>`
  });
  return allRecipies;
}; 

const showFavoriteRecipes = () => {
  favoriteRecipeSection.innerHTML = ''
  hide(allRecipesSection)
  hide(singleRecipeSection)
  filter = currentUser
  pageTitle.innerHTML = 'Your Favorite Recipes';
  const displayFavoriteRecipes = currentUser.favoriteRecipes.forEach(recipe => {
    return favoriteRecipeSection.innerHTML += `
    <div class='recipe' id='${recipe.id}' tabindex="0">
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
              <div class='recipe' id='${recipe.id}' tabindex="0">
              <img class="recipe-image" src="${recipe.image}" id='${recipe.id}' alt="${recipe.name}">
              <h5>${recipe.name}</h5>
              </div> 
              `
        return acc
      }, '')
    } else {
      favoriteRecipeSection.innerHTML = filter.filterByKeyWord(input).reduce((acc, recipe) => {
        acc += `
        <div class='recipe' id='${recipe.id} tabindex="0">
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
  console.log('it worked')
  singleRecipeSection.innerHTML = ''
  if (event.target.id) {
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
    const ingredientList = currentRecipe.listOfRecipeIngredients.reduce((acc, ingredient) => {
      acc += `<li>${ingredient.name} Amount: ${ingredient.amount}</li>`
      return acc
    }, '');
    singleRecipeSection.innerHTML = `
      <div class="single-recipe-img" tabindex="0"> <img src="${findRecipeId.image}" alt=""> </div>
      <div class="favorite-meal-buttons">
        <button class='favorite-button' id="favorite-button"><img class="favorite-image" id="favorite-button" src="./images/like.png"  alt="favorite"> </button>
        <button class='add-meal-button' id="add-meal-button"><img class="add-image" src="./images/plus.png" id="add-meal-button" alt="add"> </button>
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
  if (event.target.id) {
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
    currentUser.pantry.checkPantry(currentRecipe.listOfRecipeIngredients)
    const ingredientList = findRecipeId.listOfRecipeIngredients.reduce((acc, ingredient) => {
      acc += `<li>${ingredient.name} Amount: ${ingredient.amount}</li>`
      return acc
    }, '');

    const missingIngredientsList = currentUser.pantry.listOfMissingIngredients.reduce((acc,ingredient) => {
      acc += `<li>${ingredient.name} Amount: ${ingredient.amount[0]}</li>`
      return acc
    },'')

    singleRecipeSection.innerHTML = `
      <div class="single-recipe-img" > <img src="${findRecipeId.image}" alt=""> </div>
      <div class="favorite-meal-buttons" tabindex="0">
        <button class='shopping-cart-button'><img class="shopping-cart-img" id="shoppingCart"src="./images/shopping-cart.png" alt="shopping Cart"> </button>
        <button class='cook-button'><img class="cook-img" src="./images/cooking.png" id="cookImg" alt="Cooking Img"> </button>
        <div class="total-cost"> <h1 class="price">$${findRecipeId.costOfIngredients()}</h1></div> 
      </div>
      <div class="ingredient-instructions">
        <div class="ingredient-instructions-section">${recipeInstructions} </div>
        <div class="ingredient-list"><p> ${ingredientList} </p> </div>
      </div>
      <h1>***MISSING INGREDIENTS***</h1>
      <p> ${missingIngredientsList} </p>
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
    <div class='recipe' id='${recipe.id}' tabindex="0">
    <img class="recipe-image" src="${recipe.image}" id='${recipe.id}' alt="${recipe.name}">
    <h5>${recipe.name}</h5>
    </div>
    `
    return acc
  }, '');
  allRecipesSection.innerHTML = filteredRecipes
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
    <div class='recipe' id='${recipe.id}' tabindex="0">
        <img class="recipe-image" src="${recipe.image}" id='${recipe.id}' alt="${recipe.name}">
        <h5>${recipe.name}</h5>
        </div>`
  });
  return displayMealsToCook
};

const showPantrySection = () => {
  pantryTable.innerHTML = ``
  
  const pantryList = currentUser.pantry.listOfPantryIngredients.forEach(ingredient => {
    pantryTable.innerHTML += `
      <tr class='ingredient-table'>
        <td>${ingredient.name}</td>
        <td>${ingredient.amount} units</td>
      </tr>
    `
  })
  return pantryList
}


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

const addSingleRecipe = (event) => {
  if (event.target.id === 'add-meal-button') {
    currentUser.addToCook(currentRecipe)
  } else if (event.target.id === 'favorite-button') {
    currentUser.addToFavorites(currentRecipe)
  }
};

const displayError = (error) => {
  const sectionTitles = document.querySelector('.section-titles')
  error === 422 ? pageTitle.innerHTML = `
  <h1 class="error-msg">Sorry. Something went wrong. Try again</h1>` : pageTitle.innerHTML = `
  <h1 class="error-msg">Sorry. Something went wrong. Try again</h1>`
};


  
// event listeners ***********************************************

allRecipesSection.addEventListener('click', (event) => {
  clickRecipe(event)
});

allRecipesSection.addEventListener('keydown', (event) => {
  if (event.which === 13) {
    clickRecipe(event)
  } else {
    console.log('outside')
  }
});   
favoriteRecipeSection.addEventListener('click', (event) => {
  clickRecipe(event)
});

favoriteRecipeSection.addEventListener('keydown', (event) => {
  if (event.which === 13) {
    clickRecipe(event)
  } else {
    console.log('outside')
  }
});
 
mealsToCookButton.addEventListener('click', showMealPlan);


mealsToCookSection.addEventListener('click', (event) => {
  mealsToCookSingleRecipe(event)
});

favoriteRecipesButton.addEventListener("click", () => {
  showFavoriteRecipes()
  hide(clearButton)
  hide(pantrySection)
  hide(allRecipesSection)
  hide(singleRecipeSection)
  show(favoriteRecipeSection)
  hide(searchInput)
  hide(tagNavSection)
  console.log('click')
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

mealsToCookSection.addEventListener('keydown', (event) => {
  if (event.which === 13) {
    mealsToCookSingleRecipe(event)
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

// singleRecipeSection.addEventListener('keydown', (event) => {
//   console.log(event.target.id, 'shop')
//   if (event.which === 13) {
//     addSingleRecipe(event)
//     addMissingIngredients(event)
//     cookMeal(event)
//     hide(tagNavSection)
//     hide(pantrySection)
//   } else {
//     console.log('outside')
//   }
// });   







