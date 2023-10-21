import { useState} from "react";
import { motion } from "framer-motion" ;
import { Box, TextField, Button, Card } from "@mui/material";
import formType from "../constant";
// import { useAppDispatch } from "../../Store/store";
// import { setUserLoggedin } from "../../Store/authReducer";


export function Login(){
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();


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
        const username  = localStorage.getItem(userName);
        const passcode  = localStorage.getItem(`${password}${userName}`);
        console.log((username != null && passcode != null) ? indicateUserLoggedIn() : "invalid login details");
    }
    function indicateUserLoggedIn(){
        dispatch(setUserLoggedin({isUserLoggedIn:true,username:userName}));
        console.log('user logged in');
    }


    return <motion.div className="formDiv" id="logInForm" >
                <Box component='form' className="form"  >
                    <Card className="card" >
                        <TextField label = "Username or Email" type="text" required autoComplete="false" onChange={(e)=>handleInputChange(e,setUserName)}  />
                        <TextField label = "Password" type="password" required autoComplete="false" onChange={(e)=>handleInputChange(e,setPassword)} />
                        <Button variant="contained" onClick={handleLoginClick} >Log In</Button>
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

    function handleInputChange(e, setFunc){
        if(e != null){
            setFunc(e.target.value);
        }
    }

    function handleSignUpClick(){
        if(checkFields([firstName,lastName,email,password]) > 0){
            return
        }
        signUserUp();
        resetUser();
    }

    function checkFields(fields){
        let fieldHealth = fields.filter(function(fieldValue){
                return fieldValue == ''
        })
        return fieldHealth.length
    }

    function signUserUp(){
        localStorage.setItem(firstName,firstName)
        localStorage.setItem(lastName,lastName);
        localStorage.setItem(email,email);
        localStorage.setItem(`${password}${firstName}`,password);
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
                        <TextField label = "FirstName" type = 'text' required onChange={(e)=>handleInputChange(e,setFirstName)}  />
                        <TextField label = "LastName"  type = 'text' required  onChange={(e)=>handleInputChange(e,setLastname)} />
                        <TextField label = "Email" type = "email" required  onChange={(e)=>handleInputChange(e,setEmail)} />
                        <TextField label = "Password"  type = "password" required  onChange={(e)=>handleInputChange(e,setPassword)} />
                        <Button variant="contained" onClick={handleSignUpClick}>Sign Up</Button>
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