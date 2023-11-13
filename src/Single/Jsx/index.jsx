import {useQuery} from "@tanstack/react-query";
import axios from "axios"
import { Search } from "@mui/icons-material";
import { Button } from "@mui/material";
import { CarImage,CarDescription, CarPrice } from "./components";
import {useSearchParams, Link, useNavigate} from 'react-router-dom';

const location ={
    address:"5,Mufutau Shobola, Ogba Lagos,Nigeria",
    meters:'50'
}

const features = [
    {
        Icon:Search,
        description:'auto contact ',
        optFeature:null
    },
    {
        Icon:Search,
        description:'auto contact',
        optFeature:null
    },
    {
        Icon:Search,
        description:'auto contact ',
        optFeature:null
    },
    {
        Icon:Search,
        description:'auto contact ',
        optFeature:null
    },
]

const baseUrl = "http://localhost:3000/"

export default function SingleCar(){
    const searchParams = useSearchParams()[0];
    const id = searchParams.get('id');
    const navigate = useNavigate()
    const {data, isFetching} = useQuery({
        queryKey:["singleData"],
        queryFn: async function(){
            return await axios.get(`${baseUrl}data/api/car/${id}`);
        },
        refetchOnWindowFocus:false,
        retry:0,
    })
    
    return <div id="singleCarContainer">
            <CarImage image={data?.data.image} logo={data?.data.logo} title={data?.data.name} year={data?.data.year}/>
            <div id="baseContainer">
                <CarDescription  carFeatures={data?.data.features.length  ? data?.data.features : features} location={location} />
                <div id="cartAndPay">
                <CarPrice price={data?.data.price}/>
                {!isFetching ?  <Button variant="contained" onClick={()=>{navigate(`/payment/${data.data._id}`)}} >PAY NOW</Button>  : <Button variant="contained" >PAY NOW</Button> }
                </div>
            </div>
    </div>
}