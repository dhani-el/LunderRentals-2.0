import { forwardRef } from "react";
import { Close } from "@mui/icons-material";
import productImage from "/imageOne.png";
import { Button, TextField } from "@mui/material";
import MasterCard from "/masterCard.png"


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
    return <div id="singleCartItemCard">
            <div id="cartItemImage">
                <img src= {productImage} />
            </div>
            <div id="itemDetails">
                <p>{itemDetails.name}</p>
                <Colour color={itemDetails.color} />
                <p>N {itemDetails.price}</p>
            </div>
            <Close id = "closeIcon" />
    </div>
}

function Colour({color}){
    return <div id="color"  >
        <div style={{background:color}}>

        </div>
    </div>
}

export function OrderSummary({summaryDetails,clickHandler}){
    return <div id="summaryContainer" >
        <h3>Order Summary</h3>
        <div>Cars : {summaryDetails.count}</div>
        <div>Tax : {summaryDetails.tax}%</div>
        <div>Shipping : {summaryDetails.shipping}</div>
        <div>Total : {summaryDetails.total} N</div>
        <Button variant="contained" onClick={clickHandler} >Checkout</Button>
    </div>
}

export const PaymentBar = forwardRef(function(ref,props){
        return <div id="paymentBarMainDiv" ref={props} >
                    <AtmCard/>
                    <PaymentForm/>
                    <Button variant="contained" >PAY</Button>
                </div>
})

function AtmCard(){
    return <div id="atmCardBackground">
        <img src={MasterCard}/>
        <p id="masterCardText">Mastercard</p>
        <div id="cardNumberDiv">
            <p id="one">5334</p>
            <p id="two">3563</p>
            <p id="three">5642</p>
            <p id="four">4356</p>
        </div>
        <div id="nameAndExpiry">
        <p id="holderName">John Doe</p>
        <p id="expiry">09/23</p>
        </div>
    </div>
}

function PaymentForm(){
    return <div id="paymentForm">
        <TextField id="cardHolder" label="Card Name" variant="standard" type="text" sx={{width:"75%"}} />
        <TextField id="cardNumber" label="Card Number" variant="standard" type="number" sx={{width:"75%"}}  />
        <div id="majorRow">
            <div id="minorRow">
                <TextField  variant="standard" label = "mm" type="number"  sx={{width:"40%"}} />
                <div id="dash"></div>
                <TextField label="yy" variant="standard" type="number" sx={{width:"40%"}} />
            </div>
            <TextField label="cvv" variant="standard" type="number"  sx={{width:"35%"}}/>
        </div>
    </div>
}
