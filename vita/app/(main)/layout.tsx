'use client';

import { Nunito } from 'next/font/google';
import SidebarInfo from "../components/(routes)/SidebarInfo";
import MobileSidebar from "../components/(routes)/MobileSidebar";
import Decoration from "../components/Decoration";
import { usePathname } from "next/navigation"; 
import { useEffect, useState } from 'react';

// Define font settings
const font = Nunito({ 
  subsets: ['latin'], 
});

// Define routes and their corresponding background colors
const routes: { [key: string]: string } = {
  "/home": "bg-home-background",
  "/nutrition": "bg-nutrition-background",
};

/**
 * Root layout component for the application
 * @param {Object} props - Props for RootLayout component
 * @param {React.ReactNode} props.children - Child components to be rendered
 * @author Bernardo de la Sierra
 * @version 1.0.1 
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get the current pathname using the usePathname hook from next/navigation
  const pathname = usePathname();

  // Extract the root route from the current pathname
  const rootRoute = pathname.split('/')[1]; // Extract the root route from the pathname

  // Determine the background color based on the root route
  const backgroundColor = routes[`/${rootRoute}`] || 'bg-home-background';

  return (
    <html lang="es">
      <body>
        <div className="relative m-0">
          {/* Sidebar */}
          <div id="Sidebar" className="hidden md:flex md:flex-col md:w-72 md:fixed md:inset-y-0 z-[80]
             bg-side-color m-0">
            <div>
              <SidebarInfo />
            </div>
          </div>
          {/* Main content area */}
          <main id="MobileSideBar" className="md:pl-72 m-0">
            <div className="md:hidden lg:hidden">
              <MobileSidebar />
            </div>
            <div id="PrincipalPage" className={`h-screen overflow-auto flex flex-col relative lg:m-0 
                md:m-0 lg:pl-8 md:pl-8 ${backgroundColor}`}>
              {/* Decoration component */}
              <Decoration pathname={pathname}/>
              {/* Render children components */}
              {children}
            </div>  
          </main>  
        </div>
      </body>
    </html>
  );
}