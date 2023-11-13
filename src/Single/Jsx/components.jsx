import { Fragment, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Place,Streetview } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import IconPack from '../../util';
import '../Styles/index.css'
import { Button } from '@mui/material';

const baseUrl = "http://localhost:3000/"

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
             {/* <h2>SPECIFICATION</h2> */}
             <Features features={features}/>
            </div>
}

function Features({features}){
    return <div id="featuresDiv">
                <Swiper spaceBetween={10} slidesPerView={2.4} id='swipeRR'>
                    {features.map(function(feature){
                        return <SwiperSlide id='SwipeRslide'>
                            <Feature Icon={feature.icon} featureValue={feature.description} optFeature={(feature.optFeature?feature.optFeature:null)} />
                        </SwiperSlide>
                    })}
                </Swiper>
            </div>
}

function Feature({Icon,featureValue,optFeature}){
    return <div id='singleFeature'>
                <Iconverter iconString={"default"} />
                <span id='featureValueSpan'>
                    <p id='text'>{featureValue}{optFeature && <span>{optFeature}</span>}</p>
                </span>
            </div>
}

function Iconverter({iconString}){
    const Icon = IconPack[iconString] == null ? IconPack.default : IconPack[iconString];
    return <Icon id= "icon" /> 
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
        queryFn:()=> axios.post(`${baseUrl}data/api/cart`,{cartItem:id},{
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
                <div id='pricePDiv'><p>{price}</p><p>/PER DAY</p></div>
                <Button variant='contained' onClick={()=> HandleAddtoCartClick()}>Add To Cart</Button>
            </div>
}