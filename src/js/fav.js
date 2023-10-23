import { doc } from "prettier";
import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

function renderFavPage() {
  const favRecipe = getLocalStorage("fav-recipe");

  if (favRecipe.length > 0) {
    const htmlItems = favRecipe.map((recipe) => favRecipeTemplate(recipe));
    document.querySelector(".recipe-list").innerHTML = htmlItems.join("");

    const deleteBtn = document.querySelectorAll(".delete");

    deleteBtn.forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", () => {
        const recipeID = deleteBtn.id;
        removeRecipe(recipeID);
      });
    });
  } else {
    document.querySelector(".recipe-list").innerHTML = "Sorry, you have not yet favorited any recipes.";
  }
}

function favRecipeTemplate(recipe) {
  const newItem = `<li class="recipe-card">
  <button class="delete" id="${recipe.Id}"> <span class="material-symbols-outlined">
cancel
</span></button>
  <a href="../recipe/index.html?recipe=${recipe.Id}">
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

function removeRecipe(recipeID) {
  const favRecipe = getLocalStorage("fav-recipe");
  
    const recipeIndex = favRecipe.findIndex(recipe => recipe.Id === recipeID);

  if (recipeIndex !== -1) {
    favRecipe.splice(recipeIndex, 1);
    location.reload();

    localStorage.setItem("fav-recipe", JSON.stringify(favRecipe));

    console.log(`Recipe with ID ${recipeID} has been removed from local storage.`);
  } else {
    console.log(`Recipe with ID ${recipeID} not found in local storage.`);
  }
}

loadHeaderFooter();
renderFavPage();
