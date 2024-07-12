import React, {useState, useRef, useEffect} from "react"
import {Link} from 'react-router-dom'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from './register.module.css'
import axios from 'axios'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signup =() => {

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user)
        console.log(result)
        console.log(user)
        setValidName(result)
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result)
        console.log(pwd)
        setValidPwd(result)
        const match = pwd === matchPwd;
        setValidMatch(match)
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSumbit = async (e) => {
        e.preventDefault();

        const v1 = USER_REGEX.test(user)
        const v2 = PWD_REGEX.test(pwd)

        if(!v1 || !v2) {
            setErrMsg("Invalid Entry")
            return;
        }

        

        try {
            // console.log(user, email, pwd, matchPwd)

            const {data} = await axios.post('https://zero6-jobs-api-giraffe-3.onrender.com/api/v1/auth/register', {name: user, email, password: pwd})
            setEmail('');
            setPwd('');
            console.log(data)
            localStorage.setItem('token', data.token)
        
            setSuccess(true);
        } catch (error) {
            setErrMsg(error.response.data.msg)
            localStorage.removeItem('token')
            console.log(error.response.data.msg)
            errRef.current.focus()
        }
    }


    return(
        <>
            {success ? (
                <section>
                    <h1>Success</h1>
                    <p>
                        <Link to='/login'>Sign in</Link>
                    </p>
                </section>
            ): (
            <section>
                <p ref={errRef} className={errMsg ? styles.errmsg : styles.offscreen}
                    aria-live="assertive">
                    {errMsg}
                </p>
                <h1>Register</h1>
                <form onSubmit={handleSumbit}>

                    <label htmlFor="username">
                        Username:
                        <span className={validName ? styles.valid : styles.hide}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validName || !user ? styles.hide : styles.invalid}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    /> 
                    <p id="uidnote" className={userFocus && user && !validName ? styles.instructions : styles.offscreen}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hypens allowed.<br />
                    </p>

                    <label htmlFor="email">
                        Email:
                    </label>

                    <input
                        type="email"
                        id="email"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    /> 


                    <label htmlFor="password">
                        Password:
                    </label>
                        <span className={validPwd ? styles.valid : styles.hide}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validPwd || !pwd ? styles.hide : styles.invalid}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    <input
                        type="password"
                        id="password"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setPwd(e.target.value)}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    <p id='pwdnote' className={pwdFocus && !validPwd ? styles.instructions : styles.offscreen}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Letters, number, underscores, hypens allowed.
                        Allowed special characters: <span aria-label="exclamation mark">!</span>
                        <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
                        <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>

                    <label htmlFor="confirm_pwd">
                        Confirm password:
                    </label>
                        <span className={validMatch && matchPwd ? styles.valid : styles.hide}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validMatch || !matchPwd ? styles.hide : styles.invalid}>
                        <FontAwesomeIcon icon={faTimes} />
                        </span>
                    <input
                        type="password"
                        id="confirm_pwd"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p id='confirmnote' className={matchFocus && !validMatch ? styles.instructions : styles.offscreen}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                    </p>
                    <button disabled={!validName || !validPwd || !validMatch ? true : false}>
                        Sign Up
                    </button>
                </form>
                <p>
                    Already registered?<br />
                    <span className={styles.line}>
                        {/*put router link here */}
                        <Link to='/login'>Sign up</Link>
                    </span>
                </p>
            </section>
                )}
            </>
    )
}

export default Signup