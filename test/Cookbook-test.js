import { expect } from 'chai';
import Cookbook from '../src/classes/Cookbook';

describe('Cookbook', () => {
  it('Should be a function', () => {
    expect(Cookbook).to.be.a('function');
  });
});