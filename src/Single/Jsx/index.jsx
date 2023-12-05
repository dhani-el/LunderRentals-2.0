import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@mui/material";
import { CarImage,CarDescription, CarPrice } from "./components";
import {useSearchParams,  useNavigate} from 'react-router-dom';
import { useEffect,useState } from "react";


export default function SingleCar(){
    const searchParams = useSearchParams()[0];
    const id = searchParams.get('id');
    const navigate = useNavigate()
    const {data, isFetching} = useQuery({
        queryKey:["singleData"],
        queryFn: async function(){
            return await axios.get(`/data/api/car/${id}`);
        },
        refetchOnWindowFocus:false,
        retry:0,
    })
    

    return <div id="singleCarContainer">
            <CarImage image={data?.data.image} logo={data?.data.logo} title={data?.data.name} year={data?.data.year}/>
            <div id="baseContainer">
                {!isFetching && <CarDescription  carFeatures={data?.data.features  ? data?.data.features[0] : []} location={data?.data.address ? {address:data.data.address,meters:data.data.meters} : {address:'',meters:''}} />}
                <div id="cartAndPay">
                <CarPrice price={data?.data.price}/>
                {!isFetching ?  <Button variant="contained" onClick={()=>{navigate(`/payment/${data.data._id}`)}} >PAY NOW</Button>  : <Button variant="contained" >PAY NOW</Button> }
                </div>
            </div>
    </div>
}