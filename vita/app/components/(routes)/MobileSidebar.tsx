"use client";

import React from 'react';
import { SheetContent, SheetTrigger, Sheet } from '@/components/ui/sheet';
import { ButtonNav } from '../ButtonNav';
import { Menu } from 'lucide-react';
import SidebarInfo from './SidebarInfo';
import { usePathname } from 'next/navigation';

/**
 * Component representing the mobile sidebar
 * @author Bernardo de la Sierra
 * @version 1.0.1 
 */
const MobileSidebar = () => {
    // Get the current pathname using the usePathname hook from next/navigation
    const pathname = usePathname();

    // Define routes with their respective labels, hrefs, and styles
    const routes = [
        {
            label: 'Home',
            href: '/home',
            backgroundColor: 'bg-home-background',
            buttonColor: 'text-black',
        },
        {
            label: 'Nutrition',
            href: '/nutrition',
            backgroundColor: 'bg-nutrition-background',
            buttonColor: 'text-white',
        },
    ];

    // Find the current route based on the pathname or set default values
    const currentRoute = routes.find((route) => route.href === pathname) || {
        label: '',
        href: '',
        backgroundColor: 'bg-white', // Default value if route doesn't match
        buttonColor: 'text-black', // Default value if route doesn't match
    };

    return (
        <div className={`flex items-center p-4 ${currentRoute.backgroundColor}`}>
            {/* Sheet for displaying sidebar */}
            <Sheet> 
                <SheetTrigger> 
                    {/* Button for triggering the sidebar */}
                    <ButtonNav variant="ghost" size="icon" className={`md:hidden ${currentRoute.buttonColor}`}>
                        <Menu />
                    </ButtonNav>
                </SheetTrigger>
                {/* Content of the sidebar */}
                <SheetContent side="left" className="p-0">
                    <SidebarInfo />
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default MobileSidebar;
