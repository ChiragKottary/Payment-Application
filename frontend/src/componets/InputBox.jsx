export function InputBox({label , name , onchange}){

    return <div>
        <div className="text-sm font-medium text-left py-2">{label}</div>
        <input onChange={onchange} type="text" placeholder={name} className="w-full px-2 py-1 border rounded border-slate-200"/>
    </div>
}