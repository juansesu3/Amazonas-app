import React from 'react'
import "./SingleProduct.css";
import { useParams } from "react-router-dom"
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined"
import { products } from "../../utils/ProductsData"
import { useDispatch } from 'react-redux'
import { addToBasket } from '../../redux/action'

import { SideBySideMagnifier } from "react-image-magnifiers";

const SingleProduct = () => {

    let { id } = useParams();
    let singleProduct = products.find((item) => item.id === id);
    let dispatch = useDispatch();

    const addItemToBasket = () => {

        const item = {
            id: singleProduct.id,
            rating: singleProduct.rating,
            title: singleProduct.title,
            price: singleProduct.price,
            image: singleProduct.image,
            specification: singleProduct.specification,
            detail: singleProduct.detail
        }
        dispatch(addToBasket(item));

    }

    return (
        <div className='single-product-container'>
            <img
                className='single-product-ad'
                src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'
                alt=''
            />
            <div>
                <div className='single-product'>

                    <SideBySideMagnifier
                        imageSrc={singleProduct.image}
                        imageAlt="Example"
                    />

                    <div className='single-product-info'>
                        <div className='single-product-title'>{singleProduct.title}</div>
                        <div className='single-product-rating'>
                            {Array(singleProduct.rating)
                                .fill()
                                .map((_, index) => (<p key={index}><h1>*</h1></p>
                                ))}
                        </div>
                        <p className='single-product-price'>
                            Price: <strong>$</strong>
                            <strong>{singleProduct.price}</strong>
                        </p>
                        <div className='single-product-specification'>
                            <h4>Specification</h4>
                            {singleProduct.specification && singleProduct.specification.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}

                        </div>
                        <div className='single-product-description'>
                            <h4>Product descriptio</h4>
                            <p>{singleProduct.detail}</p>
                        </div>
                        <button onClick={addItemToBasket}>
                            <i><ShoppingCartOutlinedIcon /></i>
                            Add To Basket
                        </button>


                    </div>

                </div>
            </div>
        </div>
    )
}

export default SingleProduct
