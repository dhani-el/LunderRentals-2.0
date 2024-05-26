import { useState} from "react";
import {motion} from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ListOfCartItems, OrderSummary, PaymentBar} from "./component";
import  "../Styles/index.css";


const animations = {
    cartAnimation:{
        initial:{
            width:"100%"
        },
        animation:{
            width:"70%",
            duration:"4s"
        }
    },
}

function Cart(){
    const [toCheckout, setToCheckout] = useState(false);
    const {data,isFetching} = useQuery({
        queryKey:["fetchCartItems"],
        queryFn: async ()=> await axios.get(`/data/api/cart`,{withCredentials:true})
        .then(function(response){ console.log(response); return response}),
        refetchOnWindowFocus:false,
        retry:0 
    });

    function handleOpenCheckout(){
        setToCheckout(true);
    }

    function handleCloseCheckout(){
        setToCheckout(false);
    }

    return <div id="cartBackground">
        <h2>Shopping Car<span>t</span></h2>
        <div id="mostContent">
            <motion.div id="cartContent" variants={animations.cartAnimation} initial="initial" animate= {toCheckout ? "animation" : "initial"} >
                {/* {isFetching && <p>cart items are being fetched</p>} */}
                <ListOfCartItems cartItems={(data?.data.cart == null)?[]:data?.data.cart} notReady={isFetching} />
                {!isFetching &&<OrderSummary summaryDetails={{count:!isFetching ? data?.data.cart.length:"", tax:"5", shipping:"free"}} cartItems={(data?.data.cart == null)?[]:data?.data.cart} clickHandler={handleOpenCheckout} />}
            </motion.div>
            <PaymentBar slide= {toCheckout} handleClose = {handleCloseCheckout} />
        </div>
    </div>
}

export default Cart