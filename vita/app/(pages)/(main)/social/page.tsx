"use client"
import Loader from "@/components/Loader";
import PostCard from "@/components/post/PostCard";
import { UserPost } from "@/data/datatypes/user";
import axios from "axios";
import { useEffect, useState } from "react";

const Social = () => {
  const [feedPost, setFeedPost] = useState<Post[]>([]);
  const [user, setUser] = useState<UserPost[]>([]);
  const [loading, setLoading] = useState(true);

  const getFeedPost = async () => {
    try {
      const response = await axios.get("/api/post");
      setFeedPost(response.data); 
      console.log(response.data)
      alert(response.data)
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get("/api/post/user");
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeedPost();
    getUser();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col gap-10">
      {feedPost.map((post) => (
        <PostCard 
          key={post.idPost}
          post={post}
          creator={user}
        /> 
      ))}
    </div>
  );
};

export default Social;
