import React from 'react';
import '../styles/App.css'

const ProductCard = (props) => {
    return (
            <div>
                <div className='product-card box'>
                <div className={`product-tumb ${props.class}`}>
                <img src={props.image} alt={props.name} />
                </div>
                <div className="product-details">
                    <span className="product-code">{props.sku}</span>
                    <div className="product-price">{props.price}</div>
                    <h6 style={{'marginTop': '5px'}}>{props.name}</h6>
                    <p>{props.description}</p>
                </div>
                </div>
            </div>
    )
}


export default ProductCard