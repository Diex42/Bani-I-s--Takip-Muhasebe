import { User } from "lucide-react"
import { Mock_Users } from "../data/mock"
import banilogo from '../assets/baniLogo-svg.svg'
import { Nav_Items } from "./navigation"
import { NavLink } from "react-router-dom"

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {

    return (
        <aside className={`fixed -bottom-1 z-50 md:static h-1/2 md:h-screen w-full md:w-64 px-4 md:px-0 md:bg-bg-sidebar transition-all duration-300 ease-in-out
            ${isOpen ? 'translate-y-0 ' : 'translate-y-full md:translate-y-0'} `}>
            <div className="w-full h-full flex flex-col  justify-between py-10 px-4 gap-6 bg-bg-sidebar rounded-t-3xl md:rounded-none">

                <div className="hidden md:flex justify-center invert  ">
                    <img src={banilogo} alt="" className="w-30 h-auto border-b border-text-primary pb-2" />
                </div>

                <div className="flex flex-col py-6 px-1  overflow-y-auto gap-6">
                    {Nav_Items.map((item) => (
                        <NavLink to={item.href} key={item.name} onClick={onClose} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 font-text group
                    ${isActive ? 'bg-bg/10 text-text-inverse' : 'text-text-muted hover:bg-bg/10 hover:text-text-inverse'}
                    `}>
                            <item.icon className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                            <p className="font-text">{item.name}</p>
                        </NavLink>
                    ))}
                </div>

                <div className="flex flex-col items-center gap-6 "> 
                    <div className="flex flex-row gap-2 items-center">
                        <User className="w-8 h-auto text-text-inverse" />
                        <p className="text-text-inverse font-heading">{Mock_Users[0].fullname} </p>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
