import { Button, TextField } from "@mui/material";
import TestImage from "/imageOne.png";

export function CarImage(){
    return <div id="carImageDiv">
        <img src={TestImage} />
        <div id="metaData">
            <p id="brand">LAMBORGHINI</p>
            <p id="model">"AVENTADOR"</p>
        </div>
    </div>
}

export function Payment(){
    return <div id="paymentContainer">
                <h3>PAYMENT DETAILS</h3>
                <div id="allInputContainer">
                    <TextField label = "Card Holder's Name" variant="standard" sx={{width:"80%"}} />
                    <TextField label = "Card Number"    variant="standard" sx={{width:"80%"}} />
                    <div id="cvvExpiryDiv" >
                        <TextField label = "Card Expiry"    variant="standard" sx={{width:"50%"}} />
                        <TextField label = "CVV"    variant="standard" sx={{width:"30%"}} />
                    </div>
                    <span>
                    <p>AMOUNT:</p>
                    <p id="amountP">45,000</p>
                    </span>
                </div>
                <Button variant="contained" >PAY</Button>
            </div>
}