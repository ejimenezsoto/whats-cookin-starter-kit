class User {
    constructor(name, id, pantry, ingredientsData) {
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

    addToFavorites(recipe) {
        if (this.favoriteRecipes.includes(recipe)) {
            const index = this.favoriteRecipes.indexOf(recipe)
            this.favoriteRecipes.splice(index, 1)
        } else {
            this.favoriteRecipes.push(recipe)
        }
    };

    addToCook(recipe) {
        if (this.recipesToCook.includes(recipe)) {
            const index = this.recipesToCook.indexOf(recipe)
            this.recipesToCook.splice(index, 1)
        } else {
            this.recipesToCook.push(recipe)
        }
        console.log(this.recipesToCook)
    };

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
    };

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
    };
};

export default User