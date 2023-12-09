import {useState} from "react";
import Modal from "./Modal.tsx";

interface Props {
    tryToLogIn: (userName: string, password: string) => boolean
    isOpen: boolean
    onClose: () => void
}

export default function LoginPanel(props: Props) {
    const [userName, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    function handleLoginClick() {
        const result = props.tryToLogIn(userName, password)
        if (result) {
            console.log('successfully logged in')
        } else {
            alert('failed to log in')
        }
    }

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <form onSubmit={(e) => {
                e.preventDefault();

            }}>

                <label>Username</label>
                <input type="text" name="userName" value={userName}
                       onChange={(event) => setUserName(event.target.value)}></input>
                <label>Password</label>
                <input type="text" name="password" value={password}
                       onChange={(event) => setPassword(event.target.value)}></input>

                <button onClick={handleLoginClick}>Log In</button>
            </form>
        </Modal>
    )
}