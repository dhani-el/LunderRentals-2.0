import { Close } from "@mui/icons-material";
import productImage from "/imageOne.png";
import { Button } from "@mui/material";


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
                <p>{itemDetails.color}</p>
                <p>N {itemDetails.price}</p>
            </div>
            <Close id = "closeIcon" />
    </div>
}

export function OrderSummary({summaryDetails}){
    return <div id="summaryContainer" >
        <h3>Order Summary</h3>
        <div>Cars : {summaryDetails.count}</div>
        <div>Tax : {summaryDetails.tax}%</div>
        <div>Shipping : {summaryDetails.shipping}</div>
        <div>Total : {summaryDetails.total} N</div>
        <Button variant="contained" >Checkout</Button>
    </div>
}

