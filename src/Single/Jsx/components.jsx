import {  useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Place,Streetview } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import IconPack from '../../util';
import '../Styles/index.css'
import { Button } from '@mui/material';
import { useMediaQuery } from 'react-responsive';


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
             <Features features={features}/>
            </div>
}

function Features({features}){
    const isLandscape = useMediaQuery({query:"(orientation: landscape)"})
    return <div id="featuresDiv">
                <Swiper spaceBetween={15} centeredSlides = {true} slidesPerView={isLandscape ?3 : 2} id='swipeRR'>
                    {features.map(function(feature){
                        return <SwiperSlide id='SwipeRslide'>
                            <Feature featureData = {feature} />
                        </SwiperSlide>
                    })}
                </Swiper>
            </div>
}

function Feature({featureData}){
    return <div id='singleFeature'>
                <Iconverter iconString={featureData} />
                <span id='featureValueSpan'>
                    <p id='text'>{IconPack[featureData].description}</p>
                </span>
            </div>
}

function Iconverter({iconString}){
    const Icon = IconPack[iconString].icon == null ? IconPack.default : IconPack[iconString].icon;
    return <img src={Icon} id='icon' /> 
}

function CarLocation({meters,address}){
    return <div id='carLocationDiv' >
                <div id="locatinHeaderDiv">
                    <span id='leftOfLocation'> <Streetview/> <p id='meters'>{meters}m</p></span>
                </div>
                <div id="actualLocationComponent"> 
                    <Place id ="placeIcon" />
                    <p>{address}</p>
                </div>
    </div>
}

export function CarPrice({price,id}){
    const [isQueryEnabled, setIsQueryEnabled] = useState(false);
    const {data} = useQuery({
        queryKey:["addtocart"],
        queryFn:()=> axios.post(`/data/api/cart`,{cartItem:id},{
            headers:{
                'Content-Type':'multipart/form-data,'
            },
            withCredentials:true,
        }).then(function(response){
            setIsQueryEnabled(false);
            return response
        }),
        enabled:isQueryEnabled,
        refetchOnWindowFocus:false,
        retry:0,
    })

    function HandleAddtoCartClick(){
        setIsQueryEnabled(true)
    }
    return  <div id='priceComponent'>
                <div id='pricePDiv'>Price: <p>₦{price}/day</p></div>
                <Button variant='contained' onClick={()=> HandleAddtoCartClick()}>Add To Cart</Button>
            </div>
}