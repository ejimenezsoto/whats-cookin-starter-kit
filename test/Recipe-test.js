import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';

describe('Recipe', () => {
    let id = 67853;
    let image = "https://spoonacular.com/recipeImages/678353-556x370.jpg";
    let ingredients = [
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
        ];
    let instructions = [
        {
            "instruction": "Season the pork chops with salt and pepper and grill or pan fry over medium high heat until cooked, about 3-5 minutes per side. (If grilling, baste the chops in the maple dijon apple cider sauce as you grill.)Meanwhile, mix the remaining ingredients except the apple slices, bring to a simmer and cook until the sauce thickens, about 2-5 minutes.Grill or saute the apple slices until just tender but still crisp.Toss the pork chops and apple slices in the maple dijon apple cider sauce and enjoy!",
            "number": 1
        }
        ];
    let name = "Maple Dijon Apple Cider Grilled Pork Chops";
    let tags = [
        "lunch",
        "main course",
        "main dish",
        "dinner"
        ];

    let recipe = new Recipe(id,image,ingredients,instructions,name,tags);

    it('Should be a function', () => {
        expect(Recipe).to.be.a('function')
    });

    it('Should be an instance of Recipe', () => {
        const recipe = new Recipe();
        expect(recipe).to.be.an.instanceof(Recipe);
    });

    it('Should store ID', () => {
        expect(recipe.id).to.equal(67853)
    });

    it('Should store an image url', () => {
        expect(recipe.image).to.equal("https://spoonacular.com/recipeImages/678353-556x370.jpg")
    });

    it('Should store ingredients', () => {
        expect(recipe.ingredients).to.deep.equal([
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
            ])
    });

    it('Should store instructions', () => {
        expect(recipe.instructions).to.deep.equal([
            {
                "instruction": "Season the pork chops with salt and pepper and grill or pan fry over medium high heat until cooked, about 3-5 minutes per side. (If grilling, baste the chops in the maple dijon apple cider sauce as you grill.)Meanwhile, mix the remaining ingredients except the apple slices, bring to a simmer and cook until the sauce thickens, about 2-5 minutes.Grill or saute the apple slices until just tender but still crisp.Toss the pork chops and apple slices in the maple dijon apple cider sauce and enjoy!",
                "number": 1
            }
            ])
    });

    it('Should store a name', () => {
        expect(recipe.name).to.equal("Maple Dijon Apple Cider Grilled Pork Chops")
    });

    it('Should store tags', () => {
        expect(recipe.tags).to.deep.equal([
            "lunch",
            "main course",
            "main dish",
            "dinner"
            ])
    });

    it('Should return names of ingredients', () => {
        expect(recipe.listIngredients()).to.deep.equal([ 'apple cider', 'apple' ])
    });

    it('Should return cost of ingredients', () => {
        expect(recipe.costOfIngredients()).to.equal('4.16')
    })

    it('Should return instructions', () => {
        expect(recipe.returnInstructions()).to.deep.equal([
            'Season the pork chops with salt and pepper and grill or pan fry over medium high heat until cooked, about 3-5 minutes per side. (If grilling, baste the chops in the maple dijon apple cider sauce as you grill.)Meanwhile, mix the remaining ingredients except the apple slices, bring to a simmer and cook until the sauce thickens, about 2-5 minutes.Grill or saute the apple slices until just tender but still crisp.Toss the pork chops and apple slices in the maple dijon apple cider sauce and enjoy!'
        ])
    })
});