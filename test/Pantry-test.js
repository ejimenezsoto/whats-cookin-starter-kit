import { expect } from 'chai';
import Pantry from '../src/classes/Pantry';
import User from '../src/classes/User'
import usersTestdata from '../src/data/user-data-test';
import ingredientsTestData from '../src/data/ingredient-data-test';




describe('Panrty', () => {
  let pantry;
  const users = usersTestdata.map(user => {
    return new User(user.name, user.id, pantry = new Pantry(user.pantry, ingredientsTestData ), ingredientsTestData)
  });



  // console.log(users[0].pantry.listIngredientsNameAndAmount());

  

  it('Should be a function', () => {
    expect(Pantry).to.be.a('function')
  });

  it('Should be an instance of Pantry', () => {
    expect(pantry).to.be.an.instanceof(Pantry);
  });

  it.only('should list ingredient names and amounts', () => {
    expect(users[0].pantry.listIngredientsNameAndAmount()).to.equal('')
  })

})