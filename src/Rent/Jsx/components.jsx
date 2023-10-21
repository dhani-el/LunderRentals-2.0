import {useState} from 'react';
import { TextField, Card } from "@mui/material";
import { Search, Close } from "@mui/icons-material";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';
import 'swiper/css';
import '../Styles/index.css';



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
const isLandscape = useMediaQuery({query:'(orientation:landscape)'});
    const {data} = useQuery({
        queryKey:["brandsQuery"],
        queryFn: ()=> Axios.get("/data/api/brands").then(function(response){return response})
    })

    return <div id='brandsContainer'>
        <div id='brandsSwiperContainer'>
            <Swiper spaceBetween={10} slidesPerView={isLandscape? 8 : 4} id='slideR' >
                <SwiperSlide><AllBrands  handleClick = {handleBrandChange} /></SwiperSlide>
               {data?.data.map((brandImage) => <SwiperSlide key={brandImage?.name} ><Abrand image = {brandImage.logo} handleClick = {handleBrandChange} brandName = {brandImage.name} /></SwiperSlide>)}
            </Swiper>
        </div>
    </div>
}

function Abrand({image,handleClick,brandName}){
    return <div id = 'abrandDiv' onClick={function(){handleClick(brandName);
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
    const {data} = useQuery({
        queryKey:["carData"],
        queryFn : ()=>  Axios.get(`data/api/cars/${brand}`, { withCredentials:true})
                        .then(function(result){ return result})
    });
    const [isCarsAvailable , setIsCarsAvailable] = useState(data?.data.length);


    return <div id='carsContainer'>
                <h3  style={{color:"black"}} >AVAILABLE CARS</h3>
                {isCarsAvailable ? <div id='listOfCars'>{data?.data.map((single)=><div key={single?._id} id='keyDivs' ><Car car = {single} /></div>)}</div>
                                 : <NoCars brand = {brand} />}
    </div>
}

function Car({car}){
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
                    <Link to={`/rent/${car.brand}?model=${car.name}`}><span id='detailsSpan'>
                       DETAILS
                    </span></Link>
                    </div>
                </Card>
    </div>
}


function NoCars({brand}){
    return <div id='noCarsDiv'>
                <h2>`No ${brand} cars available currently` </h2>
            </div>
}