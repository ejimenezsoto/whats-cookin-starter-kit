import Recipe from './Recipe';

var first = new Recipe(67853,"https://spoonacular.com/recipeImages/678353-556x370.jpg",[
    {
        "id": 1009016,
        "quantity": {
            "amount": 1.5,
            "unit": "cups"
        }
    },
    {
        "id": 9003,
        "quantity": {
            "amount": 2,
            "unit": ""
        }
    }
    ],[
        {
            "instruction": "Season the pork chops with salt and pepper and grill or pan fry over medium high heat until cooked, about 3-5 minutes per side. (If grilling, baste the chops in the maple dijon apple cider sauce as you grill.)Meanwhile, mix the remaining ingredients except the apple slices, bring to a simmer and cook until the sauce thickens, about 2-5 minutes.Grill or saute the apple slices until just tender but still crisp.Toss the pork chops and apple slices in the maple dijon apple cider sauce and enjoy!",
            "number": 1
        }
        ],"Maple Dijon Apple Cider Grilled Pork Chops",[
            "lunch",
            "main course",
            "main dish",
            "dinner"
            ])
class User {
    constructor(name, id, pantry) {
        this.name = name;
        this.id = id;
        this.pantry = pantry;
        this.favoriteRecipes = [first];
        this.recipesToCook = [];
        this.filteredFavoriteRecipes = [];
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