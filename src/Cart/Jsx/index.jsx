
import { ListOfCartItems, OrderSummary} from "./component";
import  "../Styles/index.css";




function Cart(){

    return <div id="cartBackground">
        <h2>Shopping Car<span>t</span></h2>
        <ListOfCartItems cartItems={[{name:"Porsche 911", color:"Black",price:"21,000"},{name:"Audi R8", color:"White",price:"18,500"},{name:"Porsche 911", color:"Black",price:"21,000"},{name:"Audi R8", color:"White",price:"18,500"}]} />
        <OrderSummary summaryDetails={{count:"2", tax:"5", shipping:"free",total:"40,500"}}/>
    </div>
}


export default Cart