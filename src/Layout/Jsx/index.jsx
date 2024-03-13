import { Outlet, useLocation } from "react-router-dom";
import { Header,Footer } from "./components";
import '../Styles/index.css';
import { useEffect } from "react";


export default function Layout(){
    const {pathname} = useLocation()
    useEffect(function(){
        window.scrollTo(0, 0);
    },[pathname]);

    return <div id="layoutWrapper">
    <div id="headerWrapper">
        <Header/>
    </div>
    <div id="outletWrapper">
        <Outlet/>
    </div>
    <div id="footerWrapper">
        <Footer/>
    </div>
    </div>
}