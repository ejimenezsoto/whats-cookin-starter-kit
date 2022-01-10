


const domUpdates = {
displayRecipes(
    singleRecipeSection,
    favoriteRecipeSection,
    allRecipesSection,
    cookBook
    ) {
    hide(singleRecipeSection);
    hide(favoriteRecipeSection);
    const allRecipies = cookBook.recipes.forEach((recipe) => {
    return (allRecipesSection.innerHTML += `
        <div class='recipe' id='${recipe.id}' tabindex="0" >
        <img class="recipe-image" src="${recipe.image}" id='${recipe.id}' alt="${recipe.name}">
        <div class= 'name-and-favorite'>
        <p class='recipe-name'>${recipe.name}</p>
        </div>
        </div>`);
    });
    return allRecipies;
},

showFavoriteRecipes(
    favoriteRecipeSection,
    allRecipesSection,
    singleRecipeSection,
    currentUser,
    filter,
    pageTitle
) {
    favoriteRecipeSection.innerHTML = "";
    hide(allRecipesSection);
    hide(singleRecipeSection);
    filter = currentUser;
    pageTitle.innerHTML = "Your Favorite Recipes";
    const displayFavoriteRecipes = currentUser.favoriteRecipes.forEach(
    (recipe) => {
        return (favoriteRecipeSection.innerHTML += `
    <div class='recipe' id='${recipe.id}' tabindex="0">
        <img class="recipe-image" src="${recipe.image}" id='${recipe.id}' alt="${recipe.name}">
        <h5>${recipe.name}</h5>
        </div>`);
    }
    );
    return displayFavoriteRecipes;
},

    popUp(error, instructions, className) {
    return  `
    <div id= ${className} class="modal">
    <div class="modal-content">
    <div class="modal-header">
    <span class="close" id="closeButton">&times;</span>
    </div>
    <div class="modal-body">
    <p>${error}</p>
    <p>${instructions}</p>
    </div>
</div>
</div>`
    },

populateSearch(
    e,
    filter,
    cookBook,
    allRecipesSection,
    favoriteRecipeSection,
    pageTitle
) {
    let input = e.target.value;
    if (input && input.trim().length > 0) {
    input = input.trim().toLowerCase();
    
        const filterSearch = allRecipesSection.innerHTML = filter
        .filterByKeyWord(input)
        .reduce((acc, recipe) => {
            acc += `
            <div class='recipe' id='${recipe.id}' tabindex="0">
            <img class="recipe-image" src="${recipe.image}" id='${recipe.id}' alt="${recipe.name}">
            <h5>${recipe.name}</h5>
            </div> 
            `;
            return acc;
        }, "");

        if (filterSearch !== '') {
            pageTitle.innerHTML = 'All Recipes'
        return filterSearch
        } else {
            pageTitle.innerHTML = 'No Recipes Found'
        }
    }
    
},

displaySingleRecipe(
    singleRecipeSection,
    currentRecipe,
    findRecipeId,
    heartImage
) {
    const recipeInstructions = findRecipeId.instructions.reduce(
    (acc, instruction) => {
        acc += `<li>${instruction.instruction}</li>`;
        return acc;
    },
    ""
    );
    currentRecipe.listIngredients();
    const ingredientList = currentRecipe.listOfRecipeIngredients.reduce(
    (acc, ingredient) => {
        acc += `<li>${ingredient.name} Amount: ${ingredient.amount}</li>`;
        return acc;
    },
    ""
    );
    singleRecipeSection.innerHTML = `
    <div class="single-recipe-img" tabindex="0"> <img src="${
        findRecipeId.image
    }" alt=""> </div>
    <div class="favorite-meal-buttons">
        <button class='favorite-button' id="favorite-button"><img class="favorite-image" id="favorite-button" src=${heartImage}  alt="favorite"> </button>
        <button class='add-meal-button' id="add-meal-button"><img class="add-image" src="./images/plus.png" id="add-meal-button" alt="add"> </button>
        <div class="total-cost"> <h1 class="price">$${findRecipeId.costOfIngredients()}</h1></div> 
    </div>
    <div class="ingredient-instructions">
        <div class="ingredient-instructions-section">${recipeInstructions} </div>
        <div class="ingredient-list"><p> ${ingredientList} </p> </div>
    </div>
    `;
},

mealsToCookSingleRecipe(
    event,
    mealSingleRecipe,
    favoriteRecipeSection,
    allRecipesSection,
    mealsToCookSection,
    currentRecipe,
    currentUser,
    recipes
) {
    mealSingleRecipe.innerHTML = "";
    if (event.target.id) {
    hide(favoriteRecipeSection);
    hide(allRecipesSection);
    hide(mealsToCookSection);
    show(mealSingleRecipe);
    const findRecipeId = recipes.find(({ id }) => id == event.target.id);
    currentRecipe = findRecipeId;
    const recipeInstructions = findRecipeId.instructions.reduce(
        (acc, instruction) => {
        acc += `<li>${instruction.instruction}</li>`;
        return acc;
        },
        ""
    );
    currentRecipe.listIngredients();
    currentUser.pantry.checkPantry(currentRecipe.listOfRecipeIngredients);
    const ingredientList = findRecipeId.listOfRecipeIngredients.reduce(
        (acc, ingredient) => {
        acc += `<li>${ingredient.name} Amount: ${ingredient.amount}</li>`;
        return acc;
        },
    ""
    );
    const missingIngredientsList =
        currentUser.pantry.listOfMissingIngredients.reduce(
        (acc, ingredient) => {
            acc += `<li>${ingredient.name} Amount: ${ingredient.amount[0]}</li>`;
            return acc;
        },
        ""
        );
    const pantryList = currentUser.pantry.listOfPantryIngredients.reduce(
        (acc, ingredient) => {
        if (ingredient.amount !== 0) {
            acc += `
        <li>${ingredient.name} Amount: ${ingredient.amount}</li>
    `;
        }

        return acc;
        }
    );

    mealSingleRecipe.innerHTML = `
    <div class="single-recipe-img" > <img src="${
        findRecipeId.image
    }" alt=""> </div>
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
    ${this.popUp(`You Are Missing ${missingIngredientsList}`, 'Click the shopping cart to add ingredients', 'myModal')}
    ${this.popUp(`You have added ${missingIngredientsList}`, 'Click the shopping cart to add ingredients', 'successModal')}
    <h1>***PANTRY***</h1>

    <div class='show-pantry'>
    <p>${pantryList}</p>
    </div>
    
    `;
    } 
},

showFilteredRecipes(filter, allRecipesSection, pageTitle, tagList) {
    const filteredRecipes = filter
    .filterByTags(tagList)
    .reduce((acc, recipe) => {
        allRecipesSection.innerHTML = ``;
        pageTitle.innerHTML = `Filtered Recipes`;
        acc += `
    <div class='recipe' id='${recipe.id}' tabindex="0">
    <img class="recipe-image" src="${recipe.image}" id='${recipe.id}' alt="${recipe.name}">
    <h5>${recipe.name}</h5>
    </div>
    `;
        return acc;
    }, "");
    allRecipesSection.innerHTML = filteredRecipes;
},

showMealPlan(
    pageTitle,
    mealsToCookSection,
    allRecipesSection,
    pantrySection,
    favoriteRecipeSection,
    searchBox,
    filter,
    currentUser,
    singleRecipeSection
) {
    pageTitle.innerHTML = "Meals to cook";
    mealsToCookSection.innerHTML = "";
    hide(allRecipesSection);
    hide(singleRecipeSection);
    show(mealsToCookSection);
    hide(pantrySection);
    hide(favoriteRecipeSection);
    hide(searchBox);
    filter = currentUser;
    const displayMealsToCook = currentUser.recipesToCook.forEach((recipe) => {
    return (mealsToCookSection.innerHTML += `
    <div class='recipe' id='${recipe.id}' tabindex="0">
        <img class="recipe-image" src="${recipe.image}" id='${recipe.id}' alt="${recipe.name}">
        <h5>${recipe.name}</h5>
        </div>`);
    });
    return displayMealsToCook;
},

showPantrySection(section, currentUser) {
    section.innerHTML = ``;

    const pantryList = currentUser.pantry.listOfPantryIngredients.forEach(
    (ingredient) => {
        if (ingredient.amount !== 0) {
        section.innerHTML += `
        <tr class='ingredient-table'>
            <td>${ingredient.name}</td>
            <td>${ingredient.amount} units</td>
        </tr>`;
        }
    }
    );
    return pantryList;
},

displayError(error, pageTitle) {
    pageTitle.innerHTML = `<h1 class="error-msg">${error.message}</h1>`
},
};

const hide = (element) => {
element.classList.add("hidden");
};

const show = (element) => {
element.classList.remove("hidden");
};

export default domUpdates;