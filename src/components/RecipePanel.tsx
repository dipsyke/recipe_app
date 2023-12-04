import {Recipe} from "../Recipe.tsx";

interface Props {
    recipes: Recipe[]
}
export default function RecipePanel(props:Props) {
    const recipeList = props.recipes.map((recipe) => {
        return (
            <li>{recipe.title}</li>
        )
    })
    return (
        <div>
            <ul>
                {recipeList}
            </ul>
        </div>
    )
}

