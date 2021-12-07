
class Cookbook {
  constructor(recipes) {
    this.recipes = recipes;
    this.tags = [];
  }
  filterByTags(tag) {
    this.tags.push(tag);
    //were pushing a string (tag) into an array 
    this.tags.forEach(tag => {
      const filterdRecipes = (recipes, tag) => {
        console.log(this.recipes, tag);
      }
      return filterdRecipes
    })
    // we want to filter through that array
    // return a new array of recipes that include tags from tags array
  }

  filterByNameAndIngredients() {

  }
  
}

export default Cookbook;
