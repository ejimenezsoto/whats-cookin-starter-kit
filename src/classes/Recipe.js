
// {
//     "id": 595736,
//     "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
//     "ingredients": [
//       {
//         "id": 20081,
//         "quantity": {
//           "amount": 1.5,
//           "unit": "c"
//         }.
//       ]
//     "instructions": [
//       {
//         "instruction": "Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.",
//         "number": 6
//       }
//     ],
//     "name": "Loaded Chocolate Chip Pudding Cookie Cups",
//     "tags": [ ]
//   }

//          [
    //       {
    //         "id": 20081,
    //         "quantity": {
    //           "amount": 1.5,
    //           "unit": "c"
    //         }
    //       ]

var ingredientsData = require('../data/ingredients');

class Recipe{
    constructor(id,image,ingredients,instructions,name,tags){
        this.id = id;
        this.image = image;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.name = name;
        this.tags = tags;
    }
    listIngredients(){
        const filtered = this.ingredients.map(ingredient => ingredient.id);

        const ingredientObj = filtered.map(ingredientId => {
                return ingredientsData.find( ( { id } ) => id === ingredientId)
        });

        const ingredientsName = ingredientObj.map(ingredient => ingredient.name)

        return ingredientsName

    };

    costOfIngredients(){

    };

    returnInstructions(){

    };
}
export default Recipe