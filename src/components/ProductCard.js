import React from 'react';
import '../styles/App.css'
import Button from '../components/Button'

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
                    {/* <div className="product-bottom-details">
                        <div className="d-flex w-100 flex-row justify-content-center">
                            <Button label='Delete' color='danger' className='mr-xl-5'/>
                            <Button label='Edit' color='link'/>
                        </div>
                </div> */}
                </div>
            </div>
    )
}


export default ProductCard