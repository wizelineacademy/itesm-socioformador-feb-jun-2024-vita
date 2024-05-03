import React from 'react';
import { SheetContent, SheetTrigger, Sheet } from '@/components/sheet';
import { ButtonNav } from '../buttons/ButtonNav';
import { Menu } from 'lucide-react';
import SidebarInfo from './SidebarInfo';
import { usePathname } from 'next/navigation';

const MobileSidebar = () => {
    const pathname = usePathname();

    const routes = [
        {
            label: 'Inicio',
            href: '/home',
            backgroundColor: 'bg-home-background',
            buttonColor: 'text-black',
        },
        {
            label: 'Nutrición',
            href: '/nutrition',
            backgroundColor: 'bg-nutrition-background',
            buttonColor: 'text-white',
        },
        {
            label: 'Ejercicio',
            href: '/exercise',
            backgroundColor: 'bg-exercise-background',
            buttonColor: 'text-white',
        },
        {
            label: 'Sueño',
            href: '/sleep',
            backgroundColor: 'bg-dark-purple',
            buttonColor: 'text-white'
        },
        {
            label: 'Chat',
            href: '/chat',
            backgroundColor: 'bg-chat-background',
            buttonColor: 'text-white',
        },
        {
            label: 'Recordatorios',
            href: '/reminders',
            backgroundColor: 'bg-reminders-background',
            buttonColor: 'text-white',
        },
    ];

    // Find the current route based on whether the pathname starts with the defined route href
    const currentRoute = routes.find((route) => pathname.startsWith(route.href)) || {
        label: '',
        href: '',
        backgroundColor: 'bg-white',
        buttonColor: 'text-black',
    };

    return (
        <div className={`flex  p-4 ${currentRoute.backgroundColor}`}>
            <Sheet>
                    <ButtonNav asChild variant="ghost" size="icon" className={`md:hidden ${currentRoute.buttonColor}`}>
                    <SheetTrigger>
                        <Menu />
                    </SheetTrigger>
                    </ButtonNav>
                <SheetContent side="left" className="p-0">
                    <SidebarInfo />
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default MobileSidebar;
