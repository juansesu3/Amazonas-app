
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Login from './pages/Home/Login/Login';
import Register from './pages/Home/Register/Register';
import {useDispatch} from "react-redux"
import { useEffect } from 'react';
import { auth } from "./utils/firebase"
import { setuser } from './redux/action';
import SingleProduct from './components/SingleProduct/SingleProduct';
import Checkout from './pages/Home/Checkout/Checkout';
import Payment from './pages/Home/Payment/Payment'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

const promise = loadStripe(
  "pk_test_51K5vDxDOEe77DZTnimSZKgaWXGMm5kaEFPZ2oQMrs6SArh3aDsnyLkmU8tMWtCwQm3dQIAIvAHylNFb1WI9Y1uYD00dnq9qs3V");

function App() {
  let dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        dispatch(setuser(authUser))
      }else {
        dispatch(setuser(null))
      }
    })
  
  }, [dispatch])
  return (
    <BrowserRouter>
    <div className="App">
      <Header/>
      <Routes>
  
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/product/:id" element={<SingleProduct/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/payment" element={<Elements stripe={promise}><Payment/></Elements>}/>
        
      </Routes>
      
     
    </div>
    </BrowserRouter>
  );
}

export default App;
