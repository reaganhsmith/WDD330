import { getLocalStorage } from "./utils.mjs";

function renderFavPage() {
  const favRecipe = getLocalStorage("fav-recipe");
  const htmlItems = favRecipe.map((recipe) => favRecipeTemplate(recipe));
  document.querySelector(".favorite-list").innerHTML = htmlItems.join("");
}

function favRecipeTemplate(recipe) {
  const newItem = `<li class="Favrecipe">
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
renderFavPage();
