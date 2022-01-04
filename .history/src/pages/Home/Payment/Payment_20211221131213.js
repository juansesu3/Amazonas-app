import React, { useState, useEffect } from 'react'
import "./Payment.css"
import { useSelector, useDispatch } from "react-redux";
import CurrencyFormat from "react-currency-format";
import CheckoutProduct from '../../../components/CheckoutProduct/CheckoutProduct';
import { getBasketTotal } from "../../../utils/BasketTotal";
import { useNavigate, Link } from 'react-router-dom';
import { db } from "../../../utils/firebase";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from '../../../utils/axios';




const Payment = () => {

    const { basket, user } = useSelector(state => state.data)


    let dispatch = useDispatch();

    let navigate = useNavigate();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');//problema con los pagos debo de pasarle un valor que se pueda actualizar yo aqui lo estoy especificando como true
    


    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: "POST",
                url: `/payment/create?total=${getBasketTotal(basket) * 100}`,

            });
            setClientSecret(response.data.clientSecret)
        };
        getClientSecret();
    }, [basket]);

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        const payload = await stripe
        .confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
                
            }

        }).then(({ paymentIntent }) => {
            db.collection("users")
            .doc(user && user.uid)
            .collection("orders")
            .doc(paymentIntent.id)
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created,
            });
            setSucceeded(true);
            setError(null);
            setProcessing(false);
            navigate.replace("/orders");
        });
    };
    
    const handleChange = (e) => {

        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    };
    // const handleClick = (e) =>{
    //     console.log(disabled);
    // }onClick={handleClick} 



    let url = '';

    const [ubicacion, setUbicacion] = useState('')
 
   useEffect(() => {
     getCoordenadas();
   },)
 
   const getCoordenadas = () => {
      //watchPosition
      navigator.geolocation.getCurrentPosition(position => {
       const { latitude, longitude } = position.coords;
       url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyDvS3_rBwM7RJYjDOnPzquTpJVlskDs7nI';
       console.log(latitude,longitude)
       getUbicacion(url);
     });
     
   }
 
   const getUbicacion = async(endpoint) => {
     const resp = await fetch(endpoint);
     const {results} = await resp.json();
     console.log(results[0].formatted_address)
     setUbicacion(results[0].formatted_address)
   }


    return (
        <div className='payment'>

            <div className='payment-container'>
                <h1>Checkout {<Link to="/checkout"> {basket.length} items</Link>}</h1>
                <div className='payment-section'>
                    <div className='payment-title'>
                        <h3>Delivery Adress</h3>
                    </div>
                    <div className='payment-address'>
                        <p>{user && user.email}</p>
                        <p>adress</p>
                        <p>Lucknow, India</p>
                    </div>
                </div>
                <div className='payment-section'>
                    <div className='payment-title'>
                        <h3>Review items and Delivery</h3>

                    </div>
                    <div className='payment-items'>
                        {basket && basket.map((item) => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                <div className='payment-section'>
                    <div className='payment-title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment-details'>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className='payment-priceContainer'>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <h3>Order Total: {value}</h3>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button  disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default Payment
