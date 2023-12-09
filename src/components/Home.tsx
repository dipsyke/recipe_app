import RecipePanel from "./RecipePanel.tsx";
import {Recipe} from "../Recipe.tsx";
import {useState} from "react";
import {User} from "../User.tsx";


interface Props {
    onSignUp: () => void
    onLogIn: () => void
    currentUser: User | null
    userName: string
    publicRecipes: Recipe[]
}


export default function Home(props: Props) {
    const [isRecipeListShowing, setIsRecipeListShowing] = useState<boolean>(false)


    if (props.currentUser) {
        return (
            <div className="home">
                <div>
                    <h1>Welcome {props.userName}!</h1>
                    <hr/>
                    <br/>
                    <div className="menu">
                        <button onClick={() => setIsRecipeListShowing(true)}><h2>Brows all recipes</h2></button>
                        <button>Log out</button>
                    </div>
                    {isRecipeListShowing && (
                        <RecipePanel currentUser={props.currentUser} publicRecipes={props.publicRecipes}></RecipePanel>
                    )}
                </div>
            </div>
        )
    }

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
                <RecipePanel currentUser={props.currentUser} publicRecipes={props.publicRecipes}/>
            </div>
        </div>
    )
}