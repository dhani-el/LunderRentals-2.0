import {useState, useContext} from 'react';
import { Button, TextField } from "@mui/material";
import {User} from 'react-feather';
import ViewList from '@mui/icons-material/ViewList';
import {Close,ShoppingBag,Twitter,Instagram,YouTube,Facebook,Pinterest} from '@mui/icons-material';
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
        <Link to={"/"} >
            <img src={LogoImage} alt='lunder rentals logo' />
        </Link>
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
                   { isOpen ? <Close id ="menuCloseIcon" className='menuIcons' style ={{color:"black"}} /> :<ViewList id = "menuListIcon" className='menuIcons'/> }
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

        <div id='quicknews'>

            <div id='quickLinks'>
                <Link to='/branches' >About</Link>
                <Link to='/delivery' >Press</Link>
                <Link to='/dealers'>Dealers</Link>
                <Link to='/contact' >Contact Us</Link>
                <Link to='/rent' >Careers</Link>
            </div>

            <div id='newsLetter'>
                <p id='desc'>Get the freshest lunder rentals news</p>
                <div id='muiDiv'>
                    <TextField id='textF' placeholder='Your Email' type='email' sx={{color:"white"}} />
                    <Button variant='outlined' sx={{color:"white",borderRadius:"0px",outlineColor:"white",borderColor:"white"}}>Subscribe</Button>
                </div>
            </div>

        </div>

        <div id='boilerPlateterms'>
            <div id='boilerPlateContent' >
                <p className='singleP'>Terms & Conditions</p>
                <p className='singleP'>Privacy Policy</p>
                <p className='singleP'>Code of Conduct </p>
                <p className='singleP' id='lastP'>Marketing to Children</p>
            </div>

            <div id='termsMedia' >

                <p>© 2024 Lunder Rentals, LLC. All Rights Reserved.</p>

                <div id='socialMediaDiv'>
                    <span>
                        <Instagram/>
                    </span>
                    <span>
                        <Pinterest/>
                    </span>
                    <span>
                        <Facebook/>
                    </span>
                    <span>
                        <YouTube/>
                    </span>
                    <span>
                        <Twitter/>
                    </span>
                </div>

            </div>
        </div>


    </div>
}

function CartLink(){
    return <div id='cartLinkMainDiv'>
        <Link to="/cart">
            <ShoppingBag id="cartIcon"/>
        </Link>
    </div>
}