import { renderListWithTemplate } from "./utils.mjs";

export default class RecipeListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.recipes = [];
    }

    async init() {
        try {
            if(this.category === "main" || this.category === "sides" || this.category === "desserts"){
                console.log(this.dataSource.getData(this.category))
                this.recipes = await this.dataSource.getData(this.category);
        }else{
                this.recipes = await this.dataSource.findRecipesByGroup(this.category);
                
            }
        } catch (error) {
            console.error("Error fetching recipes:", error);
            this.recipes = [];
        }

        if (Array.isArray(this.recipes) && this.recipes.length > 0) {
            this.renderList(this.recipes);
        } else {
            console.warn("No recipes to display.");
        }

        const timeSort = document.querySelector(".cookTime");
        timeSort.addEventListener("click", () => this.sortTime());
        const ingSort = document.querySelector(".ingrd");
        ingSort.addEventListener("click", ()=> this.sortIng());

    }

    renderList(list, position = "afterbegin", clear = false) {
        renderListWithTemplate(RecipeTemplate, this.listElement, list, position, clear);
    }

    updateList(sorted){
        this.renderList(sorted, "afterbegin", true)
    }

    sortTime(){
        const sortedTime = [...this.recipes].sort((a,b) =>
        parseInt(a.Time.TotalTime) - parseInt(b.Time.TotalTime));
        this.updateList(sortedTime)
    }

    sortIng(){
        const sortedIng = [...this.recipes].sort((a,b) =>
        parseInt(a.Ingredients.length) - parseInt(b.Ingredients.length));
        this.updateList(sortedIng)
    }

}

function RecipeTemplate(recipe) {
    return `<li class="recipe-card">
        <a href="../recipe/index.html?recipe=${recipe.Id}">
        <img
         src="${recipe.Image}" 
         alt="${recipe.Name}" />
            <h2 class="card__brand">${recipe.Name}</h2>
        </a>

        <p><strong>Total time: </strong>${recipe.Time.TotalTime} minutes</p>
        <p><strong> Number of Servings: </strong>${recipe.Servings} </p>
        <p><strong> Number of ingredients: </strong>${recipe.Ingredients.length} </p>

    </li>`;
}

