import { Link } from "react-router-dom";


export function Warning({label, where , to}){

    return <div className="py-2 text-sm flex justify-center">
        <p>{label}</p>
        <Link to={to} className="pointer underline pl-1 cursor-pointer">{where}</Link>
        
    </div>
}