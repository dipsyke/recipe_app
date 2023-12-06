import { useState} from "react";
import {Recipe} from "../Recipe.tsx";
import Modal from "./Modal.tsx";


interface Props {
    closeEditor: () => void
    isEditorOpen: boolean
    myRecipes: Recipe[]|null
    setMyRecipes:  React.Dispatch<React.SetStateAction<Recipe[] | null>>
}

export default function RecipeEditor(props: Props) {


    const [title, setTitle] = useState<string>("")
    const [servings, setServings] = useState<number>(0)
    const [ingredients, setIngredients] = useState<string[]>(["default ingredient here", "sec", "thr"])
    const [instructions, setInstructions] = useState<string>("")





    function addToMyRecipeList() {
        props.setMyRecipes((prevState: Recipe[] | null) => {
            if (prevState === null) {
                return null
            }
            return [
                ...prevState,
                newRecipe

            ]
        })
        props.closeEditor()
    }

    const newRecipe: Recipe = {
        title,
        servings,
        ingredients,
        instructions
    }


    return (
        <Modal onClose={props.closeEditor} isOpen={props.isEditorOpen}>
            <>
                <h3>Add your new recipe</h3>
                <label>Title</label>
                <input type="text" value={title} onChange={(event) => {
                    setTitle(event.target.value)
                }}></input>
                <label>Servings</label>
                <input type="number" value={servings} onChange={(event) => {
                    setServings(Number(event.target.value))
                }}></input>
                <label>Ingredients</label>

                <p>{ingredients}</p>


                {ingredients.map((ingredient, index) => {
                    function handleOnChange(newValue: string) {
                        setIngredients((prevState) => {
                            const newState = [...prevState]
                            newState[index] = newValue
                            return newState
                        })
                    }

                    return (
                        <>
                            <label key={'label' + index}>{index}</label>
                            <input key={'input' +index} type="text" value={ingredient}
                                   onChange={(event) => handleOnChange(event.target.value)}></input>
                        </>
                    )
                })}

                <button onClick={() => setIngredients((prevState) => {
                    const newState = [...prevState]
                    newState.push("")
                    return newState
                })}>Add new Ingredient
                </button>
<br />
                <label>Instructions</label>
                <input type="text" value={instructions}
                       onChange={(event) => setInstructions(event.target.value)}></input>
                <button onClick={addToMyRecipeList}>Add recipe</button>
            </>
        </Modal>
    )
}