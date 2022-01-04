import React from 'react'
import "./Product.css"
import { Link } from "react-router-dom"
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined"

import {useDispatch} from "react-redux"
import { addToBasket } from '../../redux/action'


const Product = ({ 
    id,
    title,
    image,
    price, 
    rating,
    specification,
    detail,
 }) => {

    const dispatch = useDispatch()
    const onAddItemToBasket = () => {
        const item = {
            id, 
            title,
            image,
            price,
            rating,
            specification,
            detail,
        };
        dispatch(addToBasket(item))
    };


    return (
        <div className='product'>
            <div className='info'>
                <Link to={`/product/${id}`} className='title'>
                    <p>{title}</p>
                </Link>
                <p className='price'>
                    <strong>$</strong>
                    <strong>{price}</strong>
                </p>
                <div className='rating'>
                    {Array(rating)
                    .fill()
                    .map((_, index) =>( <p key={index}><h1>*</h1></p>
                    ))}
                </div>
                </div>
                <img src={image} alt="image"/>
                <button onClick={onAddItemToBasket}>
                    <i>
                        <ShoppingCartOutlinedIcon/>
                    </i>
                    Add To Basket
                </button>

           

        </div>
    )
}

export default Product
