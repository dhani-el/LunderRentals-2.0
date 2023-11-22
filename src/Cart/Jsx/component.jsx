import { forwardRef, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { Close } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import MasterCard from "/masterCard.png";
import { useMediaQuery } from "react-responsive";


export function ListOfCartItems({cartItems}){
    return <div id="cartItemsCard" >
        <ListHeader/>
        {cartItems.map(function(item){
            return <SingleCartItem itemDetails={item}/>
        })}
    </div>
}

function ListHeader(){
    return <div id="listHeader">
        <p></p>
        <p>NAME</p>
        <p>COLOR</p>
        <p>PRICE</p>
        <p></p>
    </div>
}

function SingleCartItem({itemDetails}){
    const [removeItem, setRemoveItem] = useState(false);
    const {data,isFetching} = useQuery({
        queryKey:["removeCartItem"],
        queryFn: async ()=> await axios.delete(`/data/api/cart/${itemDetails._id}`, {withCredentials:true})
        .then(function(response){
            setRemoveItem(false);
            return response
        }),
        enabled:removeItem,
        retry:0,
        refetchOnWindowFocus:false,
    })

    function handleRemoveCartItem(){
        console.log("an item is about to be removed");
        setRemoveItem(true);
    }

    return <div id="singleCartItemCard">
            <div id="cartItemImage">
                <img src= {itemDetails.image} />
            </div>
            <div id="itemDetails">
                <p>{itemDetails.name}</p>
                <Colour color={itemDetails.color} />
                <p>{itemDetails.price}</p>
            </div>
            <Close id = "closeIcon" onClick={function(){handleRemoveCartItem()}}/>
    </div>
}

function Colour({color}){
    return <div id="color"  >
        <div style={{background:color}}>

        </div>
    </div>
}

export function OrderSummary({summaryDetails,clickHandler,cartItems}){
    const [cartCost,setCartCost] = useState(0);

    function cartcost(cartItems){
        let cost
        cartItems.forEach(function(cartItem){
            cost += cartItem.price
        });
        setCartCost(init => cost);
    }
    useEffect(function(){
        cartcost(cartItems);
    },[])
    return <div id="summaryContainer" >
        <h3>Order Summary</h3>
        <div>Cars : {summaryDetails.count}</div>
        <div>Tax : {summaryDetails.tax}%</div>
        <div>Shipping : {summaryDetails.shipping}</div>
        <div>Total : {cartCost} N</div>
        <Button variant="contained" onClick={clickHandler} >Checkout</Button>
    </div>
}

export const PaymentBar = forwardRef(function(props,ref){
    const isLandScape  = useMediaQuery({query: '(orientation:landscape)'});
    const [cardname, setCardname ]= useState('')
    const [cardnumber, setCardnumber] = useState('')
    const [expirydate,setExpirydate] = useState({month:'',year:''})
    const [cvv,setCvv] = useState('')

    const paymentAnimation = {
        landscape:{
            initial:{
                translateX:"125vw"
            },
            animation:{
                translateX:"75vw",
                duration:"4s"
            }
        },
        portrait:{
            initial:{
                translateX:"100vw"
            },
            animation:{
                translateX:"0vw",
                duration:"4s"
            }
        }
    }
        return <motion.div id="paymentBarMainDiv" ref={ref} variants={isLandScape? paymentAnimation.landscape : paymentAnimation.portrait} initial="initial" animate= {props.slide ? "animation" : "initial"}>
                    <Button id="cancel" onClick={props.handleClose} >Cancel</Button>
                    <AtmCard slide={props.slide} cardname={cardname} cardnumber={cardnumber} expirydate={expirydate} cvv={cvv} />
                    <PaymentForm  nameSetter={setCardname} numberSetter={setCardnumber} expirySetter={setExpirydate} cvvSetter={setCvv} />
                    <Button variant="contained" id="pay"  >PAY</Button>
                </motion.div>
})

function AtmCard({slide, cardname, cardnumber, expirydate, cvv}){
    const isLandScape  = useMediaQuery({query: '(orientation:landscape)'});
    const setOneRef = useRef(null);
    const setTwoRef = useRef(null);
    const setThreeRef = useRef(null);
    const setFourRef = useRef(null);

    useEffect(function(){
        if(!cardnumber){
          if(setOneRef.current.innerText != null ) setOneRef.current.innerText = 'xxxx';
          if(setTwoRef.current.innerText != null ) setTwoRef.current.innerText = 'xxxx';
          if(setThreeRef.current.innerText != null ) setThreeRef.current.innerText = 'xxxx';
          if(setFourRef.current.innerText != null )  setFourRef.current.innerText = 'xxxx';
          return
        }
        switch(true){
            case (cardnumber.length > 0 && cardnumber.length <5 ):{
                    if(setOneRef.current.innerText != null ) setOneRef.current.innerText = `${cardnumber}`.substring(0,4);
                    return
            }
            case (cardnumber.length > 4 && cardnumber.length <9 ):{
                    if(setTwoRef.current.innerText != null ) setTwoRef.current.innerText = `${cardnumber}`.substring(4,8);
                    return
            }
            case (cardnumber.length > 8 && cardnumber.length <13 ):{
                    if(setThreeRef.current.innerText != null ) setThreeRef.current.innerText = `${cardnumber}`.substring(8,12);
                    return
            }
            case (cardnumber.length > 12 && cardnumber.length <17 ):{
                    if(setFourRef.current.innerText != null ) setFourRef.current.innerText = `${cardnumber}`.substring(12);
                    return
            }
        }
    },[cardnumber])

    const atmAnimation = {
        landscape:{
            initial:{
                translateX:"1em"
            },
            animation:{
                translateX:"-5em",
                duration:"4s",
            }
        },
        portrait:{
            initial:{
                translateX:"7em"
            },
            animation:{
                translateX:"2em",
            }
        }
    }

    return <motion.div id="atmCardBackground" variants={isLandScape ? atmAnimation.landscape : atmAnimation.portrait} initial = "initial" animate = {slide ? "animation" : "initial"}  >
        <img src={MasterCard}/>
        <p id="masterCardText">Mastercard</p>
        <div id="cardNumberDiv">
            <p id="one" ref={setOneRef}></p>
            <p id="two" ref={setTwoRef}></p>
            <p id="three" ref={setThreeRef}></p>
            <p id="four" ref={setFourRef}></p>
        </div>
        <div id="nameAndExpiry">
        <p id="holderName">{cardname || 'John Doe'}</p>
        <p id="expiry">{(expirydate.month || expirydate.year) ? `${expirydate.month} / ${expirydate.year}` :  '09/23'}</p>
        </div>
    </motion.div>
}

function PaymentForm({nameSetter,numberSetter,expirySetter,cvvSetter}){

    function handleChange(text, setter){
        setter(initial => text);
    }

    function handleExpiryChange(text,sig){
        if (sig === "MONTH") {
            if(text.length > 2){
                 expirySetter(initial => ({...initial,month: `${text}`.substring(text.length-2)}) );
                return
            }
            expirySetter(initial => ({...initial,month: text}) )
        }

        if (sig === "YEAR") {
            if(text.length > 2){
                expirySetter(initial => ({...initial,year: `${text}`.substring(text.length-2)}) );
               return
           }
           expirySetter(initial => ({...initial,year: text}) )
        }
    }

    return <div id="paymentForm" >
        <TextField id="cardHolder" label="Card Name" variant="standard" type="text" sx={{width:"75%"}} onChange={(e)=>{handleChange(e.target.value,nameSetter)}} />
        <TextField id="cardNumber" label="Card Number" variant="standard" type="number" sx={{width:"75%"}}  onChange={(e)=>{handleChange(e.target.value, numberSetter)}}   />
        <div id="majorRow">
            <div id="minorRow">
                <TextField  variant="standard" label = "mm" type="number"  sx={{width:"40%"}} onChange={(e)=>{handleExpiryChange(e.target.value, "MONTH")}}  />
                <div id="dash"></div>
                <TextField label="yy" variant="standard" type="number" sx={{width:"40%"}}  onChange={(e)=>{handleExpiryChange(e.target.value,"YEAR")}} />
            </div>
            <TextField label="cvv"  variant="standard" type="number"  sx={{width:"35%"}} onChange={(e)=>{handleChange(e.target.value,cvvSetter)}} />
        </div>
    </div>
}
