// import Login from './components/loginSignup/Login.js'
import {Routes, Route, Link} from 'react-router-dom'
import HomePage from './HomePage.js'
import styles from './components/loginSignup/LSignup.module.css'
import Contacts from './components/Contacts.js'
import Register from './components/loginSignup/Register.js'
import ItemsContainer from './components/ItemsContainer.js';
import { useRef, useEffect, useState } from 'react';
import CreateNewItem from './components/NewItem.js';
import CreateNewOrder from './components/Orders/NewOrder.js';
import OrderContainer from './components/Orders/OrdersContainer.js';
// import Logout from './components/Logout.js'
import EditItem from './components/EditItemList.js'
import EditOrder from './components/Orders/EditOrder.js'
import { useNavigate  } from "react-router-dom";
import axios from 'axios'


function App() {

  const [token, setToken] = useState('') 
  let navigate  = useNavigate ();


  const Login = () => {

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
            const tok = localStorage.setItem('token', data.token)
            
            setToken(tok)
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



  const Logout = () => {
    const tok = localStorage.removeItem("token")
    setToken(tok)
    navigate('/')
  }


  useEffect(() => {
    const tok = localStorage.getItem("token")
  
    setToken(tok)
  }, [token])



  return (
    <>
      <header>
        <div className={styles.container}>
            <nav>
            <ul>
                <li>
                  <Link to='/'>Home</Link>
                </li>
                <li>
                  <Link to='/orders'>Orders</Link>
                </li>
                <li>
                  <Link to='/items'>Items</Link>
                </li>
                <li>
                  <Link to='/contacts'>Contacts</Link>
                </li>
                {token ? (
                <li>
                  <Link to='/logout'>Logout</Link>
                </li>

                ) : (
                <li>
                  <Link to='/login' >Sign in</Link>
                </li>
                )}
            </ul>
            </nav>
            <footer className={styles.footer}>
              <p>© 2024 Order ERP project. All rights reserved.</p>
            </footer>
        </div>
      </header>
      
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/logout' element={<Logout/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/orders' element={<OrderContainer/>} />
        <Route path='/items' element={<ItemsContainer/>} />
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/newItem' element={<CreateNewItem />} />
        <Route path='/newOrder' element={<CreateNewOrder />} />
        <Route path="/editItem/:id" element={<EditItem />} />
        <Route path='/editOrder/:id' element={<EditOrder />}/>
      </Routes>
    </>  
  );
}

export default App;
