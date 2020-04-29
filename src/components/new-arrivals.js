import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar, faCartArrowDown} from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
window.$ = $;

var subTotal=0.0, productsInCart=[], prevSubTotal=0.0;

class NewArrivals extends Component{

    state={
        updatedProductsInCart: productsInCart
    }

    renderProductDetails = productId => event => {
       this.props.updateCurrentProductWithPId(productId);
       const toggleViewObj= {isSliderView: false, isAboutView: false, 
        isNewArrivalsView: false, isProductDetailsView: true, isCheckoutView: false};
	   document.getElementById('title').innerText="eShop - Product Details";
	   this.props.updateToggleViewObj(toggleViewObj);
    }

    addToCart = productId => event => {
        var currentProduct = this.props.getCurrentProductUsingPId(productId)[0], updatedPriceOfCurrentProduct=0.0, 
        originalProductPrice=0.0, currentProductPrice=0.0, currentProductQuantity=0;    
        if(subTotal > 0.0){
        /*
        * in a case where a user adds items to cart and updates the qty for the items in the cart details
        * update the subtotal accordinly if user closes cart details and clicks on another item to add
        * TODO: Optimize code later
        */
            prevSubTotal = parseFloat($(".sub-total").text());
            subTotal = prevSubTotal + currentProduct.productPrice;
        }else{
        /*
        * this is on an assumption that user is adding items to cart without 
        * updating the qty of items manually
        */
            subTotal+=currentProduct.productPrice; 
        }
        /*
        * if clicked product has already been added to cart just update the price, subtotal & quantity
        * of this particular product else add new product to cart
        */
        if(productsInCart.length < 1){
            productsInCart.push(currentProduct);
        }else {
          if(productsInCart.some(p => p.productId === currentProduct.productId)){ 
          originalProductPrice = currentProduct.productPrice;
          currentProductPrice = parseFloat($("table tr.cart-row"+currentProduct.productId+ " td.product-price").text()); 
          currentProductQuantity = parseInt($("table tr.cart-row"+currentProduct.productId+ " td.product-qty input.qty").val());
          currentProductQuantity+=1;
          updatedPriceOfCurrentProduct = currentProductPrice + originalProductPrice;
          $("table tr.cart-row"+currentProduct.productId+ " td.product-price").text(updatedPriceOfCurrentProduct);
          $("table tr.cart-row"+currentProduct.productId+ " td.product-qty input.qty").val(currentProductQuantity);
            } else{
           //if product not found, add to our products array
            productsInCart.push(currentProduct);
          }
        }
    
      $(".sub-total").text(subTotal);
      this.props.updateSubTotal(subTotal);
      this.props.currentCartItems(...productsInCart);
	}

    render(){
        let products = this.props.products;
        return(
            <section className="banner-bottom-wthreelayouts py-lg-5 py-3">
            <div className="container-fluid">
                <div className="inner-sec-shop px-lg-4 px-3">
                    <h3 className="tittle-w3layouts my-lg-4 my-4">New Arrivals for you </h3>
                    <div className="row" >
                    {products.map(p => {
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
                                                <button onClick={this.addToCart(p.productId)} className="googles-cart pgoogles-cart">
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