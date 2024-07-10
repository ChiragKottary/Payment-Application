import { HeaderName } from "../componets/HeaderName";
import {InfoHead} from "../componets/InfoHead";
import {InputBox} from "../componets/InputBox";
import {Button} from "../componets/Button";
import {Warning} from "../componets/Warning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Signup = ()=>{
  const navigate = useNavigate();
  const [firstname ,setFirstname] = useState("");
  const [lastname ,setLastname] = useState("");
  const [username ,setUsername] = useState("");
  const [password ,setPassword] = useState("");

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <HeaderName label={"Sign up"} />
        <InfoHead label={"Enter your infromation to create an account"} />
        <InputBox onchange={e =>{
          setFirstname(e.target.value)
        }} name="Chirag" label={"First Name"} />

        <InputBox  onchange={e =>{
          setLastname(e.target.value)
        }} name="Kottary" label={"Last Name"} />

        <InputBox  onchange={e =>{
          setUsername(e.target.value)
        }} name="chirag@gmail.com" label={"Email"} />

        <InputBox  onchange={e =>{
          setPassword(e.target.value)
        }} name="13245768" label={"Password"} />

        <div className="pt-4">
          <Button onClick={ async ()=>{
            const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
            firstname,
            lastname,  
            username,
            password,
            });
            localStorage.setItem("token", response.data.token)
            alert("user created succesfully");
            navigate('/dashboard');
          }} label={"Sign up"} />
        </div>
        <Warning label={"Already have an account?"} where={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}