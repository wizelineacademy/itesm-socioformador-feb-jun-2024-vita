"use client";

import { pageTitles } from "@/constants";
import TopBar from "./TopBar";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface MainContainerProps {
  children: ReactNode;
}

const MainContainer = ({ children }: MainContainerProps) => {
  // Get the current url path
  const currentPath = usePathname();

  // Function to match dynamic routes
  const getTitle = (path: string) => {
    // Remove dynamic parts of the path
    const staticPath = path.split('/').slice(0, 3).join('/');
    for (const page of pageTitles) {
      if (staticPath === page.url) {
        return page.title;
      }
    }
    return "";
  };

  // Get title of current path
  const title = getTitle(currentPath);

  return (
    <section className="flex flex-col flex-1 px-4 md:px-10 lg:px-4 xl:px-20">
      <TopBar />
      <div className="mt-6 mb-20">
        <h1 className="mb-5 text-[30px] leading-[140%] font-bold max-sm:text-[24px] text-light-1">
          {title}
        </h1>
        <div>
          {children}
        </div>
      </div>
    </section>
  );
};

export default MainContainer;
