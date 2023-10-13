import { loadHeaderFooter, getParams } from "./utils.mjs";
import RecipeData from "./recipeData.mjs";
import RecipeListing from "./recipeList.mjs";

loadHeaderFooter();

var category = getParams("category");

if (category) {
  const data = new RecipeData(category);
  createPage(category, data);
} else {
  category = getParams("group");
  const dataSRC = new RecipeData(category);
  createPage(category, dataSRC);
}

function createPage(param, data) {
  const listElement = document.querySelector(".recipe-list");

  const spanElement = document.querySelector(".titleName");
  const h1Element = document.createElement("h1");
  h1Element.textContent = param.toUpperCase();
  spanElement.appendChild(h1Element);

  const recipeListing = new RecipeListing(param, data, listElement);

  recipeListing.init();
}
