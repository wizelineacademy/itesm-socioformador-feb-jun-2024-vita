'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FaUtensils, FaHome,FaComments, FaRunning , FaBell, FaDoorOpen, FaMoon } from 'react-icons/fa';
import { usePathname } from "next/navigation";
import { signOut } from 'next-auth/react';

const routes = [
    {
        label: "Inicio",
        icon: FaHome,
        href: "/home",
        color: "bg-home-color"
    },
    {
        label: "Nutrición",
        icon: FaUtensils,
        href: "/nutrition",
        color: "bg-nutrition-color"
    },
    {
        label: "Ejercicio",
        icon: FaRunning,
        href: "/exercise",
        color: "bg-mid-green"
    },
    {
        label: "Sueño",
        icon: FaMoon,
        href: "/sleep",
        color: "bg-decoration-sleep-colordark"
    },
    {
        label: "Chat",
        icon: FaComments ,
        href: "/chat",
        color: "bg-chat-color"
    },
    {
        label: "Recordatorios",
        icon: FaBell ,
        href: "/reminders",
        color: "bg-reminders-color"
    },
    {
        label: "Cerrar sesión",
        icon: FaDoorOpen ,
        href: "/",
        color: "bg-mid-red"
    },
]

const SidebarInfo = () => {
    const pathname = usePathname();
  
    
    return ( 
        <div className="space-y-4 py-4 flex flex-col h-full bg-side-color text-white">
            <div className="px-3 py-2 flex-1">
                <Link id="Enlace"  href="/" className="flex items-center pl-3 mb-14">
                    <div id="Contenedor" className="relative w-8 h-8 mr-4 ">
                        <h1 className="text-2xl font-bold">
                            Vita
                        </h1>
                    </div>
                </Link>
            </div>

            <div className="space-y-1">
                {routes.map((route, index) => (
                    <Link
                        onClick={() => {
                            if(route.label === "Cerrar sesión"){
                                signOut()
                            }
                        }}
                        href={route.href}
                        key={index}
                        className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition", {
                            [route.color]: pathname === route.href, 
                            [`hover:bg-mid-red`]: route.label === "Cerrar sesión"
                        })}
                    >
                        
                        <div className={cn("flex items-center flex-1 mr-3")}>
                            <route.icon 
                                className={cn("mr-3")} 
                                size={24}
                            /> 
                            {route.label}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default SidebarInfo;
