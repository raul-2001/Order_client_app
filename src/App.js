import Login from './components/loginSignup/Login.js'
import {Routes, Route, Link} from 'react-router-dom'
import HomePage from './HomePage.js'
import styles from './components/loginSignup/LSignup.module.css'
import Contacts from './components/Contacts.js'
import Register from './components/loginSignup/Register.js'
import ItemsContainer from './components/ItemsContainer.js';
import { useEffect, useState } from 'react';
import CreateNewItem from './components/NewItem.js';
import CreateNewOrder from './components/Orders/NewOrder.js';
import OrderContainer from './components/Orders/OrdersContainer.js';
import Logout from './components/Logout.js'
import EditItem from './components/EditItemList.js'


function App() {

  const [token, setToken] = useState('') 

  const tok = localStorage.getItem("token")
  if(!tok){
    console.log("token")    
  }
  
  console.log("tok =>>", tok)
  // useEffect(() => {
  //   const tok = localStorage.getItem("token")
  
  //   setToken(tok)
  // }, [])

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
                {tok ? (
                <li>
                  <Link to='/logout'>Logout</Link>
                </li>

                ) : (
                <li>
                  <Link to='/login'>Sign in</Link>
                </li>
                )}
            </ul>
            </nav>
        </div>
      </header>
      
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/logout' element={<Logout />} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/orders' element={<OrderContainer/>} />
        <Route path='/items' element={<ItemsContainer/>} />
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/newItem' element={<CreateNewItem />} />
        <Route path='/newOrder' element={<CreateNewOrder />} />
        <Route path="/editItem/:id" element={<EditItem />} />
      </Routes>
    </>  
  );
}

export default App;
