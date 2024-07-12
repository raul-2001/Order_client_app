import React, {useRef, useState, useEffect} from 'react'
import styles from './LSignup.module.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useNavigate  } from "react-router-dom";


const Login = (props) => {
    const userRef = useRef();
    const errRef = useRef();
    let navigate  = useNavigate ();

    const [email, setEmail] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])
  
    const handleLogin = async (e) => {
        e.preventDefault();

        // console.log({email, password})
        try {
            const {data} = await axios.post('https://zero6-jobs-api-giraffe-3.onrender.com/api/v1/auth/logon', {email, password})
            setEmail('');
            setPwd('');
            // console.log(data)
            localStorage.setItem('token', data.token)
            
            // setSuccess(true);
            navigate("/")
        } catch (error) {
            setErrMsg(error)
            localStorage.removeItem('token')
            console.log(error)
        }

    }

    const handleLoginChange = () => {
        
    }

    return(
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br/>
                    <p>
                        <Link to='/'>Go to Home</Link>
                    </p>
                </section>
            ): (
                <section>
                    <p ref={errRef} className={errMsg ? styles.errmsg : styles.offscreen} 
                        aria-live='assertive'>
                        {errMsg}  
                    </p>
                    <h1>Sign in</h1>
                    <form onSubmit={handleLogin} className={styles.form}>
                        <div className={styles.row}>
                            <label className={styles.label} htmlFor="email">Username:</label>
                            <input className={styles.input} 
                            id="email" 
                            type="email"
                            ref={userRef}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            />
                        </div>
                        <div className={styles.row}>
                            
                            <label className={styles.label} htmlFor="password">Password:</label>
                            <input 
                            className={styles.input} 
                            id="password" 
                            type="password"
                            onChange={(e) => {setPwd(e.target.value)}}
                            value={password}
                            required
                            />
                        </div>
                        <div className={styles.form_alert}></div>
                        <button data-testid="submit_button" onClick={handleLoginChange} className={styles.btn} type='submit'>Sign in</button>
                    </form>
                    <p>
                        <span className={styles.line}>
                            <Link to='/register'>Sign up</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Login