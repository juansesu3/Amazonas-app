import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Login.css"
import { useSelector, useDispatch} from "react-redux"
import { loginInitiate } from '../../../redux/action'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {user} = useSelector(state => state.data)

    let dispatch = useDispatch();
    let navigate = useNavigate()

    useEffect(() => {
        if(user){
            navigate("/")
        }
    }, [user, dispatch])

    const signIn = e => {
        e.preventDefault()
        dispatch(loginInitiate(email, password));
        setEmail("")
        setPassword("")

    }
    return (
        <div className='login'>
            <Link to="/">
                <img
                    src='https://res.cloudinary.com/dv08oqgvx/image/upload/v1638667349/AmazonasSprint3/idpx3itrxyt4eoctevkg.png'
                    className='login-logo'
                    alt='logo'
                />
            </Link>
            <div className='login-container'>
                <h1>Sign In</h1>
                <form>

                    <h5>E-Mail</h5>
                    <input
                        type="text"
                        values={email}
                        onChange={(e) => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input
                        type="password"
                        values={password}
                        onChange={(e) => setPassword(e.target.value)} />

                    <button type="submit" onClick={signIn} className='login-signIn'>Sign In</button>

                </form>

                <p>By continuing, you agree to Amazonas Conditions of Use and Privacy Notice </p>

            </div>
            <p>New to Amazonas?</p>
            <Link to="/register">
                <button className='login-register'>Create Your Amazonas Account</button>
            </Link>

        </div>
    )
}

export default Login
