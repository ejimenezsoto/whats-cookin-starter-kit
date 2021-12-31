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
const favoriteRecipeSection = document.querySelector('.my-favorites-section')
const mealsToCookSection = document.querySelector('.meals-to-cook-section')

//title
const pageTitle = document.querySelector('.page-title');

//inputs
const checkboxes = document.querySelectorAll('input[type=checkbox][name=tag]')
const searchInput = document.querySelector('#userInput');

//buttons
const favoriteRecipesButton = document.querySelector('#favoritesButton');
const clearButton = document.querySelector('.clear-button');
const allRecipesButton = document.querySelector('.recipies');
const yourGroceryListSectionButton = document.querySelector('.grocery-list');
const mealsToCookButton = document.querySelector('.planner')


//global variables 
let tagList = [];
let currentUser = users[Math.floor(Math.random() * users.length)];
let currentRecipe;

const cookBook = new Cookbook(recipes);
let filter = cookBook;

//reusable functions 
const hide = (element) => {
element.classList.add('hidden')
};

const show = (element) => {
  element.classList.remove('hidden')
};

const showFavoriteRecipes = () => {
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
}

searchInput.addEventListener('input', (e) => {
  populateSearch(e)
});

clearButton.addEventListener("click", () => {
      searchInput.value = ''
      displayRecipes()
    });
    
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
}

const clickRecipe = (event) => {
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
    const ingredientList = findRecipeId.listIngredients().reduce((acc, ingredient) => {
      acc += `<li>${ingredient}</li>`
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
}
    
    // event listeners
    
window.addEventListener('load', function () {
  displayRecipes();
});

favoriteRecipesButton.addEventListener("click", () => {
  showFavoriteRecipes()
  hide(allRecipesSection)
  hide(singleRecipeSection)
  show(favoriteRecipeSection)
});
    
allRecipesButton.addEventListener('click', () => {
  filter = cookBook
  pageTitle.innerHTML = 'All Recipes'
  hide(singleRecipeSection)
  hide(favoriteRecipeSection)
  show(allRecipesSection)
  displayRecipes()
});
    
allRecipesSection.addEventListener('click', clickRecipe);
favoriteRecipeSection.addEventListener('click', clickRecipe);

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



const showMealPlan = () => {
  mealsToCookSection.innerHTML = '';
  hide(allRecipesSection)
  hide(singleRecipeSection)
  show(mealsToCookSection)
  filter = currentUser
  const displayMealsToCook = currentUser.recipesToCook.forEach(recipe => {
    return mealsToCookSection.innerHTML += `
    <div class='recipe'>
        <img class="recipe-image" src="${recipe.image}" id='${recipe.id}' alt="${recipe.name}">
        <h5>${recipe.name}</h5>
        </div>` 
      });
      return displayMealsToCook
}

mealsToCookButton.addEventListener('click', showMealPlan)

yourGroceryListSectionButton.addEventListener('click', () => {
  hide(allRecipesSection)
  hide(favoriteRecipeSection)
  hide(singleRecipeSection)
  
  pageTitle.innerHTML = 'Grocery List'
});

singleRecipeSection.addEventListener('click', (event) => {
  if(event.target.id === 'add-meal-button'){
    currentUser.addToCook(currentRecipe)
  } else if(event.target.id === 'favorite-button'){
    currentUser.addToFavorites(currentRecipe)
  }
})







