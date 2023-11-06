
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {useParams } from "react-router";
import {CarImage ,Payment } from "./components";

import "../Styles/index.css"

const baseUrl = "http://localhost:3000/"

export default function SinglePayment(){
    const params = useParams()
    const {data, isFetching} = useQuery({
        queryKey:["paymentData"],
        queryFn : async ()=> await axios.get(`${baseUrl}data/api/car/${params.id}`,{withCredentials:true}),
        refetchOnWindowFocus:false,
    });
    console.log(data);
    return <div id="singlePaymentContainer">
        <div id="centerer">
           {!isFetching && <CarImage image={data.data?.image} brand={data.data?.brand} model={data.data?.name} />}
            <Payment/>
        </div>
    </div>
}
