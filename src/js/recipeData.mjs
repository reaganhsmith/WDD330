function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class RecipeData {
  constructor() {
    this.path = '../json/';
  }

  getData(category) {
    const fullPath = `${this.path}${category}.json`;
    return fetch(fullPath)
      .then(convertToJson)
      .then((data) => data);
  }

  

  async getRecipeData() {
    const categories = ["main", "desserts", "sides"];
    const data = {};

    for (const category of categories) {
      const data = await this.getData(category);
      data[category] = data;
    }

    return data;
  }

  async findRecipeById(id) {
    const categories = ["main", "desserts", "sides"];

    for (const category of categories) {
      const recipes = await this.getData(category);
      const recipe = recipes.find((recipe) => recipe.Id === id);
      if (recipe) {
        return recipe;
      }
    }
    return null;
  }

  async findRecipesByGroup(group) {
    const categories = ["main", "desserts", "sides"];
    const matchingRecipes = [];
    for (const category of categories) {
      const recipes = await this.getData(category);
      const matchingCategoryRecipes = recipes.filter((recipe) => recipe.Group === group);
      matchingRecipes.push(...matchingCategoryRecipes);
    }
    if (matchingRecipes.length > 0) {
      return matchingRecipes;
    } else {
      return null;
    }
  }


}




