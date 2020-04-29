import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar, faCartArrowDown} from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
window.$ = $;


class NewArrivals extends Component{

    state={
        
    }

    renderProductDetails = productId => event => {
       this.props.updateCurrentProductWithPId(productId);
       const toggleViewObj= {isSliderView: false, isAboutView: false, 
        isNewArrivalsView: false, isProductDetailsView: true, isCheckoutView: false};
	   document.getElementById('title').innerText="eShop - Product Details";
	   this.props.updateToggleViewObj(toggleViewObj);
    }

    render(){
        return(
            <section className="banner-bottom-wthreelayouts py-lg-5 py-3">
            <div className="container-fluid">
                <div className="inner-sec-shop px-lg-4 px-3">
                    <h3 className="tittle-w3layouts my-lg-4 my-4">New Arrivals for you </h3>
                    <div className="row" >
                    {this.props.products.map(p => {
                    return(
                    <div className="col-md-3 product-men women_two" key={p.productId}>
                        <div className="product-googles-info googles">
                            <div className="men-pro-item">
                                <div className="men-thumb-item">
                                    <img src={`${process.env.REACT_APP_API_IMG_PATH}/`+ p.productImage} className="img-fluid" alt=""/>
                                    <div className="men-cart-pro">
                                        <div className="inner-men-cart-pro">
                                            <a href="/" className="link-product-add-cart">Quick View</a>
                                        </div>
                                    </div>
                                    <span className="product-new-top">New</span>
                                </div>
                                <div className="item-info-product">
                                    <div className="info-product-price">
                                        <div className="grid_meta">
                                            <div className="product_price">
                                                <h4>
                                                <a href="/#" onClick={this.renderProductDetails(p.productId)}>{p.productName}</a>
                                                </h4>
                                                <div className="grid-price mt-2">
                                                    <span className="money ">${p.productPrice}</span>
                                                </div>
                                            </div>
                                            <ul className="stars">
                                                {[...Array(5)].map((e,i) => {
                                                    return (
                                                    <li key={i}>
                                                        <a href="/#">
                                                        <FontAwesomeIcon icon={faStar}/>
                                                        </a>
                                                    </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                       
                                        <div className="googles single-item hvr-outline-out">
                                                <button onClick={this.props.addToCart(p.productId)} className="googles-cart pgoogles-cart">
                                                  <FontAwesomeIcon icon={faCartArrowDown}/>
                                                </button>                                                    
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )})
                       }
                    </div>
                </div>
            </div>
        </section>
      )
    }
}

export default NewArrivals;