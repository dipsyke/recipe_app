import {Recipe} from "../Recipe.tsx";

interface Props {
    recipe: Recipe
}

export default function RecipeComp(props: Props) {

    return (
        <div style={{borderStyle: 'solid'}}>
            <p>{props.recipe.servings} servings</p>
            <p>Ingredients: </p>
            <ul>
                {props.recipe.ingredients.map((ingredient)=>{
                    return(
                        <li>- {ingredient}</li>
                    )
                })}

            </ul>
            <p>Instructions: </p>
            <p>{props.recipe.instructions}</p>
        </div>
    )
}