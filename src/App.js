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
 //this.setState({subTotal: sum})
return sum;
 }

 updateSubTotal = updatedSubTotal => {
   this.setState({subTotal: updatedSubTotal});
 }

 updateCartStatus = status => {
    this.setState({isCartEmpty: status});
 }

 render(){
  return(
    <div className="App">
      <Header toggleViewObj={this.state.toggleViewObj} updateToggleViewObj={this.updateToggleViewObj}
      isCartEmpty={this.state.isCartEmpty} updateCartItems={this.currentCartItems} 
      currentCartItems={this.state.cartItems}
      currentProduct={this.getCurrentProductUsingPId} 
      subTotal={this.computeSubTotalOnCartItemPriceChange}
      updateSubTotal={this.updateSubTotal} updateCartStatus={this.updateCartStatus}/>
      {this.state.toggleViewObj.isSliderView? <Slider />: ''}
      {this.state.toggleViewObj.isAboutView?<About />: ''}
      {this.state.toggleViewObj.isNewArrivalsView && this.state.toggleViewObj.isSliderView? 
      <NewArrivals products={this.state.products} 
      updateCurrentProductWithPId={this.updateCurrentProductWithPId}
      updateToggleViewObj={this.updateToggleViewObj} 
      getCurrentProductUsingPId={this.getCurrentProductUsingPId}
      currentCartItems={this.currentCartItems} updateSubTotal={this.updateSubTotal}/>: ''}
      {this.state.toggleViewObj.isProductDetailsView? 
      <ProductDetails product={this.state.currentProductWithDetails}
      updateSubTotal={this.updateSubTotal} productsInCart={this.state.cartItems}
      currentCartItems={this.currentCartItems} subTotal={this.computeSubTotalOnCartItemPriceChange}/>:''}
      {this.state.toggleViewObj.isCheckoutView?<Checkout cartItems={this.state.cartItems}
      subTotal={this.state.subTotal} updateSubTotal={this.updateSubTotal} 
      currentProduct={this.getCurrentProductUsingPId} updateCartItems={this.currentCartItems}/>:''}
      <Footer />
    </div>
  )};
}

export default App;
