import RecipePanel from "./RecipePanel.tsx";
import {Recipe} from "../Recipe.tsx";

interface Props {
    onSignUp: () => void
    onLogIn: () => void
    isUserLoggedIn: boolean
    userName: string
    recipes:Recipe[]
}


export default function Home(props: Props) {

    function showRecipeList(){
        return (
            <RecipePanel recipes={props.recipes}></RecipePanel>
        )
    }

        if (props.isUserLoggedIn) {
            return (
                <div className="home">
                    <div>
                        <h1>Welcome {props.userName}!</h1>
                        <hr/>
                        <div className="menu">
                            <button onClick={showRecipeList}><h2>Brows all recipes</h2></button>
                            <button><h2>My recipes</h2></button>
                            <button>Add new recipe</button>
                            <button>Log out</button>
                        </div>
                    </div>
                </div>
            )
        }

        if(!props.isUserLoggedIn){
            return(
        <div className="home">
            <div>
                <div className="buttonBox">
                    <button onClick={props.onSignUp}>Sign up</button>
                    <button onClick={props.onLogIn}>Log in</button>
                </div>
                <h1>Someone cooked here</h1>
                <hr/>
                <h2>Brows our recipes</h2>
            </div>
        </div>
    )
}}