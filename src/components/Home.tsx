import RecipePanel from "./RecipePanel.tsx";
import {Recipe} from "../Recipe.tsx";
import {useState} from "react";
import RecipeEditor from "./RecipeEditor.tsx";


interface Props {
    onSignUp: () => void
    onLogIn: () => void
    isUserLoggedIn: boolean
    userName: string
    recipes: Recipe[]
    myRecipes: Recipe[]|null
    setMyRecipes:  React.Dispatch<React.SetStateAction<Recipe[] | null>>
}


export default function Home(props: Props) {
    const [isRecipeListShowing, setIsRecipeListShowing] = useState<boolean>(false)
    const [isRecipeEditorOpen, setIsRecipeEditorOpen] = useState<boolean>(false)




    if (props.isUserLoggedIn) {
        return (
            <div className="home">
                <div>
                    <h1>Welcome {props.userName}!</h1>
                    <hr/>
                    <br/>
                    <div className="menu">
                        <button onClick={()=>setIsRecipeListShowing(true)}><h2>Brows all recipes</h2></button>
                        <button onClick={()=> setIsRecipeEditorOpen(true)}>Add new recipe</button>
                        <button>Log out</button>
                    </div>
                    {isRecipeListShowing && (
                        <RecipePanel recipes={props.recipes}></RecipePanel>
                    )}
                    {isRecipeEditorOpen && (
                        <RecipeEditor myRecipes={props.myRecipes} setMyRecipes={props.setMyRecipes} closeEditor={()=>setIsRecipeEditorOpen(false)} isEditorOpen={isRecipeEditorOpen}></RecipeEditor>
                    )}
                </div>
            </div>
        )
    }

    if (!props.isUserLoggedIn) {
        return (
            <div className="home">
                <div>
                    <div className="buttonBox">
                        <button onClick={props.onSignUp}>Sign up</button>
                        <button onClick={props.onLogIn}>Log in</button>
                    </div>
                    <h1>Someone cooked here</h1>
                    <hr/>
                    <h2>Brows our recipes</h2>
                    <RecipePanel recipes={props.recipes}/>
                </div>
            </div>
        )
    }
}