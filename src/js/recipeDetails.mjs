// import { setLocalStorage, getLocalStorage} from "./utils.mjs";


function recipeDetailsTemplate(recipe) {
  let ingredientsList = '<ul>';
  recipe.Ingredients.forEach((ingredient) => {
    ingredientsList += `<li>${ingredient}</li>`;
  });
  ingredientsList += '</ul>';

  return `<section class="recipeDetails"> 
  <div class="recipeDetIMG">
    <img
      src="${recipe.Image}"
      alt="${recipe.Name}"
      class="recipeIMG"
    /></div>
    <h1>${recipe.Name}</h1>
    <a href=${recipe.source} TARGET="_blank">View Recipe</a>
    <h2>Servings: ${recipe.Servings} </h2> 
    <div class="nutrition">
    <h3> Nutrients: </h3>
      <p> Calories: ${recipe.Nutrition[0].Calories}kcal </p>
      <p> Carbohydrates: ${recipe.Nutrition[0].Carbs} grams </p>
      <p>Fats: ${recipe.Nutrition[0].Fats} grams </p>
      <p> Protein: ${recipe.Nutrition[0].Protein} grams </p>
    </div>
    <h3> Ingredients: </h3>
    ${ingredientsList}
    <h3> Directions: </h3>
    <span> ${recipe.Instructions}</span>
    <button id="addToFav" data-id="${recipe.Id}">Favorite</button>
  </section>`;
}



export default class RecipeDetails {
    constructor(recipeId, dataSource) {
      this.recipeId = recipeId;
      this.recipe = {};
      this.dataSource = dataSource;

    }
    async init() {

      this.recipe = await this.dataSource.findRecipeById(this.recipeId);
      this.renderRecipeDetails("main");


    }
    renderRecipeDetails(selector) {
      const element = document.querySelector(selector);
      element.insertAdjacentHTML(
        "afterBegin",
        recipeDetailsTemplate(this.recipe)
      );
    }
  }