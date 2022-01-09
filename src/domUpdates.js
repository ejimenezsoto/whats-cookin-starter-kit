const hide = (element) => {
    element.classList.add('hidden')
};

const show = (element) => {
    element.classList.remove('hidden')
};

const pageTitle = document.querySelector('.page-title');

const domUpdates = {

    displayRecipes(){
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
    },
    
    showFavoriteRecipes() {
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
    },

    populateSearch(e){
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
    },

    clickRecipe(event){
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
    },

    mealsToCookSingleRecipe(event){
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
            const missingIngredientsList = currentUser.pantry.listOfMissingIngredients.reduce((acc, ingredient) => {
                acc += `<li>${ingredient.name} Amount: ${ingredient.amount[0]}</li>`
                return acc
            }, '')
            singleRecipeSection.innerHTML = `
            <div class="single-recipe-img"> <img src="${findRecipeId.image}" alt=""> </div>
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
    },

    showFilteredRecipes(){
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
    },

    showMealPlan(){
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
    },

    showPantrySection(){
        pantryTable.innerHTML = ``
        const pantryList = currentUser.pantry.listOfPantryIngredients.forEach(ingredient => {
            pantryTable.innerHTML += `
            <tr class='ingredient-table'>
                <td>${ingredient.name}</td>
                <td>${ingredient.amount} units</td>
            </tr>`
        })
        return pantryList
    },

    displayError(error){
        const sectionTitles = document.querySelector('.section-titles')
        error === 422 ? pageTitle.innerHTML = `
        <h1 class="error-msg">Sorry. Something went wrong. Try again</h1>` : pageTitle.innerHTML = `
        <h1 class="error-msg">Sorry. Something went wrong. Try again</h1>`
    },
};


export default domUpdates