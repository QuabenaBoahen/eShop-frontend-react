import React, { Component } from 'react';
import '../css/checkout.css';
import {browserHistory} from 'react-router';
import $ from 'jquery';
window.$=$;

var serviceCharge = 2.95;
class CartCheckout extends Component{ 

	state = {
		order: {}
	}
	
	getValueOfItemFromCartItemsUsingDomProps = (propertyString) => {
		/*
		* check if the className string contains the char 'qty' this means we intend to get 
		* the quanty from the quantity input field and we must call .val() on the object 
		* in order to get the value or else just get the text
		*/
	return propertyString.indexOf("qty") > -1 ? $(`${propertyString}`).val(): $(`${propertyString}`).text();
	}

	computeSubTotal = () => {
		return (this.props.state.subTotal - serviceCharge).toFixed(2);
	}

	inputChange = event => {
	let order = this.state.order;
	order[event.target.name] =  event.target.value;
    this.setState({order: order});
	}

	orderItem = event => {
	let order = this.state.order;
	order['orderAmount'] = this.props.state.subTotal - serviceCharge;
	order['orderTax'] = serviceCharge;
	order['orderShippingAmount'] = 3.0;
	this.setState({order : order});
	//persist order details
	this.saveOrder();
	}

	saveOrder = () => {
        fetch(`${process.env.REACT_APP_API_URI}/orders/`, {
            method: 'POST',
            headers: {
			  'Content-Type': 'application/json',
			  'Authorization': `Token ${this.props.state.token}`
               },
               body: JSON.stringify(this.state.order)
          }).then(resp => resp.json())
          .then(response => {
			  if(response.status === 201){
				browserHistory.push("/");
			  }else{
				  if(response.detail==="Invalid token."){
					  alert("You need to login to place this order");
				  }else{
				console.log("response ", response);
				  }
			  }
			})
          .catch(error => console.log('error msg: ', error))
    }

    render(){
        return (
       <section className="banner-bottom-wthreelayouts py-lg-5 py-3">
		<div className="container">
			<div className="inner-sec-shop px-lg-4 px-3">
				<h3 className="tittle-w3layouts my-lg-4 mt-3">Checkout</h3>
				<div className="checkout-right">
					<h4>Your shopping cart contains:
						<span>{this.props.state.cartItems.length} Products</span>
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
                            {this.props.state.cartItems.map((p,i) => {
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
				onClick={this.props.deleteCartItem("cart-row"+ p.productId, p.productId, "product-price-checkout")}>
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
								<span>$ {this.props.state.subTotal}</span>
							</li>
                            <li>Sub Total
								<i> -</i>
								<span>$ {this.computeSubTotal()}</span>
							</li>
						</ul>
					</div>
					<div className="col-md-8 address_form">
						<h4>Your Details</h4>
						<form action="payment.html" method="post" className="creditly-card-form agileinfo_form">
							<section className="creditly-wrapper wrapper">
								<div className="information-wrapper">
									<div className="first-row form-group">
										<div className="controls">
											<label className="control-label">Full name: </label>
											<input className="billing-address-name form-control" type="text" name="orderShipName" 
											placeholder="Full name" onChange={this.inputChange}/>
										</div>
										<div className="card_number_grids">
											<div className="card_number_grid_left">
												<div className="controls">
													<label className="control-label">Mobile number:</label>
													<input className="form-control" type="text" placeholder="Mobile number" 
													name="orderPhone" onChange={this.inputChange}/>
												</div>
											</div>
											<div className="card_number_grid_right">
												<div className="controls">
													<label className="control-label">Shipping Address: </label>
													<input className="form-control" type="text" placeholder="Shipping Address"
													name="orderShipAddress1" onChange={this.inputChange}/>
												</div>
											</div>
											<div className="clear"> </div>
										</div>
										<div className="controls">
											<label className="control-label">Town/City: </label>
											<input className="form-control" type="text" placeholder="Town/City" 
											name="orderCity" onChange={this.inputChange}/>
										</div>
										<div className="controls">
											<label className="control-label">State: </label>
											<input className="form-control" type="text" placeholder="State" 
											name="orderState" onChange={this.inputChange}/>
										</div>
										<div className="controls">
											<label className="control-label">Zip: </label>
											<input className="form-control" type="text" placeholder="Zip" 
											name="orderZip" onChange={this.inputChange}/>
										</div>
										<div className="controls">
											<label className="control-label">Country: </label>
											<select className="form-control option-w3ls" name="orderCountry" onChange={this.inputChange}>
											    <option value="Select Country" defaultValue>Select Country</option>
												<option value="Ghana">Ghana</option>
												<option value="Nigeria">Nigeria</option>
												<option value="Kenya">Kenya</option>
											</select>
										</div>
									</div>
									<button className="submit check_out">Delivery to this Address</button>
								</div>
							</section>
						</form>
						<div className="checkout-right-basket">
			<button className="submit check_out" disabled={this.props.state.cartItems.length < 1 ? true: false}
			onClick={this.orderItem}>Make a Payment </button>
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