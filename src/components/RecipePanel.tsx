import {Recipe} from "../Recipe.tsx";
import RecipeComp from "./RecipeComp.tsx";
import {useState} from "react";


interface Props {
    recipes: Recipe[]
}

export default function RecipePanel(props: Props) {
    const [currentlyOpenRecipeTitle, setCurrentlyOpenRecipeTitle] = useState<string | null>(null)

    const recipeList = props.recipes.map((recipe) => {
        return (
            <>
                <li className="underline-on-hover"
                    onClick={() => setCurrentlyOpenRecipeTitle(recipe.title)}>
                    {recipe.title}
                </li>
                {recipe.title === currentlyOpenRecipeTitle && (
                    <RecipeComp recipe={recipe}></RecipeComp>
                )}
            </>
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

