import { useState } from 'react';
import {Login, SignUp, AuthSelector} from './component';
import formType from '../constant';
import '../Styles/index.css';


export default function Auth(){

    const [form , setForm] = useState(formType.SIGNUP);

    return <div id="authPageContainer">
        <AuthSelector setFormFunction={setForm} form={form} />
        { (form == formType.Login) && <Login/>}
        { (form == formType.SIGNUP) &&  <SignUp/>}
    </div>
}