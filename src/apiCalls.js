// Your fetch requests will live here!

const userData =
  fetch('http://localhost:3001/api/v1/users')
    .then(response => response.json())

const recipesData =
  fetch('http://localhost:3001/api/v1/recipes')
    .then(response => response.json())

const ingredientData =
  fetch('http://localhost:3001/api/v1/ingredients')
    .then(response => response.json())


export { userData, recipesData, ingredientData };