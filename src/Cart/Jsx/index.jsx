import { useRef } from "react";
import {motion} from "framer-motion"
import { ListOfCartItems, OrderSummary, PaymentBar} from "./component";
import  "../Styles/index.css";




function Cart(){
    const cartContentRef = useRef(null);
    const paymentBarRef = useRef(null);

    function handleCheckout(){
        console.log("inside checkout handler");
        if(cartContentRef == null) return
        if(paymentBarRef == null) return

        console.log("after checkout handler checks");
        cartContentRef.current.classList.add("checkout");
        paymentBarRef.current.classList.add("open");
    }

    return <div id="cartBackground">
        <h2>Shopping Car<span>t</span></h2>
        <div id="mostContent">
            <motion.div id="cartContent" ref={cartContentRef} >
                <ListOfCartItems cartItems={[{name:"Porsche 911", color:"pink",price:"21,000"},{name:"Audi R8", color:"navy",price:"18,500"},{name:"Porsche 911", color:"Black",price:"21,000"},{name:"Audi R8", color:"orange",price:"18,500"}]} />
                <OrderSummary summaryDetails={{count:"2", tax:"5", shipping:"free",total:"40,500"}} clickHandler={handleCheckout} />
            </motion.div>
            <PaymentBar ref={paymentBarRef} />
        </div>
    </div>
}


export default Cart