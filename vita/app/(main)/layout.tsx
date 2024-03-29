import type { Metadata } from "next";
import { Nunito, } from 'next/font/google';
import SidebarInfo from "../components/(routes)/SidebarInfo";
import MobileSidebar from "../components/(routes)/MobileSidebar";




const font = Nunito({ 
  subsets: ['latin'], 
});


export const metadata: Metadata = {
  title: "Vita",
  description: "Salud",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
        <body >
        <div className="h-full relative">
        <div className="hidden h-full md:flex md:flex-col
         md: w-72 md:fixed md:inset-y-0 z-[80] bg-side-color">
          <div>
            <SidebarInfo />
          </div>
          </div>
          <main className="md:pl-72">
            <MobileSidebar />
            {children}
          </main>
      
      </div>
          
          </body>
    </html>
  );
}
