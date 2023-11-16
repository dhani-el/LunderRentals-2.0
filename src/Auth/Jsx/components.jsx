import { useState,useContext} from "react";
import { motion } from "framer-motion" ;
import { Box, TextField, Button, Card } from "@mui/material";
import formType from "../constant";
import axios from "axios";
import { AuthContext } from "../../App";



const baseUrl = "http://localhost:3000/"

export function Login(){
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const payload = {username : userName, password: password};
    const {authState,contextFn} = useContext(AuthContext);

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
        axios.post(`${baseUrl}auth/login`,payload, {
            withCredentials:true,
        }).then(function(user){
            console.log("isd");
            SaveLoggedInUser(user);
            contextFn((initial)=>({isloggedin:true,username:user}));
            return user
        })
    }
    function SaveLoggedInUser(user){
        document.cookie = `user=${user.data};expires=${new Date(Date.now() + 1000*60*60)}`
    }
    function indicateUserLoggedIn(){
        console.log('user logged in');
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
            </motion.div>

}

export function SignUp(){
    const [firstName , setFirstName] = useState('');
    const [lastName , setLastname] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [shouldSend , setShouldSend] = useState(false);
    const payload  = {name:`${firstName} ${lastName}`, email:email, password:password}

    const {isFetching,data} = useQuery({
        queryKey:["signup"],
        queryFn: ()=> axios.post(`${baseUrl}auth/signup`,payload)
            .then(function(response){
                setShouldSend(false);
                resetUser();
                console.log(response);
                return response;
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
        setFirstName('');
        setLastname('');
        setEmail('');
        setPassword('');
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