import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import './Login/styles.css'

const LoginPage = () => {
    let {loginUser} = useContext(AuthContext)
    return (
        <div >
            <h1>Login </h1>
            <form onSubmit={loginUser}>
                <input type="text" name="username" placeholder="Enter Username" />
                <input type="password" name="password" placeholder="Enter Password" />
                <input type="submit" id='Button'/>
            </form>
        </div>
    )
}

export default LoginPage
