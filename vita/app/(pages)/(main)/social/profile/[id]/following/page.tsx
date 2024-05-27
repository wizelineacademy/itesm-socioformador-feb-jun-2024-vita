"use client";
import Loader from "@/components/Loader";
import ProfileCard from "@/components/post/ProfileCard";
import UserCard from "@/components/post/UserCard";
import { UserPost, Follower} from "@/data/datatypes/user"; 
import axios from "axios";
import { useEffect, useState } from "react";

const ProfilePosts = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [userFollowing, setUserFollowing] = useState<Follower[]>([]);
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

  const getUserFollowing = async () => {
    try {
      
      const response = await axios.get(`/api/user/following/${id}`);
      setUserFollowing(response.data);
  
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
      await Promise.all([getUserFollowing(), getUser(), getUserProfile()]);
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
        {userFollowing.map((userFollowing) => (
          <UserCard 
          key={userFollowing.idUser}
          userData={userFollowing}
          creator={user}
        />
        ))}
      </div>
    </div>
  );
};

export default ProfilePosts;
