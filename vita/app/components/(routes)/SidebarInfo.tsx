'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FaUtensils, FaHome } from 'react-icons/fa';
import { usePathname } from "next/navigation";


const routes = [
    {
        label: "Home",
        icon: FaHome,
        href: "/home",
        color: "bg-home-color"
    },
    {
        label: "Nutrition",
        icon: FaUtensils,
        href: "/nutrition",
        color: "bg-nutrition-color"
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
                        href={route.href}
                        key={index}
                        className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition", {
                            [route.color]: pathname === route.href, // Utilizar interpolación para acceder a la propiedad color de la ruta
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