import React, { Component } from 'react';

class Slider extends Component{


    render(){
        return(
            <div className="banner">
			<div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
				<ol className="carousel-indicators">
					<li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
				</ol>
				<div className="carousel-inner" role="listbox">
					<div className="carousel-item active">
						<div className="carousel-caption text-center">
							<h3>Men’s eyewear
								<span>Cool summer sale 50% off</span>
							</h3>
							<a href="shop.html" className="btn btn-sm animated-button gibson-three mt-4">Shop Now</a>
						</div>
					</div>
					<div className="carousel-item item2">
						<div className="carousel-caption text-center">
							<h3>Women’s eyewear
								<span>Want to Look Your Best?</span>
							</h3>
							<a href="shop.html" className="btn btn-sm animated-button gibson-three mt-4">Shop Now</a>

						</div>
					</div>
					<div className="carousel-item item3">
						<div className="carousel-caption text-center">
							<h3>Men’s eyewear
								<span>Cool summer sale 50% off</span>
							</h3>
							<a href="shop.html" className="btn btn-sm animated-button gibson-three mt-4">Shop Now</a>

						</div>
					</div>
					<div className="carousel-item item4">
						<div className="carousel-caption text-center">
							<h3>Women’s eyewear
								<span>Want to Look Your Best?</span>
							</h3>
							<a href="shop.html" className="btn btn-sm animated-button gibson-three mt-4">Shop Now</a>
						</div>
					</div>
				</div>
				<a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="sr-only">Previous</span>
				</a>
				<a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="sr-only">Next</span>
				</a>
			</div>
		</div>
     )
    }
}

export default Slider;