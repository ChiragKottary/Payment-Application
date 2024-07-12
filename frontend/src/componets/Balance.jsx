import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"

export const Balance = () => {
    const [getbalance , setBalance] = useState(0);

    useEffect(()=>{
        ()=>{

        }
            axios.get("http://localhost:3000/api/v1/account/balance",{
                headers:{
                    Authorization: localStorage.getItem("token")
                }
            }).then(async (res) =>{
                const data =  await res.data;
                console.log(data)
                setBalance(parseInt(data.balance));
            })
            
    },[])
    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {getbalance}
        </div>
    </div>
}