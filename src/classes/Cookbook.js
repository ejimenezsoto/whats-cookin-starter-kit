
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
    return this.filteredRecipes;
  }
    filterByKeyWord(userInput) {
      const filtered = []
    // const filterByName = this.recipes.filter(recipe => recipe.name.toLowerCase().indexOf(userInput.toLowerCase()) !== -1);

      const filterByIngredients = this.recipes.forEach(recipe => {

      const list = recipe.listIngredients().map(ingredient => {
      return ingredient.toLowerCase()

      })
        if(list.includes(userInput))
    })
  }
}

export default Cookbook;
