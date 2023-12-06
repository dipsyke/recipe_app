import {useEffect, useState} from 'react'

import './App.css'
import Home from "./components/Home.tsx";
import SignUpPanel from "./components/SignUpPanel.tsx";
import {User} from "./User.tsx";
import LoginPanel from "./components/LogInPanel.tsx";
import {Recipe} from "./Recipe.tsx";



function App() {
    const [isSignUpPanelOpen, setIsSignUpPanelOpen] = useState(false)
    const [isLoginPanelOpen, setIsLoginPanelOpen] = useState(false)
    const [users, setUsers] = useState<User[] | null>(null)
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [myRecipes, setMyRecipes] = useState<Recipe[] | null>(null)
    const [recipes, setRecipes] = useState<Recipe[]>(
        [
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
    )

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

    useEffect(() => {
        if (myRecipes !== null) {
            console.log("saving my recipes to local storage", myRecipes)
            localStorage.setItem('myRecipes', JSON.stringify(myRecipes))
        }
    }, [myRecipes]);

    useEffect(() => {
        const serializedRecipes = localStorage.getItem("myRecipes")
        if (serializedRecipes === null || serializedRecipes === undefined) {
            setMyRecipes([])
        } else {
            setMyRecipes(JSON.parse(serializedRecipes))
        }
        console.log(serializedRecipes)
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

        setCurrentUser(matchingUser)
        setIsUserLoggedIn(true)

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
            password
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

    function closePanels() {
        setIsLoginPanelOpen(false)
        setIsSignUpPanelOpen(false)
    }

    return (
        <>
            <p>Logged in user: {currentUser?.userName || 'No one'}</p>
            <Home myRecipes={myRecipes} setMyRecipes={setMyRecipes} recipes={recipes} isUserLoggedIn={isUserLoggedIn} userName={currentUser?.userName || "no one"}
                  onSignUp={() => setIsSignUpPanelOpen(true)} onLogIn={() => setIsLoginPanelOpen(true)}></Home>

            <SignUpPanel onClose={closePanels} isOpen={isSignUpPanelOpen} saveUserData={saveUserData}></SignUpPanel>
            <LoginPanel onClose={closePanels} isOpen={isLoginPanelOpen} tryToLogIn={tryToLogIn}></LoginPanel>


        </>
    )
}

export default App
