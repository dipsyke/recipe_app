import {Recipe} from "../Recipe.tsx";
import RecipeComp from "./RecipeComp.tsx";
import {useState} from "react";
import {User} from "../User.tsx";


interface Props {
    publicRecipes: Recipe[]
    currentUser: User | null
}

export default function RecipePanel(props: Props) {
    const [currentlyOpenRecipeTitle, setCurrentlyOpenRecipeTitle] = useState<string | null>(null)

    const publicRecipeList = props.publicRecipes.map((recipe) => {
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
            <div>
                <ul>
                    {publicRecipeList}
                </ul>
            </div>
            {props.currentUser && (
                <div>
                    <ul>
                        {props.currentUser.recipes.map((recipe) => {
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
                        })}
                    </ul>
                </div>
            )}
        </div>
    )
}

