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
    expect(cookbook.filterByTags()).to.equal('')
  })

});