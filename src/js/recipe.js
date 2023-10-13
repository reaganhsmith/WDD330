import { getParams, loadHeaderFooter } from "./utils.mjs";
import RecipeData from "./recipeData.mjs";
import RecipeDetails from "./recipeDetails.mjs";

const dataSource = new RecipeData();

const recipeId = getParams("recipe");
const recipe = new RecipeDetails(recipeId, dataSource);

loadHeaderFooter();
recipe.init();
