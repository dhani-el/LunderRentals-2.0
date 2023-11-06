import {useQuery} from "@tanstack/react-query";
import axios from "axios"
import { Search } from "@mui/icons-material";
import { Button } from "@mui/material";
import { CarImage,CarDescription, CarPrice } from "./components";
import {useSearchParams, Link} from 'react-router-dom';

const location ={
    address:"5,Mufutau Shobola, Ogba Lagos,Nigeria",
    meters:'50'
}

const features = [
    {
        Icon:Search,
        featureValue:'auto contact ',
        optFeature:null
    },
    {
        Icon:Search,
        featureValue:'auto contact',
        optFeature:null
    },
    {
        Icon:Search,
        featureValue:'auto contact ',
        optFeature:null
    },
    {
        Icon:Search,
        featureValue:'auto contact ',
        optFeature:null
    },
]

const baseUrl = "http://localhost:3000/"

export default function SingleCar(){
    const searchParams = useSearchParams()[0];
    const id = searchParams.get('id');
    const {data} = useQuery({
        queryKey:["singleData"],
        queryFn: async function(){
            return axios.get(`${baseUrl}data/api/car/${id}`);
        },
        refetchOnWindowFocus:false,
        retry:0,
    })
    
    return <div id="singleCarContainer">
            <CarImage image={data?.data.image} logo={data?.data.logo} title={data?.data.name} year={data?.data.year}/>
            <CarDescription  carFeatures={features} location={location} list={data?.data.featureDescription} />
            <CarPrice price="N120k"/>

            <Link to={"/payment/"}>
                <Button>PAY NOW</Button>
            </Link>
    </div>
}