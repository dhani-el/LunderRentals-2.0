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

export default function SingleCar(){
    const searchParams = useSearchParams()[0];
    const model = searchParams.get('model');
    const {data} = useQuery({
        queryKey:["singleData"],
        queryFn: async function(){
            return axios.get(`/data/api/car/${model}`);
        },
        refetchOnWindowFocus:false,
        retry:0,
    })
    
    return <div id="singleCarContainer">
            <CarImage image={data?.data.image} logo={data?.data.logo} title={data?.data.name} year={data?.data.year}/>
            <CarDescription  carFeatures={data?.data.features} location={{address:data?.data.address, meters:data?.data.meters}} list={data?.data.featureDescription} />
            <CarPrice price={data?.data.price}/>

            <Link to={"/payment"}>
                <Button>PAY NOW</Button>
            </Link>
    </div>
}