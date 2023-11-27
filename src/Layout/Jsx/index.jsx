import { Outlet } from "react-router-dom";
import { Header,Footer } from "./components";
import '../Styles/index.css';


export default function Layout(){
    return <div id="layoutWrapper">
    <div id="headerWrapper">
        <Header/>
    </div>
    <div id="outletWrapper">
        <Outlet/>
    </div>
    {/* <div id="footerWrapper">
        <Footer/>
    </div> */}
    </div>
}