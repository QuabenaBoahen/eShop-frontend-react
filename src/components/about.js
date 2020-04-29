import React, {Component} from 'react';

class About extends Component {
    render(){
        return(
        <section className="banner-bottom-wthreelayouts py-lg-5 py-3">
		<div className="container-fluid">
			<div className="inner-sec-shop px-lg-4 px-3">
				<div className="about-content py-lg-5 py-3">
					<div className="row">
						<div className="col-lg-6 p-0">
					<img src={require('../images/s4.jpg')} alt="Goggles" className="img-fluid" />
						</div>
						<div className="col-lg-6 about-info">
							<h3 className="tittle-w3layouts text-left mb-lg-5 mb-3">About Us</h3>
							<p className="my-xl-4 my-lg-3 my-md-4 my-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
								dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
								book.
							</p>

							<a href="shop.html" className="btn btn-sm animated-button gibson-three mt-4">Shop Now</a>

						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
        )
    }
}

export default About;