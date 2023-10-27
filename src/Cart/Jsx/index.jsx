import { useState} from "react";
import {motion} from "framer-motion"
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
                <ListOfCartItems cartItems={[{name:"Porsche 911", color:"pink",price:"21,000"},{name:"Audi R8", color:"navy",price:"18,500"},{name:"Porsche 911", color:"Black",price:"21,000"},{name:"Audi R8", color:"orange",price:"18,500"}]} />
                <OrderSummary summaryDetails={{count:"2", tax:"5", shipping:"free",total:"40,500"}} clickHandler={handleOpenCheckout} />
            </motion.div>
            <PaymentBar slide= {toCheckout} handleClose = {handleCloseCheckout} />
        </div>
    </div>
}



export default Cart