import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Select = ({label="",handlerChange=()=>{},items = [],selected=null,loading=false,disabled=false}) => {
    const [open,setOpen] = useState(false);
    let item_selected = items.find(item => item.id === selected);
    // console.log(item_selected,selected)

    return <div className="w-full relative">
                <label className="block text-sm font-medium text-gray-900 mb-2">{label}</label>
                <button onClick={()=>{
                    if(!disabled){
                        setOpen(!open)
                    }
                }} type="button" className={`grid w-full cursor-default grid-cols-1 rounded-md px-4 py-2 border border-gray-300 rounded-md ${!open && !disabled? "bg-white":"bg-gray-100"} focus:outline-none focus:ring-2 focus:ring-purple-500`} aria-haspopup="listbox" aria-expanded={open}>
                    <span className={`col-start-1 row-start-1 flex items-center gap-3 pr-6 ${!open? "text-gray-900":"text-gray-400"}`}>
                        <span className="block truncate">{item_selected?.text || (loading? "":"Pilih opsi")}</span>
                    </span>
                    {
                        loading? 
                        <AiOutlineLoading3Quarters className="col-start-31 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"/>:
                        <svg className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4 transform transition-transform duration-200" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" style={{ transform: "rotate(0deg)"}}><path fill-rule="evenodd" d="M12 15.5a1 1 0 0 1-.707-.293l-5-5a1 1 0 1 1 1.414-1.414L12 13.086l4.293-4.293a1 1 0 0 1 1.414 1.414l-5 5A1 1 0 0 1 12 15.5Z" clip-rule="evenodd"></path></svg>
                    }
                </button>
                {(open && !disabled) && <ul className="!py-1 !px-1 mb-0 absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden sm:text-sm" role="listbox">
                    {
                        items.map(item => 
                            <li onClick={()=>{
                                handlerChange(item.id);
                                setOpen(false);
                            }} className="relative cursor-pointer py-2 pr-9 pl-3 select-none text-gray-900 hover:bg-purple-100 hover:text-purple-900" role="option">
                                <span className="block truncate">{item.text}</span>
                                {item.id===selected && <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-green-500"><svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"></path></svg></span>}
                            </li>)
                    }
                </ul>}
            </div>
}

export default Select;