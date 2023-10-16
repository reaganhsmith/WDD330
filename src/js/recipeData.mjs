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

  async getData(category) {
    const fullPath = `${this.path}${category}.json`;
    return fetch(fullPath)
      .then(convertToJson)
      .then((data) => data);
  }

  

  async getRecipeData() {
    const categories = ["Main", "Desserts", "Sides"];
    const data = {};

    for (const category of categories) {
      const data = await this.getData(category);
      data[category] = data;
    }

    return data;
  }

  async findRecipeById(id) {
    const categories = ["Main", "Desserts", "Sides"];

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
    const categories = ["Main", "Desserts", "Sides"];
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




