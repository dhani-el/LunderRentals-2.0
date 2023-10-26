
import { ListOfCartItems, OrderSummary, PaymentBar} from "./component";
import  "../Styles/index.css";




function Cart(){

    return <div id="cartBackground">
        <h2>Shopping Car<span>t</span></h2>
        <div id="mostContent">
        <div id="cartContent">
        <ListOfCartItems cartItems={[{name:"Porsche 911", color:"pink",price:"21,000"},{name:"Audi R8", color:"navy",price:"18,500"},{name:"Porsche 911", color:"Black",price:"21,000"},{name:"Audi R8", color:"orange",price:"18,500"}]} />
        <OrderSummary summaryDetails={{count:"2", tax:"5", shipping:"free",total:"40,500"}}/>
        </div>
        <PaymentBar/>
        </div>
    </div>
}


export default Cart