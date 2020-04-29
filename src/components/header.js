import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPhone, faCartArrowDown, faUser, faTrash} from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
window.$ = $;

var subTotal=0.0;

class Header extends Component{

    renderAbout = event => {
		const toggleViewObj= {isSliderView: false, isAboutView: true, 
			isNewArrivalsView: false, isProductDetailsView: false, isCheckoutView: false};
		document.getElementById('title').innerText="eShop - About";
		this.props.updateToggleViewObj(toggleViewObj);
	}

	renderCart = event => {
		$("#myModal").modal();	
	}

	renderCheckout = event => {
		$('#myModal').modal('hide');
		if(!this.props.isCartEmpty){
		const toggleViewObj= {isSliderView: false, isAboutView: false, 
			isNewArrivalsView: false, isProductDetailsView: false, isCheckoutView: true};
		document.getElementById('title').innerText="eShop - Checkout";
		this.props.updateToggleViewObj(toggleViewObj);
		}else{
			alert("Please add at least one item to cart before you checkout");
		}
	}

	onCartItemPriceChange = pid => event => {
		let currentProductQuantity = event.target.value, updatedProductPrice=0.0;
		let intitialPriceOfCurrentProduct = this.props.currentProduct(pid)[0].productPrice;
		updatedProductPrice = intitialPriceOfCurrentProduct * currentProductQuantity;
		$("table tr.cart-row"+pid+ " td.product-price").text(updatedProductPrice);
		$(".sub-total").text(this.props.subTotal("product-price"));
		this.props.updateSubTotal(this.props.subTotal("product-price"));
	}

	deleteCartItem = (rowClass, currentProductId) => event => {
		let currentCartItems = this.props.currentCartItems;
		let indexOfItemToBeRemovedFromArray = currentCartItems.findIndex(p => p ===this.props.currentProduct(currentProductId)[0]);
		let currentProductPrice = parseFloat($('table tr.' + rowClass + ' td.product-price').text()); 
				
		currentCartItems.splice(indexOfItemToBeRemovedFromArray, 1);
		this.props.updateCartItems(...currentCartItems);
		/*
		* reduce the total price of the products in the cart 
		* by currentProductPrice (the price of the product being deleted)
		* also reduce the total number of items when user deletes any cart item in checkout
		*/
	   subTotal=(parseFloat($(".sub-total").text()) - currentProductPrice).toFixed(2);
	   $(".sub-total").text(subTotal);
	   this.props.updateSubTotal(subTotal);
	   //set isCartEmpty to false to prevent user from proceeding to checkout if there are no items
	   if(currentCartItems.length === 0) this.props.updateCartStatus(true);
	  }

	populateTableInCart = () => {
		return this.props.currentCartItems.map((p,i) => {
            return (
            <tr className={"cart-row" + p.productId} key={i}>
            <td className="product-name">{p.productName}</td>
			<td className="product-qty"><input className="qty" type="number" name="quantity" 
			min="1" max="50" defaultValue="1" onChange={this.onCartItemPriceChange(p.productId)}/></td>
            <td className="product-price">{p.productPrice}</td>
			<td className="del-btn"><FontAwesomeIcon icon={faTrash} 
			onClick={this.deleteCartItem("cart-row"+ p.productId, p.productId)}/></td>
            </tr>
            )
        })
      }

    render(){
        return(
            <header>
            <div className="row">
            <div className="col-md-3 top-info text-left mt-lg-4">
					<ul>
						<li>
                        <FontAwesomeIcon icon={faPhone}/>&nbsp;</li>
						<li className="number-phone mt-3">+233 (0)546735786</li>
					</ul>
			</div>
            <div className="col-md-6 logo-w3layouts text-center">
            <h1 className="logo-w3layouts">
                <a className="navbar-brand" href="/">
                    eShop </a>
            </h1>
           </div>
           <div className="col-md-3 top-info-cart text-right mt-lg-4">
					<ul className="cart-inner-info">
						<li className="button-log">
							<a className="btn-open" href="/#">
								<span className="fa fa-user"><FontAwesomeIcon icon={faUser}/></span>
							</a>
						</li>
						<li className="galssescart galssescart2 cart cart box_1">
								<button className="top_googles_cart" onClick={this.renderCart}>
									My Cart &nbsp;
									<FontAwesomeIcon icon={faCartArrowDown}/>
									<i className="fas fa-cart-arrow-down"></i>
								</button>
						</li>
					</ul>
					<div className="overlay-login text-left">
						<button type="button" className="overlay-close1">
							<i className="fa fa-times" aria-hidden="true"></i>
						</button>
						<div className="wrap">
							<h5 className="text-center mb-4">Login Now</h5>
							<div className="login p-5 bg-dark mx-auto mw-100">
								<form action="#" method="post">
									<div className="form-group">
										<label className="mb-2">Email address</label>
										<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" required="" />
										<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
									</div>
									<div className="form-group">
										<label className="mb-2">Password</label>
										<input type="password" className="form-control" id="exampleInputPassword1" placeholder="" required="" />
									</div>
									<div className="form-check mb-2">
										<input type="checkbox" className="form-check-input" id="exampleCheck1" />
										<label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
									</div>
									<button type="submit" className="btn btn-primary submit mb-4">Sign In</button>

								</form>
							</div>
						</div>
					</div>
				</div>
                <div className="search">
				<div className="mobile-nav-button">
					<button id="trigger-overlay" type="button">
						<i className="fas fa-search"></i>
					</button>
				</div>
				<div className="overlay overlay-door">
					<button type="button" className="overlay-close">
						<i className="fa fa-times" aria-hidden="true"></i>
					</button>
					<form action="#" method="post" className="d-flex">
						<input className="form-control" type="search" placeholder="Search here..." required="" />
						<button type="submit" className="btn btn-primary submit">
							<i className="fas fa-search"></i>
						</button>
					</form>

				</div>
			</div>
            <label className="top-log mx-auto"></label>
			<div className="navbar navbar-inverse nav-container nav">
			<nav className="navbar navbar-expand-lg navbar-light bg-light top-header mb-2">
				<button className="navbar-toggler mx-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
				    aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon">
						
					</span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav nav-mega mx-auto">
						<li className={this.props.toggleViewObj.isSliderView? 'nav-item active': 'nav-item'}>
							<a className="nav-link ml-lg-0" href="/">Home
								<span className="sr-only">(current)</span>
							</a>
						</li>
						<li className={this.props.toggleViewObj.isAboutView? 'nav-item active': 'nav-item'} onClick={this.renderAbout}>
						<a className="nav-link" href="/#">About</a>
						</li>
						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="/" id="navbarDropdown1" role="button" data-toggle="dropdown" aria-haspopup="true"
							    aria-expanded="false">
								Product Catalog
							</a>
					     <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
							<a className="dropdown-item" href="/#">T-Shirts</a>
							<a className="dropdown-item" href="/#">Suits</a>
							<a className="dropdown-item" href="/#">Sneakers</a>
						</div>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="contact.html">Contact</a>
						</li>
					</ul>
				</div>
			</nav>
			</div>
           </div>
		   
		<div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-hidden="true">
		<div className="modal-dialog modal-dialog-centered" role="document">
			<div className="modal-content">
				<div className="modal-header">
				<h5 className="modal-title">Cart Details</h5>
					<button type="button" className="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div className="modal-body">
                <table className="timetable_sub table-dark cart-view">
							 <thead>
								 <tr>
									 <th>Product Name</th>
									 <th>Quantity</th>
									 <th>Price ($)</th>
									 <th>Action</th>
								 </tr>
							 </thead>
							 <tbody>
							   {this.populateTableInCart()}
							 </tbody>
							 <tfoot>
							 <tr>
									 <td colSpan="2">Subtotal: $ <span className="sub-total"></span></td>
									 <td colSpan="2" onClick={this.renderCheckout}><button type="button" 
									 className="btn btn-primary">Check out</button></td>
							</tr>
							 </tfoot>
				</table>
				</div>
			</div>
		</div>
	</div>
           </header>
      )
    }
}

export default Header;