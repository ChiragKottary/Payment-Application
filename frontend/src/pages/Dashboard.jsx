import { Appbar } from "../componets/Appbar"
import { Balance } from "../componets/Balance"
import { Users } from "../componets/Users"


export const  Dashboard= ()=>{

    return <div>
        <Appbar name/>
        <div className="m-8">
        <Balance value={"10,000"}></Balance>
        <Users/>
        </div>
        
    </div>
    
}