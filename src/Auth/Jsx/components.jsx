import { useState,useContext} from "react";
import { motion } from "framer-motion" ;
import { Box, TextField, Button, Card, Alert } from "@mui/material";
import formType from "../constant";
import axios from "axios";
import { AuthContext } from "../../App";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


export function Login(){
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setshowAlert] = useState(false);
    const [AlertType, setAlertType] = useState("success");
    const [AlertMessage, setAlertMessage] = useState("");
    const payload = {username : userName, password: password};
    const {authState,contextFn} = useContext(AuthContext);
    const navigate = useNavigate()

    function handleInputChange(e, setFunc){
        if(e != null){
            setFunc(e.target.value);
        }
    }
    function handleLoginClick(){
        if (checkFields([userName,password]) > 0) {
            return
        }
        logUserIn()
    }
    function checkFields(fields){
        let fieldHealth = fields.filter(function(fieldValue){
                return fieldValue == ''
        })
        return fieldHealth.length
    }
    function logUserIn(){
        axios.post(`http://localhost:3000/auth/login`,payload, {
            withCredentials:true,
        }).then(function(user){
            console.log(user);
            SaveLoggedInUser(user);
            contextFn((initial)=>({isloggedin:true,username:user.data}));
            indicateUserLoggedIn("success","Login Successfull")
            return user
        }).then(function(user){
            setTimeout(() => {
            navigate("/rent")
            }, 3000);
        }).catch(function(errorresponse){
            console.log("errorresponse",errorresponse);
            if(errorresponse.request.statusText === "Unauthorized"){
                indicateUserLoggedIn("error","Your Username Or Password is incorrect")
            }else{
                indicateUserLoggedIn("error",errorresponse.request.responseText)
            }
        })
    }
    function SaveLoggedInUser(user){
        localStorage.setItem("authStatus",true);
        localStorage.setItem("user",user.data)
    }
    function indicateUserLoggedIn(alertType,alertMessage){
        setAlertType(init=>alertType);
        setAlertMessage(init=>alertMessage);
        setshowAlert(init=>true);
        setTimeout(() => {
            setAlertType(init=>"success");
            setAlertMessage(init=>"");
            setshowAlert(init=>false);
        }, 2000);
    }

    return <motion.div className="formDiv" id="logInForm" >
                <Box component='form' className="form"  >
                    <Card className="card" >
                        <TextField label = "Username or Email" variant="standard" type="text" required autoComplete="false" onChange={(e)=>handleInputChange(e,setUserName)}   />
                        <TextField label = "Password" variant="standard" type="password" required autoComplete="false" onChange={(e)=>handleInputChange(e,setPassword)} />
                        <div><Button variant="contained" onClick={handleLoginClick} >Log In</Button></div>
                        <div id="formLinks">
                            <p>Forgot Password?</p>
                            <p>| don't have an account?</p>
                        </div>
                    </Card>
                </Box>
                {showAlert && <div style={{position:"absolute",top:"50vh",left:"0vh",width:"100%",display:"flex",justifyContent:"center"}} ><Alert color={AlertType}>{AlertMessage}</Alert></div>}
            </motion.div>

}

export function SignUp({nav}){
    const [firstName , setFirstName] = useState('');
    const [lastName , setLastname] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [shouldSend , setShouldSend] = useState(false);
    const [showAlert , setshowAlert] = useState(false);
    const [AlertType , setAlertType] = useState("success");
    const [AlertMessage , setAlertMessage] = useState("");
    const payload  = {name:`${firstName} ${lastName}`, email:email, password:password}

    const {isFetching,data} = useQuery({
        queryKey:["signup"],
        queryFn: ()=> axios.post(`http://localhost:3000/auth/signup`,payload)
            .then(function(response){
                setShouldSend(false);
                resetUser();
                indicateUserSignedIn("success","Sign Up Successfull")
                console.log(response);
                return response;
            }).then(function(response){
                setTimeout(() => {
                    nav()
                }, 3000);
                return response
            })
            .catch(function(errorresponse){
                indicateUserSignedIn("error",errorresponse.request.responseText)
                return errorresponse
            })
        ,
        enabled: shouldSend,
        retry:0,
        refetchOnWindowFocus:false,
    });


    function handleSignUpClick(){
        if(checkFields([firstName,lastName,email,password]) > 0){
            
            return
        }
        signUserUp();
    }

    function checkFields(fields){
        let fieldHealth = fields.filter(function(fieldValue){
                return fieldValue == ''
        })
        return fieldHealth.length
    }

    function signUserUp(){
        setShouldSend(true);
    }

    function resetUser(){
        setFirstName(initial => '');
        setLastname(initial => '');
        setEmail(initial => '');
        setPassword(initial => '');
    }
    function indicateUserSignedIn(alertType,alertMessage){
        setAlertType(init=>alertType);
        setAlertMessage(init=>alertMessage);
        setshowAlert(init=>true);
        setTimeout(() => {
            setAlertType(init=>"success");
            setAlertMessage(init=>"");
            setshowAlert(init=>false);
        }, 2000);
    }
    return <motion.div className="formDiv" id="signUpForm" >
                <Box component='form' className="form" >
                    <Card className="card" >
                        <TextField label = "FirstName" variant="standard" type = 'text' required onChange={(e)=>{console.log("change");setFirstName((init)=>e.target.value)}}  />
                        <TextField label = "LastName" variant="standard"  type = 'text' required  onChange={(e)=>setLastname((init)=>e.target.value)} />
                        <TextField label = "Email" variant="standard" type = "email" required  onChange={(e)=>setEmail((init)=>e.target.value)} />
                        <TextField label = "Password"  variant="standard" type = "password" required  onChange={(e)=>setPassword((init)=>e.target.value)} />
                        <div><Button variant="contained" onClick={function(){
                            handleSignUpClick()
                        }}>Sign Up</Button></div>
                        <div id="formLinks">
                            <p>Have an account?</p>
                            <p>Log in</p>
                        </div>
                    </Card>
                </Box>
                {showAlert && <div style={{position:"absolute",top:"50vh",left:"0vh",width:"100%",display:"flex",justifyContent:"center"}} ><Alert color={AlertType}>{AlertMessage}</Alert></div>}

            </motion.div>
}

export function AuthSelector({setFormFunction, form}){
        const anim = {
            initial:{
                backgroundColor: "whiteSmoke",
                color:"black",
                zIndex:1
            },
            clicked:{
                backgroundColor: "aquamarine",
                color:"white",
                zIndex:2,
                margin:"2em"
            }
        }

        function handleClickSignUp(){
                    setFormFunction(formType.SIGNUP)
        }
        function handleClickLogIn(){
                    setFormFunction(formType.Login)
        }
        return <motion.div id="authSelectorContainer" >
                        <motion.span  initial = "initial" animate = {form == formType.SIGNUP ?"clicked" : "initial"} variants={anim} className="singleAuthSelector" id="signUpButtonSpan" > <Button variant="outlined" onClick={handleClickSignUp} >Sign Up</Button> </motion.span>
                        <motion.span  initial = "initial" animate = {form == formType.Login ?"clicked" : "initial"} variants={anim} className="singleAuthSelector"  id="logInButtonSpan"  > <Button variant="outlined" onClick={handleClickLogIn} >Log In</Button> </motion.span>
               </motion.div>
}