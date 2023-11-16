import {useEffect, useState, useContext} from 'react';
import { Button } from "@mui/material";
import {User} from 'react-feather';
import ViewList from '@mui/icons-material/ViewList';
import {Close,ShoppingBag} from '@mui/icons-material';
import {motion} from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import LogoImage from '/one.png';
import { AuthContext } from '../../App';



export function Header(){
    const {authState,contextFn} = useContext(AuthContext);
    console.log("context data",authState.username);
    
    return <div id = "header">
             <Logo/>
             <NavBar/>
             <div id='authNmenuDiv'>
             <Authenticator loggedIn = {authState.username != ''} username={authState.username} />
             <Menu/>
             </div>
        </div>
}

function Logo(){
    return <div id="logo">
        <img src={LogoImage} alt='lunder rentals logo' />
    </div>
}

function NavBar(){
    const location = useLocation().pathname;
    const raw = [{link:"/",title:"HOME"},{link:"/shop",title:"SHOP"},{link:"/rent",title:"RENT"},{link:"/dealers",title:"DEALERS"},]
    const refined = raw.filter(function(data){ return data.link != location});

    return <div id="navBar" >
        {refined.map(function(info){return <Link to={info.link}  className="navLinks" > {info.title}</Link> })}
    </div>
}

function Authenticator({loggedIn,username}){
    console.log('inside ather', username);
    const location = useLocation().pathname;
    return <div id="authenticator" >
        {location === "/cart" || <CartLink numberOfItems={3}/>}
        {loggedIn ? <UserComponent user={username} /> : <AuthButton/> }
    </div>
}

function UserComponent({user}){
    return <div id="userDiv" >
        <User/>
        <p>hi, {user} </p>
    </div>
}

function AuthButton(){
    return <div id="authButtonDiv">
                <Link to='/auth'><Button variant="outlined" id="loginButton">LOG IN</Button> </Link>
    </div>
}

function Menu(){
    const [isOpen,setIsOpen] = useState(false);

    return <div id="menu">
                <motion.div onClick={()=>{setIsOpen((!isOpen))}} >
                   { isOpen ? <Close id ="menuCloseIcon" className='menuIcons' /> :<ViewList id = "menuListIcon" className='menuIcons'/> }
                </motion.div>
                <MenuBody isOpen={isOpen} closeMenuFunction={setIsOpen} />
        </div>
}

function MenuBody({isOpen,closeMenuFunction}){
    const location = useLocation().pathname;
    
    const menuBodyAnim = {
        initial:{
            display:'none',
            scaleX:'0%',
            scaleY:'0%',
            opacity:0,
        },
        open:{
            display:'flex',
            opacity:1,
            scaleX:'100%',
            scaleY:'100%',
        }
    }
    const raw = [{link:"/",title:"HOME"},{link:"/shop",title:"SHOP"},{link:"/rent",title:"RENT"},{link:"/dealers",title:"DEALERS"},]
    const refined = raw.filter(function(data){ return data.link != location})
    return <motion.div initial = "initial" animate = {isOpen?"open" : "initial"} variants={menuBodyAnim} id="menuBody">
            {refined.map(function(info){return <div onClick={()=>{closeMenuFunction(false)}} ><Link to={info.link}  className="navLinks" > {info.title}</Link></div> })}
            </motion.div>
}

export function Footer(){
    return <div id='footerContainer'>
        <Logo/>
        <div id='quickLinks'>
            <Link to='/'>Home</Link>
            <Link to='/dealers'>Dealers</Link>
            <Link to='/branches' >Branches</Link>
            <Link to='/rent' >Rent a Car</Link>
            <Link to='/delivery' >Pick Up</Link>
            <Link to='/contact' >Contact Us</Link>
            <Link to='/careers' >Careers</Link>
            <Link to='/credit' >Credits</Link>
        </div>
        <div id='boilerPlateContent' >

        </div>
    </div>
}

function CartLink({numberOfItems}){
    return <div id='cartLinkMainDiv'>
        <Link to="/cart">
            <ShoppingBag id="cartIcon"/>
        </Link>
    </div>
}