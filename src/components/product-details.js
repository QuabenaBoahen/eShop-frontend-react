import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
window.$=$;

var subTotal=0.0, prevSubTotal=0.0;

class ProductDetails extends Component{

    state = {
       featuredProducts: [],
       product: this.props.product,
       highlighted: -1
    }

    componentDidMount(){
        //fetch featured products
        fetch(`${process.env.REACT_APP_API_URI}/products/specific-products/?status=Featured`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .then(response => {this.setState({featuredProducts: response})
        }).catch(error => console.log('error msg ', error))
     }

     highlightStar = starIndex => event => {
         this.setState({highlighted: starIndex});
     }

     addToCart = event => {
        let currentProduct = this.state.product;
        let updatedPriceOfCurrentProduct=0.0, 
        originalProductPrice=0.0, currentProductPrice=0.0, currentProductQuantity=0;  
        if(parseFloat($(".sub-total").text()) > 0.0){
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
        if(this.props.productsInCart.length < 1){
            this.props.productsInCart.push(currentProduct);
        }else {
          if(this.props.productsInCart.some(p => p.productId === currentProduct.productId)){ 
          originalProductPrice = currentProduct.productPrice;
          currentProductPrice = parseFloat($("table tr.cart-row"+currentProduct.productId+ " td.product-price").text()); 
          currentProductQuantity = parseInt($("table tr.cart-row"+currentProduct.productId+ " td.product-qty input.qty").val());
          currentProductQuantity+=1;
          updatedPriceOfCurrentProduct = currentProductPrice + originalProductPrice;
          $("table tr.cart-row"+currentProduct.productId+ " td.product-price").text(updatedPriceOfCurrentProduct);
          $("table tr.cart-row"+currentProduct.productId+ " td.product-qty input.qty").val(currentProductQuantity);
            } else{
           //if product not found, add to our products array
           this.props.productsInCart.push(currentProduct);
          }
        }
    
      $(".sub-total").text(subTotal);
      this.props.updateSubTotal(subTotal);
      this.props.currentCartItems(...this.props.productsInCart);
	}
   
    render(){     
        return(
            <section className="banner-bottom-wthreelayouts py-lg-5 py-3">
			<div className="container">
				<div className="inner-sec-shop pt-lg-4 pt-3">
					<div className="row">
							<div className="col-lg-4 single-right-left ">
									<div className="grid images_3_of_2">
											 <img src={`${process.env.REACT_APP_API_IMG_PATH}/`+ this.state.product.productImage} data-imagezoom="true" className="img-fluid" alt=" "/> 
                                    </div>
									<div className="clearfix"></div>
								</div>
								<div className="col-lg-8 single-right-left simpleCart_shelfItem">
									<h3>{this.state.product.productName}</h3>
									<p><span className="item_price">$ {this.state.product.productPrice}</span>
										<del>$1,199</del>
									</p>
									<div className="rating1">
										<ul className="stars">
                                            {[...Array(5)].map((e, i) => {
                                                return ( 
                                                <span key={i}>
                                                <li><a href="/#">
                    <FontAwesomeIcon icon={faStar} className={this.state.highlighted > i - 1 ? 'orange': ''} 
                    onMouseEnter={this.highlightStar(i)} onMouseLeave={this.highlightStar(-1)}/>
                                                    </a></li>
                                                </span>
                                                )
                                            })}
										</ul>
									</div>
									<div className="description">
										<h5>Check delivery, payment options and charges at your location</h5>
										<form action="#" method="post">
												<input className="form-control" type="text" name="Email" placeholder="Please enter..." required="" />
											<input type="submit" value="Check"/>
										</form>
									</div>
									<div className="color-quality">
										<div className="color-quality-right">
											<h5>Quantity :</h5>
											<select id="country1" className="frm-field required sect">
													<option value="null">5 Qty</option>
													<option value="null">6 Qty</option> 
													<option value="null">7 Qty</option>					
													<option value="null">10 Qty</option>								
												</select>
										</div>
									</div>
									<div className="occasion-cart">
											<div className="googles single-item singlepage">
														<button className="googles-cart pgoogles-cart" onClick={this.addToCart}>
															Add to Cart
														</button>	
												</div>
									</div>			
								</div>
								<div className="clearfix"> </div>
                                <div className="resp-tabs-container">
					
												<div className="single_page"><br/><br/>
													<h6>Description</h6>
                                        <p>{this.state.product.productDescription}</p>
												</div>
											</div>					
					</div>
				</div>
			</div>
				<div className="container-fluid">
					<div className="slider-img mid-sec mt-lg-5 mt-2 px-lg-5 px-3">
                    <h3 className="tittle-w3layouts my-lg-4 my-4">Featured Products</h3>
                    <div className="row" >
                    {this.state.featuredProducts.map(p => {
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
                                    <span className="product-new-top">Featured</span>
                                </div>
                                <div className="item-info-product">
                                    <div className="info-product-price">
                                        <div className="grid_meta">
                                            <div className="product_price">
                                                <h4>
                                                <a href="/#">{p.productName}</a>
                                                </h4>
                                                <div className="grid-price mt-2">
                                                    <span className="money ">${p.productPrice}</span>
                                                </div>
                                            </div>
                                            <ul className="stars">
                                            {[...Array(5)].map((e, i) => {
                                                return ( 
                                                    <li key={i}>
                                                    <a href="/">
                                                    <FontAwesomeIcon icon={faStar}/>
                                                    </a>
                                                </li> 
                                                )})}                                               
                                            </ul>
                                        </div>
                                       
                                        <div className="googles single-item hvr-outline-out">
                                            <form action="#" method="post">
                                                <input type="hidden" name="cmd" value="_cart"/>
                                                <input type="hidden" name="add" value="1"/>
                                                <input type="hidden" name="googles_item" value="Farenheit"/>
                                                <input type="hidden" name="amount" value="575.00"/>
                                                <button type="submit" className="googles-cart pgoogles-cart">
                                                    <i className="fas fa-cart-plus"></i>
                                                </button>                                                    
                                            </form>
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

export default ProductDetails;