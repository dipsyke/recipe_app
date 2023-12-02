import {useEffect, useState} from 'react'

import './App.css'
import Home from "./components/Home.tsx";
import Modal from "./components/Modal.tsx";
import SignUpPanel from "./components/SignUpPanel.tsx";
import {User} from "./User.tsx";
import LoginPanel from "./components/LogInPanel.tsx";

function App() {
    const [isSignUpPanelOpen, setIsSignUpPanelOpen] = useState(false)
    const [isLoginPanelOpen, setIsLoginPanelOpen] = useState(false)
    const [users, setUsers] = useState<User[] | null>(null)
    const [currentUser, setCurrentUser] = useState<User | null>(null)

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
        if(matchingUser===undefined){return false}
        if(matchingUser.password!==password){
            return false
        }

        setCurrentUser(matchingUser)

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

    function openPanel(){
        if(isSignUpPanelOpen){
            return <SignUpPanel saveUserData={saveUserData}/>
        }else if(isLoginPanelOpen){
            return <LoginPanel tryToLogIn={tryToLogIn}/>
        }
        return <></>
    }

    return (
        <>
            <p>Logged in user: {currentUser?.userName || 'No one'}</p>
            <Home onSignUp={() => setIsSignUpPanelOpen(true)} onLogIn={() => setIsLoginPanelOpen(true)}></Home>
            <Modal onClose={() => setIsSignUpPanelOpen(false)} isOpen={isSignUpPanelOpen || isLoginPanelOpen}>
                {openPanel()}
            </Modal>
            <LoginPanel tryToLogIn={tryToLogIn}/>
            {/*<Modal onClose={()=>setIsLoginModalOpen(false)} isOpen={isLoginModalOpen}>*/}
            {/*    <LogInPanel />*/}
            {/*</Modal>*/}
        </>
    )
}

export default App
