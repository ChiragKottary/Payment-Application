import { HeaderName } from "../componets/HeaderName";
import {InfoHead} from "../componets/InfoHead";
import {InputBox} from "../componets/InputBox";
import {Button} from "../componets/Button";
import {Warning} from "../componets/Warning";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export function Signin(){
  const navigate = useNavigate();
  const [username ,setUsername] = useState("");
  const [password ,setPassword] = useState("");

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <HeaderName label={"Sign in"} />
        <InfoHead label={"Enter your credentials to access your account"} />
        <InputBox onchange={e =>{
          setUsername(e.target.value)
        }} name="chirag@gmail.com" label={"Email"} />
        <InputBox onchange={e =>{
          setPassword(e.target.value)
        }} name="13245768" label={"Password"} />
        <div className="pt-4">
          <Button onClick={ async ()=>{
            const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
            username,
            password,
            });
            localStorage.setItem("token", response.data.token)
            alert("user loged in succesfully");
            navigate('/dashboard');
          }} label={"Sign in"} />
         
        </div>
        <Warning label={"Don't have an account?"} where={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
    
}
