import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

function renderFavPage() {

  const favRecipe = getLocalStorage("fav-recipe");

  if(favRecipe){
  const htmlItems = favRecipe.map((recipe) => favRecipeTemplate(recipe));
  document.querySelector(".recipe-list").innerHTML = htmlItems.join("");}
  else{
    document.querySelector(".recipe-list").innerHTML = "Sorry you have not yet favorited any recipes:)";
  }
}

function favRecipeTemplate(recipe) {
  const newItem = `<li class="recipe-card">
  <a href="#" class="recipeIMG">
    <img
      src="${recipe.Image}"
      alt="${recipe.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${recipe.Name}</h2>
  </a>
  <p class=""></p>
</li>`;

  return newItem;
}

loadHeaderFooter();
renderFavPage();
