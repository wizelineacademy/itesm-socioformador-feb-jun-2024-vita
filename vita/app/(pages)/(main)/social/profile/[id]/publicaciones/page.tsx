"use client";
import Loader from "@/components/Loader";
import PostCard from "@/components/post/PostCard";
import ProfileCard from "@/components/post/ProfileCard";
import { UserPost} from "@/data/datatypes/user"; // Importa los tipos correctos
import axios from "axios";
import { useEffect, useState } from "react";

const ProfilePosts = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [feedPost, setFeedPost] = useState<Post[]>([]);
  const [userProfile, setUserProfile] = useState<UserPost | null>(null);
  const [user, setUser] = useState<UserPost[]>([]);
  const [loading, setLoading] = useState(true);

  const getUserProfile = async () => {
    try {
      const response = await axios.get(`/api/profileSocial/${id}`);
      setUserProfile(response.data);
  
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  const getFeedPost = async () => {
    try {
      const response = await axios.get(`/api/profileSocial/post/${id}`);
      setFeedPost(response.data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get("/api/post/user");
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([getFeedPost(), getUser(), getUserProfile()]);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col gap-9">
      {userProfile && (
        <ProfileCard userData={userProfile} creator={user} activeTab="Publicaciones" />
      )}
      <div className="flex flex-col gap-9">
        {feedPost.map((post) => (
          <PostCard
            key={post.idPost}
            post={post}
            creator={user}
            onPostDelete={getFeedPost}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfilePosts;
