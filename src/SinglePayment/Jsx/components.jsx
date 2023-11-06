import { Button, TextField } from "@mui/material";
import TestImage from "/imageOne.png";

export function CarImage({image,brand,model}){
    return <div id="carImageDiv">
        <img src={image} />
        <div id="metaData">
            <p id="brand">{brand}</p>
            <p id="model">"{model}"</p>
        </div>
    </div>
}

export function Payment({amount}){
    return <div id="paymentContainer">
                <h3>PAYMENT DETAILS</h3>
                <div id="allInputContainer">
                    <TextField label = "Card Holder's Name" variant="standard" sx={{width:"80%"}} />
                    <TextField label = "Card Number"    variant="standard" sx={{width:"80%"}} />
                    <div>
                        <TextField label = "Card Expiry"    variant="standard" sx={{width:"50%"}} />
                        <TextField label = "CVV"    variant="standard" sx={{width:"30%"}} />
                    </div>
                    <span>
                    <p>PAYMENT AMOUNT:</p>
                    <p id="amountP"> {amount ? `N ${amount}` : "free"}</p>
                    </span>
                </div>
                <Button variant="contained" >PAY</Button>
            </div>
}