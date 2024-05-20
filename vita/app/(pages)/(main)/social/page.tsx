'use client';

import React from "react";

import LeftSideBar from "@/components/layoutSocial/LeftSideBar";
import MainContainer from "@/components/layoutSocial/MainContainer";
import RightSideBar from "@/components/layoutSocial/RightSideBar";
import TopBar from "@/components/layoutSocial/TopBar";
import BottomBar from "@/components/layoutSocial/ButtomBar";

const Social = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="flex flex-row"> 
        {/* <LeftSideBar />  */}
        <MainContainer>
          <TopBar />
          {children}
        </MainContainer>
        {/* <RightSideBar /> */}
      </main>
      {/* <BottomBar />  */}
    </>
  );
};


export default Social;
