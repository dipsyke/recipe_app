import {useEffect, useState} from 'react'

import './App.css'
import Home from "./components/Home.tsx";
import SignUpPanel from "./components/SignUpPanel.tsx";
import {User} from "./User.tsx";
import LoginPanel from "./components/LogInPanel.tsx";
import {Recipe} from "./Recipe.tsx";
import RecipeEditor from "./components/RecipeEditor.tsx";

const publicRecipes = [
    {
        title: "Pancake",
        servings: 4,
        ingredients: ["eggs", "milk", "water", "oil", "flour"],
        instructions: "Make some pancakes."
    },
    {
        title: "Cupcake",
        servings: 6,
        ingredients: ["eggs", "milk", "butter", "blueberries", "flour", "vanilla"],
        instructions: "Make some cupcakes."
    },
    {
        title: "Brownies",
        servings: 12,
        ingredients: ["eggs", "banana", "butter", "flour", "baking powder"],
        instructions: "Make some brownies."
    }
]

function App() {
    const [isSignUpPanelOpen, setIsSignUpPanelOpen] = useState(false)
    const [isLoginPanelOpen, setIsLoginPanelOpen] = useState(false)
    const [isRecipeEditorOpen, setIsRecipeEditorOpen] = useState<boolean>(false)

    const [users, setUsers] = useState<User[] | null>(null)
    const [currentUserName, setCurrentUserName] = useState<string | null>(null)


    const currentUser = users?.find(user => user.userName === currentUserName) || null


    useEffect(() => {
        if (users !== null) {
            console.log("saving users to local storage", users)
            localStorage.setItem('users', JSON.stringify(users))
        }
    }, [users]);

    useEffect(() => {
        const asd = localStorage.getItem("users")
        if (asd === null || asd === undefined) {
            setUsers([])
        } else {
            setUsers(JSON.parse(asd))
        }
        console.log(asd)
    }, [])


    /**
     * Logs in user with username if password is correct
     * @param username
     * @param password
     * @return True if login was successful, False if not
     */
    function tryToLogIn(username: string, password: string): boolean {
        if (users === null) {
            return false
        }

        const matchingUser = users.find((user) => user.userName === username)
        if (matchingUser === undefined) {
            return false
        }
        if (matchingUser.password !== password) {
            return false
        }

        setCurrentUserName(matchingUser.userName)

        return true
    }

    function saveUserData(userName: string, password: string) {
        if (users === null) {
            alert("users are not loaded yet")
            return;
        }
        if (users.some((item) => item.userName === userName)) {
            alert(`userName ${userName} is already taken`)
            return
        }

        const newUser: User = {
            userName,
            password,
            recipes: []
        }

        setUsers((prevState) => {
                if (prevState === null) {
                    return null
                }
                return [
                    ...prevState,
                    newUser
                ]
            }
        )
    }

    function setRecipesOfCurrentUser(recipes: Recipe[]) {
        if (!currentUserName) {
            alert('No user is logged in')
            return
        }

        setUsers((prevUsers) => {
            if (!prevUsers) {
                alert('User not yet loaded')
                return prevUsers
            }

            const newUsers = [...prevUsers]

            const userToSetRecipesOf = newUsers.find(user => user.userName === currentUserName)
            if (!userToSetRecipesOf) {
                alert('User not found')
                return newUsers
            }

            userToSetRecipesOf.recipes = recipes

            return newUsers
        })
    }

    function closePanels() {
        setIsLoginPanelOpen(false)
        setIsSignUpPanelOpen(false)
    }


    return (
        <>
            <p>Logged in user: {currentUser?.userName || 'No one'}</p>
            <Home
                publicRecipes={publicRecipes}
                currentUser={currentUser}
                userName={currentUser?.userName || "no one"}
                onSignUp={() => setIsSignUpPanelOpen(true)} onLogIn={() => setIsLoginPanelOpen(true)}
            ></Home>

            {currentUser && (
                <>
                    <button onClick={() => setIsRecipeEditorOpen(true)}>Add new recipe</button>

                    {isRecipeEditorOpen && (
                        <RecipeEditor
                            currentUser={currentUser}
                            setRecipesOfCurrentUser={setRecipesOfCurrentUser}
                            closeEditor={() => setIsRecipeEditorOpen(false)}
                            isEditorOpen={isRecipeEditorOpen}
                        />
                    )}

                </>
            )}
            <SignUpPanel onClose={closePanels} isOpen={isSignUpPanelOpen} saveUserData={saveUserData}></SignUpPanel>
            <LoginPanel onClose={closePanels} isOpen={isLoginPanelOpen} tryToLogIn={tryToLogIn}></LoginPanel>
        </>
    )
}
        export default App
