'use client';

import { Nunito } from 'next/font/google';
import SidebarInfo from "../components/(routes)/SidebarInfo";
import MobileSidebar from "../components/(routes)/MobileSidebar";
import Decoration from "../components/Decoration";
import { usePathname } from "next/navigation"; 
import { useEffect, useState, useCallback } from 'react';

const font = Nunito({ 
  subsets: ['latin'], 
});

const routes: { [key: string]: string } = {
  "/home": "bg-home-background",
  "/nutrition": "bg-nutrition-background",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [backgroundColor, setBackgroundColor] = useState(() => {
    const routeColor = routes[pathname] || 'bg-home-background';
    return routeColor;
  });

  useEffect(() => {
    const routeColor = routes[pathname] || 'bg-home-background';
    setBackgroundColor(routeColor);
  }, [pathname]);

  return (
    <html lang="es">
        <body >
          <div className="relative m-0">
            <div id="Sidebar" className="hidden  md:flex md:flex-col md: w-72 md:fixed md:inset-y-0 z-[80]
             bg-side-color  m-0">
                <div>
                  <SidebarInfo />
                </div>
              </div>
              <main id="MobileSideBar" className="md:pl-72  m-0" >
                <div className="md:hidden lg:hidden">
                  <MobileSidebar />
                </div>
                <div id="PrincipalPage" className={`h-screen overflow-auto flex flex-col relative lg:m-0 
                md:m-0 lg:pl-8 md:pl-8 ${backgroundColor}`}>
                  <Decoration pathname={pathname}/>
                  {children}
                </div>  
              </main>  
          </div>
        </body>
    </html>
  );
}
