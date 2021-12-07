import { expect } from 'chai';
import Cookbook from '../src/classes/Cookbook';
import Recipe from '../src/classes/Recipe';

var recipe = require('../src/data/recipe-data-test')

describe('Cookbook', () => {
  
  const recipes = recipe.map(recipe => {
    return new Recipe(recipe.id,recipe.image,recipe.ingredients,recipe.instructions,recipe.name,recipe.tags)
  });

    const cookbook = new Cookbook(recipes)

  it('Should be a function', () => {
    expect(Cookbook).to.be.a('function');
  });

  it('should be an instance of CookBook', () => {
    expect(cookbook).to.be.an.instanceOf(Cookbook);
  });

  it('should store recipes', () => {
    expect(cookbook.recipes).to.equal(recipes)
  });

  it('should filter by the tags and return a recipe', () => {
    
    expect(cookbook.filterByTags('dinner')).to.deep.equal([
      {
      "id": 412309,
      "image": "https://spoonacular.com/recipeImages/412309-556x370.jpeg",
      "ingredients": [
        {
          "id": 1002030,
          "quantity": {
            "amount": 4,
            "unit": "teaspoons"
          }
        },
        {
          "id": 19334,
          "quantity": {
            "amount": 8,
            "unit": "tablespoons"
          }
        },
        {
          "id": 1001,
          "quantity": {
            "amount": 2,
            "unit": "cups"
          }
        },
        {
          "id": 4582,
          "quantity": {
            "amount": 4,
            "unit": "servings"
          }
        },
        {
          "id": 2031,
          "quantity": {
            "amount": 4,
            "unit": "teaspoons"
          }
        },
        {
          "id": 5100,
          "quantity": {
            "amount": 1,
            "unit": "pound"
          }
        },
        {
          "id": 2009,
          "quantity": {
            "amount": 4,
            "unit": "teaspoons"
          }
        },
        {
          "id": 1022020,
          "quantity": {
            "amount": 4,
            "unit": "teaspoons"
          }
        },
        {
          "id": 6168,
          "quantity": {
            "amount": 8,
            "unit": "cups"
          }
        },
        {
          "id": 9176,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 2026,
          "quantity": {
            "amount": 4,
            "unit": "teaspoons"
          }
        },
        {
          "id": 1042047,
          "quantity": {
            "amount": 1.5,
            "unit": "tablespoons"
          }
        },
        {
          "id": 1042047,
          "quantity": {
            "amount": 4,
            "unit": "teaspoons"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Mix the hot sauce, butter, mango habanero sauce, brown sugar, chili powder, garlic powder, onion powder, black pepper, cayenne pepper and seasoning salt in a bowl. Stir vigorously until completely combined.",
          "number": 1
        }
      ],
      "name": "Dirty Steve's Original Wing Sauce",
      "tags": [
        "dinner"
      ]
    }]
  )
  })
});