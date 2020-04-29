import React, { Component } from 'react';
import '../css/checkout.css';
import $ from 'jquery';
window.$=$;

var total=0.0, serviceCharge = 2.95;
class CartCheckout extends Component{ 
	
	getValueOfItemFromCartItemsUsingDomProps = (propertyString) =>{
		/*
		* check if the className string contains the char 'qty' this means we intend to get 
		* the quanty from the quantity input field and we must call .val() on the object 
		* in order to get the value or else just get the text
		*/
	return propertyString.indexOf("qty") > -1 ? $(`${propertyString}`).val(): $(`${propertyString}`).text();
	}

    deleteCartItemInCheckout = (rowClass, currentProductId) => event => {
	  let currentCartItems = this.props.cartItems;
	  let indexOfItemToBeRemovedFromArray = currentCartItems.findIndex(p => p === this.props.currentProduct(currentProductId)[0]);
      let currentProductPrice = parseFloat($('table tr.' + rowClass + ' td.product-price-checkout').text()); 

	  currentCartItems.splice(indexOfItemToBeRemovedFromArray, 1);
	  this.props.updateCartItems(...currentCartItems);
	  /*
	  * reduce the total price of the products in the cart 
	  * by currentProductPrice (the price of the product being deleted)
	  * also reduce the total number of items when user deletes any cart item in checkout
	  */
	 total=(parseFloat($(".sub-total").text()) - currentProductPrice).toFixed(2);
	 $(".sub-total").text(total);
	 this.props.updateSubTotal(total);
    }

    render(){
        let cartItems = this.props.cartItems;
        return (
       <section className="banner-bottom-wthreelayouts py-lg-5 py-3">
		<div className="container">
			<div className="inner-sec-shop px-lg-4 px-3">
				<h3 className="tittle-w3layouts my-lg-4 mt-3">Checkout</h3>
				<div className="checkout-right">
					<h4>Your shopping cart contains:
						<span>{this.props.cartItems.length} Products</span>
					</h4>
					<table className="timetable_sub" id="timetable_sub">
						<thead>
							<tr>
								<th>SL No.</th>
								<th>Product</th>
								<th>Quantity</th>
								<th>Product Name</th>
								<th>Price ($)</th>
								<th>Remove</th>
							</tr>
						</thead>
						<tbody>
                            {cartItems.map((p,i) => {
                                return (
                                <tr className={"cart-row" + p.productId} key={i}>
								<td className="invert">{i+1}</td>
								<td className="invert-image">
									<a href="single.html">
										<img src={`${process.env.REACT_APP_API_IMG_PATH}/`+ p.productImage} alt="" className="img-responsive"/>
									</a>
								</td>
								<td className="invert">
									<div className="quantity">
										<div className="quantity-select">
											<div className="entry value">
								<span>{this.getValueOfItemFromCartItemsUsingDomProps("table tr.cart-row"+p.productId+ " td.product-qty input.qty")}</span>
											</div>
										</div>
									</div>
								</td>
								<td className="invert">{p.productName} </td>
								<td className="product-price-checkout"> 
									{this.getValueOfItemFromCartItemsUsingDomProps("table tr.cart-row"+p.productId+ " td.product-price")}
									</td>
								<td className="invert">
									<div className="rem" 
									onClick={this.deleteCartItemInCheckout("cart-row"+ p.productId, p.productId)}>
										<div className="close1"></div>
									</div>
								</td>
							</tr>
                                )
                            })}
						</tbody>
					</table>
				</div>
				<div className="checkout-left row">
					<div className="col-md-4 checkout-left-basket">
						<h4>Continue to basket</h4>
						<ul>
							<li>Total Service Charges
								<i> -</i>
								<span>$ {serviceCharge}</span>
							</li>
							<li>Total
								<i> -</i>
								<span>$ {this.props.subTotal}</span>
							</li>
                            <li>Sub Total
								<i> -</i>
								<span>$ {this.props.subTotal - serviceCharge}</span>
							</li>
						</ul>
					</div>
					<div className="col-md-8 address_form">
						<h4>Add a new Details</h4>
						<form action="payment.html" method="post" className="creditly-card-form agileinfo_form">
							<section className="creditly-wrapper wrapper">
								<div className="information-wrapper">
									<div className="first-row form-group">
										<div className="controls">
											<label className="control-label">Full name: </label>
											<input className="billing-address-name form-control" type="text" name="name" placeholder="Full name"/>
										</div>
										<div className="card_number_grids">
											<div className="card_number_grid_left">
												<div className="controls">
													<label className="control-label">Mobile number:</label>
													<input className="form-control" type="text" placeholder="Mobile number"/>
												</div>
											</div>
											<div className="card_number_grid_right">
												<div className="controls">
													<label className="control-label">Landmark: </label>
													<input className="form-control" type="text" placeholder="Landmark"/>
												</div>
											</div>
											<div className="clear"> </div>
										</div>
										<div className="controls">
											<label className="control-label">Town/City: </label>
											<input className="form-control" type="text" placeholder="Town/City"/>
										</div>
										<div className="controls">
											<label className="control-label">Address type: </label>
											<select className="form-control option-w3ls">
												<option>Office</option>
												<option>Home</option>
												<option>Commercial</option>
											</select>
										</div>
									</div>
									<button className="submit check_out">Delivery to this Address</button>
								</div>
							</section>
						</form>
						<div className="checkout-right-basket">
							<a href="/#">Make a Payment </a>
						</div>
					</div>
					<div className="clearfix"> </div>
				</div>
			</div>
		</div>
	</section>
        )
    }
}

export default CartCheckout;