import { useEffect, useState} from 'react';
import { TextField, Card, Skeleton, Pagination,Button } from "@mui/material";
import { Search, Close } from "@mui/icons-material";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useQuery,useQueryClient } from '@tanstack/react-query';
import Alert from '@mui/material/Alert';
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
    const queryClient = useQueryClient();
    const isLandscape = useMediaQuery({query:'(orientation:landscape)'});
    const {data} = useQuery({
        queryKey:["brandsQuery"],
        queryFn: ()=> Axios.get(`/data/api/brands`).then(function(response){return response}),
        refetchOnWindowFocus:false,
        retry:0
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
    const queryClient = useQueryClient();
    const [pageNumber,setPageNumber] = useState(0);
    const [showAlert,setShowAlert] = useState(false);
    const [showSuccessAlert,setShowSuccessAlert] = useState(false);
    const {data, isFetching} = useQuery({
        queryKey:["carData"],
        queryFn : ()=>  Axios.get(`/data/api/cars/${brand}?page=${pageNumber}`)
                        .then(function(result){ setInitialRender(false); return result}),
        enabled: initialRender,
        refetchOnWindowFocus:false,
    });
    function handleAddtoCart(show,isSuccess){
        setShowAlert(init=>show);
        setShowSuccessAlert(init=>isSuccess);
        console.log("show",show,"isSuccess",isSuccess);
    }
    useEffect(function(){
        if (!initialRender) {
            queryClient.invalidateQueries({queryKey:["carData"]});
            setInitialRender(true);
        }
    },[pageNumber]);

    return <div id='carsContainer' style={{position:"relative"}}>
                <h3  style={{color:"black"}} >AVAILABLE CARS</h3>
                {isFetching && <Skeletors/>}
                {!isFetching && (!!data?.data.payload.length ?
                    <div id='listOfCars'>
                        {data?.data.payload.map((single)=><div key={single?._id} id='keyDivs' ><Car car = {single} handleAlert={handleAddtoCart} /></div>)}
                    </div>
                    : <NoCars brand = {brand} />)}
                    <div id='cartAlert' style={{position:"absolute" ,bottom:"55%",width:"100%",display:"flex",justifyContent:"center",zIndex:20}} >
                        {(showAlert && showSuccessAlert) && <Alert style={{width:"70%"}} severity='success' >Car Successfully added to cart</Alert>}
                        {(showAlert && !showSuccessAlert) && <Alert style={{width:"70%"}}  severity='error' >Car Was Not Added to cart</Alert>}
                    </div>
                <Paginator pageNumberSetter={setPageNumber} count={data?.data.count} />
            </div>
}
function Car({car,handleAlert}){
    const [isQueryEnabled, setIsQueryEnabled] = useState(false);
    const qclient  = useQueryClient()
    const navigate = useNavigate();
    const {isFetching} = useQuery({
        queryKey:["addToCartRent"],
        queryFn:()=> Axios.post(`/data/api/cart`, {cartItem:car._id},{withCredentials:true}).then(function(response){
                if (response.status != 200) {
                    handleAlert(true,false)
                    setTimeout(function(){
                        handleAlert(false,false)
                    },2000)
                }else{
                    handleAlert(true,true);
                    setTimeout(function(){
                        handleAlert(false,false)
                    },2000)
                }
                setIsQueryEnabled(false);
                return response
            })
        ,
        enabled: isQueryEnabled,
        refetchOnWindowFocus:false,
        retry:0
    });
    function useAddToCartClick(){
        handleAlert(false,false)
        setIsQueryEnabled(true);
    }

    return <div id='Acar' onClick={()=>{qclient.resetQueries({queryKey:["singleData"],exact:true}); navigate(`${car.brand}?id=${car._id}`)}} >
                <Card className='aCarCard' style={{display:"flex",flexDirection:"column", gap:"1rem"}}  >
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
                        <Button id='detailsSpan' onClickCapture={e =>{e.stopPropagation(); useAddToCartClick() }} >
                            ADD TO CART
                        </Button>
                    </div>
                </Card>
    </div>
}
function NoCars({brand}){
    return <div id='noCarsDiv'>
                <h2>{`No ${brand} cars available currently`} </h2>
            </div>
}
function Skeletor(){
    return <div id='Acar'  >
         <Card className='aCarCard'  >
            <div id='firstDiv'>
                <Skeleton variant='rounded' animation = "pulse" width="40%" />
                <div id='textDiv'>
                    <Skeleton variant='text' animation = "pulse" width="4em" />
                    <Skeleton variant='text' animation = "pulse" width="2.5em" />
                </div>

            </div>
            <div id='secondDiv' >
                <div id='pricediv'>
                    <Skeleton variant='text' animation = "pulse" width="3.5em"  id='price' />
                </div>
                <div id='detailsdiv'  >
                    <Skeleton variant='text' animation = "pulse" width="4em" />
                </div>
            </div>
         </Card>
    </div>
}
function Skeletors(){
    const numberOfCarsPerPage = 15;
    let ray = new Array(numberOfCarsPerPage);

    return <div id='listOfCars'>
        <Skeletor/>
        <Skeletor/>
        <Skeletor/>
        <Skeletor/>
        <Skeletor/>
        <Skeletor/>
        <Skeletor/>
        <Skeletor/>
        <Skeletor/>
        <Skeletor/>
    </div>
}
function CartIndicator({isAdded}){
    return <div>
        {isAdded ? <><span id='spinner'></span> <p>Adding to Cart</p></> : <><span id='plus'></span> <p>Added to Cart</p></>}
    </div>
}

function Paginator({count , pageNumberSetter}){

    function handlePaginationItemClicked(pageNumber){
        pageNumberSetter(function(initialValue){return (pageNumber - 1)});
    }

    return <div id = "pagDiv">
        <Pagination count={count} variant='outlined'  shape='rounded' size='medium' onChange={function(event,pagenumber){handlePaginationItemClicked(pagenumber); console.log("paginator ckicked",pagnumber - 1);}} />
    </div>
}