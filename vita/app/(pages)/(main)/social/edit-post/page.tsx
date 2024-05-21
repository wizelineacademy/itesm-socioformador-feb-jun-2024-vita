"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { UserPost } from "@/data/datatypes/user";
import {
    Bookmark,
    BookmarkBorder,
    BorderColor,
    Delete,
    Favorite,
    FavoriteBorder,
  } from "@mui/icons-material";

// Define the props interface
interface PostCardProps {
  post: Post;
  creator: UserPost[];
}

const PostCard: React.FC<PostCardProps> = ({ post, creator }) => {
    const profilePhoto = post.profilePhoto ?? "/assets/noAvatar.png";
  
  return (
    <div  className="w-full  rounded-lg flex flex-col gap-4 bg-dark-1 p-5 max-sm:gap-2">
        
    </div>
  );
};

export default PostCard;
