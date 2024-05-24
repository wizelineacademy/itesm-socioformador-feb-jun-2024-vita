"use client";
import { NextResponse } from "next/server";
import Image from "next/image";
import Link from "next/link"; 
import {  UserPost} from "@/data/datatypes/user";
import { tabs } from "@/constants";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

interface UserCardProps {
  userData: UserPost;
  creator: UserPost[];
  activeTab: String;
}

const ProfileCard: React.FC<UserCardProps> = ({ userData, creator, activeTab }) => {
  const profilePhoto = userData[0].profilePhoto ?? "/assets/noAvatar.png";
  const [postCount, setPostCount] = useState<number>(0);
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);
  
  useEffect(() => {
    getPostCount();
    getFollowingCount();
    getFollowersCount();
  }, []);

  const getPostCount = async () => {
    try {
      const response = await axios.get(`/api/profileSocial/post/${userData[0].idUser}`);
      setPostCount(response.data.length);
    } catch (error) {
      console.error("Failed to fetch post count:", error);
    }
  };
  
  const getFollowingCount = async () => {
    try {
      const response = await axios.get(`/api/user/following/${userData[0].idUser}`);
      setFollowingCount(response.data.length);
    } catch (error) {
      console.error("Failed to fetch following count:", error);
    }
  };

  const getFollowersCount = async () => {
    try {
      const response = await axios.get(`/api/user/followers/${userData[0].idUser}`);
      setFollowersCount(response.data.length);
    } catch (error) {
      console.error("Failed to fetch followers count:", error);
    }
  };

  return (
    <div className="flex flex-col gap-9">
       <div className="flex justify-between items-start">
        <div className="flex gap-5 items-start">
          <Image
            src={profilePhoto}
            alt="profile photo"
            width={100}
            height={100}
            className="rounded-full md:max-lg:hidden"
          />

          <div className="flex flex-col gap-3">
            <div className="flex max-sm:flex-col gap-2 items-center max-sm:gap-0.5">
              <p className="text-light-1 text-2xl ">
                {userData[0].name} 
              </p>
            </div>
  
            <div className="flex gap-7 text-small-bold max-sm:gap-4">
            
              <div className="flex max-sm:flex-col gap-2 items-center max-sm:gap-0.5">
                <p className="text-purple-1">{postCount}</p>
                <p className="text-light-1">Publicaciones</p>
              </div>
              <Link href={`/social/profile/${userData[0].idUser}/followers`}> 
                <div className="flex max-sm:flex-col gap-2 items-center max-sm:gap-0.5 cursor-pointer hover:underline">
                  <p className="text-purple-1">{followersCount}</p>
                  <p className="text-light-1">Seguidores</p>
                </div>
              </Link>
              <Link href={`/social/profile/${userData[0].idUser}/following`}>
                <div className="flex max-sm:flex-col gap-2 items-center max-sm:gap-0.5 cursor-pointer hover:underline">
                  <p className="text-purple-1">{followingCount}</p>
                  <p className="text-light-1">Siguiendo</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {tabs.map((tab) => (
          <Link
            key={userData[0].idUser}
            className={`tab ${
              activeTab === tab.name ? "bg-purple-1 p-2 text-light-1" : "bg-dark-2 p-2 text-light-1"
            }`}
            href={`/profile/${userData[0].idUser}/${tab.link}`}
          >
            {tab.name}
          </Link>
        ))}
      </div>
        
    </div>
  );
};

export default ProfileCard;

