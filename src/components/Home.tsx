interface Props {
    onSignUp: () => void
    onLogIn: () => void
}

export default function Home(props: Props) {
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
            </div>
            <div>
                <ul>
                    <li>Recipe1</li>
                    <li>Recipe2</li>
                    <li>Recipe3</li>
                </ul>
            </div>
        </div>
    )
}