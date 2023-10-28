import { Swiper, SwiperSlide } from 'swiper/react';
import { Place,Streetview } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import '../Styles/index.css'


export function CarImage({image,logo,title,year}){
    return <div id="carImageDiv">
                <img src={image} />
                <CarImageText logo={logo} title={title} year={year} />
            </div>
}

function CarImageText({logo,title,year}){
    return <span id='carImageTextSpan'>
                <img src = {logo} id="carLogo"/>
                <span id="cartitleNyearSpan">
                    <h2 id="carTitle">{title}</h2>
                    <p id="carYear">{year}</p>
                </span>
            </span>
}

export function CarDescription({carFeatures,location}){
    return <div id="descriptiveDiv">
                <CarSpecification features={carFeatures} />
                <CarLocation meters={location.meters} address={location.address}  />
            </div>
}

 function CarSpecification({features}){
    return <div id='carSpecificationDiv'>
             <h2>SPECIFICATION</h2>
             <Features features={features}/>
            </div>
}

function Features({features}){
    return <div id="featuresDiv">
                <Swiper spaceBetween={10} slidesPerView={2.4} id='swipeRR'>
                    {features.map(function(feature){
                        return <SwiperSlide id='SwipeRslide'>
                            <Feature Icon={feature.Icon} featureValue={feature.featureValue} optFeature={(feature.optFeature?feature.optFeature:null)} />
                        </SwiperSlide>
                    })}
                </Swiper>
            </div>
}

function Feature({Icon,featureValue,optFeature}){
    return <div id='singleFeature'>
                <Icon id ="icon" />
                <span id='featureValueSpan'>
                    <p id='text'>{featureValue}{optFeature && <span>{optFeature}</span>}</p>
                    
                </span>
            </div>
}

function CarLocation({meters,address}){
    return <div id='carLocationDiv' >
                <div id="locatinHeaderDiv">
                    <p id='locationText'>Location</p> 
                    <span id='leftOfLocation'> <Streetview/> <p id='meters'>{meters}m</p></span>
                </div>
                <div id="actualLocationComponent"> 
                    <Place id ="placeIcon" />
                    <p>{address}</p>
                </div>
    </div>
}

export function CarPrice({price}){
    return  <div id='priceComponent'>
                <div id='pricePDiv'><p>{price}</p><p>/day</p></div>
                <span><Link to="/payment">Add to Cart</Link></span>
            </div>
}