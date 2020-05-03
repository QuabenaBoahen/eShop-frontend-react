import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPhone, faCartArrowDown, faUser, faTrash, faTimes, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {withCookies} from 'react-cookie';
import $ from 'jquery';
import { NavLink } from 'react-router-dom';
import {browserHistory} from 'react-router';
window.$ = $;

class Header extends Component{

	state = {
		user: {}
	}

	renderUserAccountForm = event => {
		$("#user-account-form").show();
	}

	closeUserAccountForm = event => {
		$("#user-account-form").hide();
		browserHistory.push("/");
	}

	inpuChange = event => {
	   let user = this.state.user;
	   user[event.target.name] = event.target.value;
	   this.setState({user: user});
	}

	signIn = event => {
		fetch(`${process.env.REACT_APP_AUTH_URI}`, {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(this.state.user)
		}).then(resp => resp.json())
		.then(response => {
		response.token === undefined ? this.props.cookies.set('eshop-tk', null):
			this.props.cookies.set('eshop-tk', response.token);
		  /* send cookie update to App component so it can be accessible 
		  * within other components without refreshing pages
		  */
		 this.props.updateToken(response.token);
		 $("#user-account-form").hide();
		})
		.catch(error => console.log("error message: ", error))
	}

	signOut = event => {
		this.props.cookies.remove('eshop-tk', { path: '/' });
		browserHistory.push("/");
	}

    renderAbout = event => {
		const toggleViewObj= {isSliderView: false, isAboutView: true, 
			isNewArrivalsView: false, isProductDetailsView: false, isCheckoutView: false};
		document.getElementById('title').innerText="eShop - About";
		this.props.updateToggleViewObj(toggleViewObj);
	}

	renderHome = event => {
		const toggleViewObj= {isSliderView: true, isAboutView: false, 
			isNewArrivalsView: true, isProductDetailsView: false, isCheckoutView: false};
		document.getElementById('title').innerText="eShop - Home";
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
		document.getElementById('title').innerText="eShop - Cart Checkout";
		this.props.updateToggleViewObj(toggleViewObj);
		}else{
			alert("Please add at least one item to cart before you checkout");
		}
	}

	onCartItemPriceChange = pid => event => {
		let currentProductQuantity = event.target.value, updatedProductPrice=0.0, subTotal=0.0;
		let intitialPriceOfCurrentProduct = this.props.currentProduct(pid)[0].productPrice;
		updatedProductPrice = (intitialPriceOfCurrentProduct * currentProductQuantity).toFixed(2);
		$("table tr.cart-row"+pid+ " td.product-price").text(updatedProductPrice);
		subTotal = this.props.subTotal("product-price");
		$(".sub-total").text(subTotal.toFixed(2));
		this.props.updateSubTotal(subTotal.toFixed(2));
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
			onClick={this.props.deleteCartItem("cart-row"+ p.productId, p.productId, "product-price")}/></td>
            </tr>
            )
        })
      }

    render(){
        return(
            <header>
			<div id="user-account-form" className="overlay-login text-left">
						<button type="button" className="overlay-close1" onClick={this.closeUserAccountForm}>
							<FontAwesomeIcon icon={faTimes}/>
						</button>
						<div className="wrap">
							<h5 className="text-center mb-4">Login Now</h5>
							<div className="login p-5 bg-dark mx-auto mw-100">
									<div className="form-group">
										<label className="mb-2">Email address</label>
										<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
										placeholder="Provide your email" name="username" required onChange={this.inpuChange}/>
									</div>
									<div className="form-group">
										<label className="mb-2">Password</label>
										<input type="password" className="form-control" id="exampleInputPassword1" 
										name="password" placeholder="Enter your password" required onChange={this.inpuChange}/>
									</div>
									<button className="btn btn-primary submit mb-4" onClick={this.signIn}>Sign In</button>
							</div>
						</div>
					</div>
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
						<button className={this.props.cookies.get('eshop-tk') === undefined? "top_googles_cart btn-open":"hide-field"}
						onClick={this.renderUserAccountForm}><FontAwesomeIcon icon={faUser}/>
						</button>
						</li>
						<li className="galssescart galssescart2 cart cart box_1">
								<button className="top_googles_cart" onClick={this.renderCart}>
									My Cart &nbsp;
									<FontAwesomeIcon icon={faCartArrowDown}/>
									<i className="fas fa-cart-arrow-down"></i>
								</button>
						</li>
			         <li className="button-log">
							<NavLink className="btn-open sign-out" to="/logout">
								<span className={this.props.cookies.get('eshop-tk') === undefined? "hide-field":"fa fa-user"}>
									<FontAwesomeIcon icon={faSignOutAlt} 
								onClick={this.signOut}/></span>
							</NavLink>
						</li>
					</ul>
					
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
						<li className="nav-item"
						onClick={this.renderHome}>
					<NavLink className="nav-link" to="/" activeStyle={{fontWeight: "bold", color: 'orange'}}>Home
							</NavLink>
						</li>
						<li className="nav-item" onClick={this.renderAbout}>
						<NavLink className="nav-link" to="/about" activeStyle={{fontWeight: "bold", color: 'orange'}}>About</NavLink>
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
							<NavLink className="nav-link" to="/contact">Contact</NavLink>
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
									 <td colSpan="2">
									 <NavLink to="/cart-checkout" onClick={this.renderCheckout}><button type="button" 
									 className="btn btn-primary">Check out</button>
									 </NavLink></td>
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

export default withCookies(Header);