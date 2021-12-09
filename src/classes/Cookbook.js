
class Cookbook {
  constructor(recipes) {
    this.recipes = recipes;
    this.tags = [];
    this.filteredRecipes = [];
  }
  filterByTags(tag) {
    this.tags.push(tag);
    const filteredTags = this.tags.forEach(tag => {
        const filteredRecipes = this.recipes.forEach(recipe => {
          if(recipe.tags.includes(tag)){
            this.filteredRecipes.push(recipe)
          }
        });
    });
    const filteredWithoutDuplicates = [... new Map(this.filteredRecipes.map(recipe => [recipe.id, recipe])).values()]

    return filteredWithoutDuplicates;
  }
    filterByKeyWord(userInput) {

    const filterByName = this.recipes.filter(recipe => recipe.name.toLowerCase().indexOf(userInput.toLowerCase()) !== -1);

    const filtered = filterByName.slice()

      const filterByIngredients = this.recipes.forEach(recipe => {
      const list = recipe.listIngredients().map(ingredient => {
      return ingredient.toLowerCase()
      })

      const filterIngredientsName = list.forEach(ingredient => {
          if(ingredient.indexOf(userInput.toLowerCase()) !== -1){
            return filtered.push(recipe)
          }
      })
        
    })

    const filteredWithoutDuplicates = [... new Map(filtered.map(recipe => [recipe.id, recipe])).values()]

    return filteredWithoutDuplicates
  }
}

module.export = Cookbook;
