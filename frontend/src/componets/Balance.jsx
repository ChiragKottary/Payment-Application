import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"

export const Balance = ({ value }) => {
    const [balance , setBalance] = useState(0);

    useEffect(()=>{
            axios.get("http://localhost:3000/api/v1/account/balance",{
                
            }).then(async (res) =>{
                const data =  await res.json();
                setBalance(data)
            })
    },[])
    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {value}
        </div>
    </div>
}