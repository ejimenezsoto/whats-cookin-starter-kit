
class Cookbook {
  constructor(recipes) {
    this.recipes = recipes;
    this.tags = [];
    this.filteredRecipes = [];
  }
  filterByTags(tag) {
    this.tags.push(tag);
    //were pushing a string (tag) into an array 
    
    const filteredTags = this.tags.forEach(tag => {
        const filteredRecipes = this.recipes.forEach(recipe => {
          if(recipe.tags.includes(tag)){
            this.filteredRecipes.push(recipe)
          }
        });
    });
    return this.filteredRecipes;
  }
  filterByNameAndIngredients() {

  };
  
}

export default Cookbook;
