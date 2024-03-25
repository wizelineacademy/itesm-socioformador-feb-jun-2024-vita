"use client"
import React from 'react';
import { SheetContent, SheetTrigger, Sheet } from '@/components/ui/sheet';
import { ButtonNav } from '../ButtonNav';
import { Menu } from 'lucide-react';
import SidebarInfo from './SidebarInfo';
import { usePathname } from 'next/navigation';

const MobileSidebar = () => {
    const pathname = usePathname();

    const routes = [
        {
            label: 'Home',
            href: '/home',
            backgroundColor: 'bg-white',
            buttonColor: 'text-black',
        },
        {
            label: 'Nutrition',
            href: '/nutrition',
            backgroundColor: 'bg-nutrition-background',
            buttonColor: 'text-white',
        },
    ];

    console.log(pathname);
    const currentRoute = routes.find((route) => route.href === pathname) || {
        label: '',
        href: '',
        backgroundColor: 'bg-white', // Valor predeterminado en caso de que la ruta no coincida
        buttonColor: 'text-black', // Valor predeterminado en caso de que la ruta no coincida
    };

    return (
        <div className={`flex items-center p-4 ${currentRoute.backgroundColor}`}>
            <Sheet>
                <SheetTrigger>
                    <ButtonNav variant="ghost" size="icon" className={`md:hidden ${currentRoute.buttonColor}`}>
                        <Menu />
                    </ButtonNav>
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                    <SidebarInfo />
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default MobileSidebar;
