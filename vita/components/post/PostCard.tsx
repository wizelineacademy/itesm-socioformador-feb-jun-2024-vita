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
        <div className="flex justify-between">
            <Link href={`/profile/${post.creatorId}/posts`}>
                <div className="flex gap-3 items-center">
                    <Image
                        src={"/uploads/0390ed0f-4a61-4ef9-9b73-a3909855e48b-23.jpg"}
                        alt="profile photo"
                        width={50}
                        height={50}
                        className="rounded-full"
                    />
                    <div className="flex flex-col gap-1">
                        <p className="text-[14px] leading-[140%] font-semibold text-light-1">
                            {post.name}
                        </p>
                    </div>
                </div>
            </Link>
            {creator.length > 0 && post.creatorId === creator[0]?.idUser && (
                <Link href={`/edit-post/${post.idPost}`}>
                    <BorderColor sx={{ color: "white", cursor: "pointer" }} />
                </Link>
            )}

        </div>
        
        <p className="text-[18px] leading-[140%] font-medium text-light-1 max-sm:text-[14px]">
            {post.caption}
        </p>

        <Image
            src={post.postPhoto}
            alt="post photo"
            width={200}
            height={150}
            className="rounded-lg w-full"
        />

        <p className="text-[16px] leading-[140%] font-medium text-purple-1 max-sm:text-[12px]">
            {post.tag}
        </p>
        {/* <div className="flex justify-between">
            <div className="flex gap-2 items-center">
                <FavoriteBorder sx={{ color: "white", cursor: "pointer" }}  />
            </div>
        </div> */}
      
    </div>
  );
};

export default PostCard;
