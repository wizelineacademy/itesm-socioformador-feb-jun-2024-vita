"use client";
import Image from "next/image";
import Link from "next/link"; 
import { UserPost} from "@/data/datatypes/user";
import { tabs } from "@/constants";

interface UserCardProps {
  userData: UserPost;
  creator: UserPost[];
  activeTab: String;
}

const ProfileCard: React.FC<UserCardProps> = ({ userData,creator,  activeTab  }) => {
  const profilePhoto = userData[0].profilePhoto ?? "/assets/noAvatar.png";
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
                <p className="text-purple-1">0</p>
                <p className="text-light-1">Publicaciones</p>
              </div>
              <div className="flex max-sm:flex-col gap-2 items-center max-sm:gap-0.5">
                <p className="text-purple-1">0</p>
                <p className="text-light-1">Seguidores</p>
              </div>
              <div className="flex max-sm:flex-col gap-2 items-center max-sm:gap-0.5">
                <p className="text-purple-1">0</p>
                <p className="text-light-1">Siguiendo</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {tabs.map((tab) => (
          <Link
            key={userData.idUser}
            className={`tab ${
              activeTab === tab.name ? "bg-purple-1 p-2 text-light-1" : "bg-dark-2 p-2 text-light-1"
            }`}
            href={`/profile/${userData.idUser}/${tab.link}`}
          >
            {tab.name}
          </Link>
        ))}
      </div>
        
    </div>
  );
};

export default ProfileCard;
