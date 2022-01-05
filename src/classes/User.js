
class User {
    constructor(name, id, pantry,ingredientsData) {
        this.name = name;
        this.id = id;
        this.pantry = pantry;
        this.favoriteRecipes = [];
        this.recipesToCook = [];
        this.filteredFavoriteRecipes = [];
        this.listOfIngredients = []
        this.ingredientsData = ingredientsData
        this.missingIngredients = []
    }
    listIngredients() {
        const ingredientIds = this.pantry.map(ingredient => [ingredient.ingredient,ingredient.amount]);
        
        const ingredientDataObjs = ingredientIds.map(ingredientId => {
          return [this.ingredientsData.find( ( { id } ) => id === ingredientId[0]), ingredientId[1]];
        });

        const ingredientNames = ingredientDataObjs.map(ingredient => {
            this.listOfIngredients.push([ingredient[0].name,ingredient[1]])
        }); 
        return this.listOfIngredients;
      }

    checkPantry(){
       const pantryArray = [].concat.apply([],this.listOfIngredients)
       
       const checkRecipesToCook = this.recipesToCook.forEach(recipe => {
           console.log('This is the recipe',recipe)
           for(let i=0;i<recipe.listOfRecipeIngredients.length;i+=2){
               if(!pantryArray.includes(recipe.listOfRecipeIngredients[i])){
                   this.missingIngredients.push([recipe.listOfRecipeIngredients[i],recipe.listOfRecipeIngredients[i+1]])
                   console.log('It hit')
               }

               for(let j=0;j<pantryArray.length;j+=2){
                   if(pantryArray[j] === recipe.listOfRecipeIngredients[j] && pantryArray[j+1] < recipe.listOfRecipeIngredients[i + 1] ){
                       this.missingIngredients.push([pantryArray[j],  recipe.listOfRecipeIngredients[i + 1] -pantryArray[j+1],'I DONT HAVE ENOUGH'])
                   }
               }
           }
       })
       
       
       console.log(pantryArray,'List of Pantry Ingredients')
       console.log(this.recipesToCook[0].listOfRecipeIngredients, 'recipe List')
       console.log(this.missingIngredients,'Missing Ingredients')
       
    }



    addToFavorites(recipe) {
        if (this.favoriteRecipes.includes(recipe)) {
            const index = this.favoriteRecipes.indexOf(recipe)
            this.favoriteRecipes.splice(index, 1)
        } else {
            this.favoriteRecipes.push(recipe)
        }
        
    }

    addToCook(recipe) {
        if (this.recipesToCook.includes(recipe)) {
            const index = this.recipesToCook.indexOf(recipe)
            this.recipesToCook.splice(index, 1)
        } else {
            this.recipesToCook.push(recipe)
        }
        console.log(this.recipesToCook)
    }

    filterByTags(tagList) {
        const filteredTags = tagList.forEach(tag => {
            const filteredRecipes = this.favoriteRecipes.forEach(recipe => {
                if (recipe.tags.includes(tag)) {
                    this.filteredFavoriteRecipes.push(recipe)
                }
            });
        });

        const filteredWithoutDuplicates = [... new Map(this.filteredFavoriteRecipes.map(recipe => [recipe.id, recipe])).values()]
        return filteredWithoutDuplicates;
    }
    filterByKeyWord(userInput) {
        const filterByName = this.favoriteRecipes.filter(recipe => recipe.name.toLowerCase().indexOf(userInput.toLowerCase()) !== -1);

        const filtered = filterByName.slice()

        const filterByIngredients = this.favoriteRecipes.forEach(recipe => {
            const list = recipe.listIngredients().map(ingredient => {
                return ingredient.toLowerCase()
            })

            const filterIngredientsName = list.forEach(ingredient => {
                if (ingredient.indexOf(userInput.toLowerCase()) !== -1) {
                    return filtered.push(recipe)
                }
            })
        })

        const filteredWithoutDuplicates = [... new Map(filtered.map(recipe => [recipe.id, recipe])).values()]
        return filteredWithoutDuplicates
    }
}

export default User