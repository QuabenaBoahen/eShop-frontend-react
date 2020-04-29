import React, { Component } from 'react';
import Header from './components/header';
import Slider from './components/slider';
import NewArrivals from './components/new-arrivals';
import Footer from './components/footer';
import About from './components/about';
import ProductDetails from './components/product-details';
import Checkout from './components/checkout';
import $ from 'jquery';
window.$ = $;

let subTotal=0.0, productsInCart=[], prevSubTotal=0.0, subTotalAfterItemDeletion=0.0;
class App extends Component {

  state = {
    toggleViewObj: {
    isSliderView: true,
    isAboutView: false,
    isNewArrivalsView: true,
    isProductDetailsView: false,
    isCheckoutView: false
    },
    products: [],
    currentProductWithDetails: {},
    cartItems: [],
    isCartEmpty: true,
    subTotal: 0.0
  }

  updateToggleViewObj = viewObj => {
    this.setState({toggleViewObj: {isSliderView: viewObj.isSliderView,
      isAboutView: viewObj.isAboutView, isNewArrivalsView: viewObj.isNewArrivalsView, 
      isProductDetailsView: viewObj.isProductDetailsView, isCheckoutView: viewObj.isCheckoutView}})
  }

  componentDidMount(){
    //fetch new arrival products
    fetch(`${process.env.REACT_APP_API_URI}/products/specific-products/?status=New Arrival`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => {this.setState({products: response})
    }).catch(error => console.log('error msg ', error))
 }

 updateCurrentProductWithPId = productId => {
   this.state.products.filter(p => p.productId.includes(productId)?
   this.setState({currentProductWithDetails: p}): console.log('')
  )
 }

 getCurrentProductUsingPId = productId => {
  return this.state.products.filter(p => p.productId.includes(productId)?
  p: console.log('')
 )
}

currentCartItems = (...cartItems) => {
    this.setState({cartItems: cartItems, isCartEmpty: false})
}


computeSubTotalOnCartItemPriceChange = (className) => {
  let sum = 0;
 $(`.${className}`).each(function() {
  let value = $(this).text();
  //add only if the value is number
  if(!isNaN(value) && value.length !== 0) {
     sum += parseFloat(value);		 
  }
});
return sum;
 }

 updateSubTotal = updatedSubTotal => {
   this.setState({subTotal: updatedSubTotal});
 }

 updateCartStatus = status => {
    this.setState({isCartEmpty: status});
 }

 addToCart = productId => event => {
  let currentProduct = this.getCurrentProductUsingPId(productId)[0], updatedPriceOfCurrentProduct=0.0, 
  originalProductPrice=0.0, currentProductPrice=0.0, currentProductQuantity=0;    
  if(parseFloat($(".sub-total").text()) > 0.0){
  /*
  * in a case where a user adds items to cart and updates the qty for the items in the cart details
  * update the subtotal accordinly if user closes cart details and clicks on another item to add
  * TODO: Optimize code later
  */
      prevSubTotal = parseFloat($(".sub-total").text());
      subTotal = (prevSubTotal + currentProduct.productPrice).toFixed(2);
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
    updatedPriceOfCurrentProduct = (currentProductPrice + originalProductPrice).toFixed(2);
    $("table tr.cart-row"+currentProduct.productId+ " td.product-price").text(updatedPriceOfCurrentProduct);
    $("table tr.cart-row"+currentProduct.productId+ " td.product-qty input.qty").val(currentProductQuantity);
      } else{
     //if product not found, add to our products array
      productsInCart.push(currentProduct);
    }
  }

$(".sub-total").text(subTotal);
this.updateSubTotal(subTotal);
this.currentCartItems(...productsInCart);
}

deleteCartItem = (rowClass, currentProductId, classWithPrice) => event => {
  let currentCartItems = this.state.cartItems;
  let indexOfItemToBeRemovedFromArray = currentCartItems.findIndex(p => p ===this.getCurrentProductUsingPId(currentProductId)[0]);
  let currentProductPrice = parseFloat($('table tr.' + rowClass + ' td.' + classWithPrice).text()); 
      
  currentCartItems.splice(indexOfItemToBeRemovedFromArray, 1);
  this.currentCartItems(...currentCartItems);
  /*
  * reduce the total price of the products in the cart 
  * by currentProductPrice (the price of the product being deleted)
  * also reduce the total number of items when user deletes any cart item in checkout
  */
 subTotalAfterItemDeletion=parseFloat($(".sub-total").text()) - currentProductPrice.toFixed(2);
   $(".sub-total").text(subTotalAfterItemDeletion);
   this.updateSubTotal(subTotalAfterItemDeletion);
   //set isCartEmpty to false to prevent user from proceeding to checkout if there are no items
   if(currentCartItems.length === 0) this.updateCartStatus(true);
  }

 render(){
  return(
    <div className="App">
      <Header toggleViewObj={this.state.toggleViewObj} updateToggleViewObj={this.updateToggleViewObj}
      isCartEmpty={this.state.isCartEmpty} currentCartItems={this.state.cartItems}
      currentProduct={this.getCurrentProductUsingPId} 
      subTotal={this.computeSubTotalOnCartItemPriceChange}
      updateSubTotal={this.updateSubTotal} deleteCartItem={this.deleteCartItem}/>
      {this.state.toggleViewObj.isSliderView? <Slider />: ''}
      {this.state.toggleViewObj.isAboutView?<About />: ''}
      {this.state.toggleViewObj.isNewArrivalsView && this.state.toggleViewObj.isSliderView? 
      <NewArrivals products={this.state.products} 
      updateToggleViewObj={this.updateToggleViewObj} 
      addToCart={this.addToCart} updateCurrentProductWithPId={this.updateCurrentProductWithPId}/>: ''}
      {this.state.toggleViewObj.isProductDetailsView? 
      <ProductDetails product={this.state.currentProductWithDetails}
      addToCart={this.addToCart}/>:''}
      {this.state.toggleViewObj.isCheckoutView?<Checkout cartItems={this.state.cartItems}
      subTotal={this.state.subTotal} deleteCartItem={this.deleteCartItem}/>:''}
      <Footer />
    </div>
  )};
}

export default App;
