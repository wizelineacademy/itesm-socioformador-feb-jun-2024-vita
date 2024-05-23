"use client";
import { PersonAddAlt, PersonRemove } from "@mui/icons-material";
import Loader from "@/components/Loader";
import PostCard from "@/components/post/PostCard";
import { UserPost} from "@/data/datatypes/user";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

interface UserCardProps {
    userData: UserPost;
    creator: UserPost[];
  }

  
const UserCard: React.FC<UserCardProps>   = ({ userData,creator }) => {
    const profilePhoto = userData.profilePhoto ?? "/assets/noAvatar.png";
  return (
   
    <div className="flex justify-between items-center">
        <Link className="flex gap-4 items-center" href={`/profile/${userData.idUser}/posts`}>
            <Image
            src={profilePhoto}
            alt="profile photo"
            width={50}
            height={50}
            className="rounded-full"
            />
            <div className="flex flex-col gap-1">
                <p className="text-[14px] leading-[140%] font-semiboldd text-light-1">
                    {userData.name}
                </p>
            </div>
        </Link>
       
    </div>
  );
};

export default UserCard;
