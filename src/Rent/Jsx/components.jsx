import { useState} from 'react';
import { TextField, Card } from "@mui/material";
import { Search, Close } from "@mui/icons-material";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useQuery,useQueryClient } from '@tanstack/react-query';
import Axios from 'axios';
import 'swiper/css';
import '../Styles/index.css';

const baseUrl = "http://localhost:3000/"

export function SearchComponent(){
    const [openSearchBar, setOpenSearchBar] = useState(false);

    function handleToggleSearchBar(){
        console.log("toggle clicked", openSearchBar);
        
        setOpenSearchBar((initial)=> !initial)
    }
    return   <div id="searchComponentContainer" >
                <Card id = "searchComponentCard"  >
                   {!openSearchBar && <div id="searchComponentTextContainer" onClick={()=>{setOpenSearchBar(true)}} ><span id="searchComponentTextH2" >Choose</span><p id="searchComponentTextP"> a Car</p></div>}
                    {!openSearchBar && <Search onClick = {handleToggleSearchBar} /> }
                    {openSearchBar && <SearchBar handleClickFunction = {handleToggleSearchBar}/>}
                </Card>
            </div>
}

function SearchBar({handleClickFunction}){
    return <div id="searchBar">
                <TextField placeholder='Car brand' /> 
                <Close onClick = {()=>handleClickFunction()} />
    </div>
}

export function Brands({handleBrandChange}){
    const queryClient = useQueryClient();
    const isLandscape = useMediaQuery({query:'(orientation:landscape)'});
    const {data} = useQuery({
        queryKey:["brandsQuery"],
        queryFn: ()=> Axios.get(`${baseUrl}data/api/brands`).then(function(response){return response}),
    });

    function handleStateChange(brandName){
        console.log("inside on click function");
        return new Promise(function(resolve,reject){
            console.log("inside handling promise");
            handleBrandChange(brandName)
         resolve('resolve result');
        })
    }

    function handleBrandClick(brandName){
        handleStateChange(brandName).then(function(result){ console.log(result); queryClient.invalidateQueries({queryKey:["carData"],exact:true});})
        .then(function(){
            queryClient.fetchQuery({queryKey:["carData"],exact:true});
        })
    }

    return <div id='brandsContainer'>
        <div id='brandsSwiperContainer'>
            <Swiper spaceBetween={10} slidesPerView={isLandscape? 8 : 4} id='slideR' >
                <SwiperSlide><AllBrands  handleClick = { handleBrandClick} /></SwiperSlide>
               {data?.data.map((brandImage) => <SwiperSlide key={brandImage?.name} ><Abrand image = {brandImage.logo} handleClick = {handleBrandClick} brandName = {brandImage.name} /></SwiperSlide>)}
            </Swiper>
        </div>
    </div>
}

function Abrand({image,handleClick,brandName}){
    return <div id = 'abrandDiv' onClick={function(){ handleClick(brandName);
    }} >
        <img src={image} />
    </div>
}

function AllBrands({handleClick}){
    return <div id ="allBrandsComponent" onClick={function(){handleClick("")}}>
        <p>ALL</p>
    </div>
}

export function Cars({brand}){
    const [initialRender,setInitialRender] = useState(true);
  const {data, isFetching} = useQuery({
        queryKey:["carData"],
        queryFn : ()=>  Axios.get(`${baseUrl}data/api/cars/${brand}`)
                        .then(function(result){ setInitialRender(false); return result}),
        enabled: initialRender,
    });


   ( !isFetching && console.log("are cars available?",!!data?.data.length))
    console.log("is currently fetching ?",isFetching);

    return <div id='carsContainer'>
                <h3  style={{color:"black"}} >AVAILABLE CARS</h3>
                {isFetching && <div>loading..</div>}
                {!isFetching && (!!data?.data.length ? <div id='listOfCars'>{data?.data.map((single)=><div key={single?._id} id='keyDivs' ><Car car = {single} /></div>)}</div>
                                 : <NoCars brand = {brand} />)}
    </div>
}

function Car({car}){

    function useAddToCartClick(carId){
        const {isFetching} = useQuery({
            queryKey:["addToCart"],
            queryFn:function(){
                Axios.post("/cart", carId,{
                    withCredentials:true
                });
            }
        });
    }

    return <div id='Acar'>
                <Card className='aCarCard' >
                    <div id='firstDiv'>
                        <img src={car.image} /> 
                    <div id='textDiv'>
                            <h3>{car.name}</h3>
                            <p>{car.year}</p>
                        </div>
                    </div>
                    <div id='secondDiv' >
                    <span id='priceSpan'>
                        <p id='price' >{car.price}</p><p >/day</p>
                    </span>
                    <Link to={`/cart`}>
                        <span id='detailsSpan'>
                            ADD TO CART
                        </span>
                    </Link>
                    </div>
                </Card>
    </div>
}

function NoCars({brand}){
    return <div id='noCarsDiv'>
                <h2>{`No ${brand} cars available currently`} </h2>
            </div>
}

function CartIndicator({isAdded}){
    return <div>
        {isAdded ? <><span id='spinner'></span> <p>Adding to Cart</p></> : <><span id='plus'></span> <p>Added to Cart</p></>}
    </div>
}