class User {
    constructor(name, id, pantry) {
        this.name = name;
        this.id = id;
        this.pantry = pantry;
        this.favoriteRecipes = [];
        this.recipesToCook = [];
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
        this.recipesToCook.push(recipe)
    }
}


export default User