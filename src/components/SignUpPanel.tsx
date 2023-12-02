import { useState} from "react";


interface Props {
   saveUserData: (userName:string, password:string) => void

}
export default function SignUpPanel(props:Props) {

    const [userName, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")





    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                props.saveUserData(userName, password);
            }}>

                <label>Username</label>
                <input type="text" name="userName" value={userName}
                       onChange={(event) => setUserName(event.target.value)}></input>
                <label>Password</label>
                <input type="text" name="password" value={password}
                       onChange={(event) => setPassword(event.target.value)}></input>

                <button>Sign Up</button>
            </form>
        </div>
    )
}