import { PersonAddAlt, PersonRemove } from "@mui/icons-material";
import { UserPost } from "@/data/datatypes/user";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

interface UserCardProps {
    userData: UserPost;
    creator: UserPost[];
}

const UserCard: React.FC<UserCardProps> = ({ userData, creator }) => {
    const profilePhoto = userData.profilePhoto ?? "/assets/noAvatar.png";
    const [isFollowing, setIsFollowing] = useState(false);

    // Obtener el estado de seguimiento al cargar el componente
    useEffect(() => {
        const fetchFollowStatus = async () => {
            try {
                const response = await axios.get(`/api/user/follow/${userData.idUser}`);
                setIsFollowing(response.data.isFollowing);
            } catch (error) {
                console.error("Error fetching follow status:", error);
            }
        };

        fetchFollowStatus();
    }, [userData.idUser]); // Ejecutar solo cuando cambie el ID de usuario

    // Función para manejar el seguimiento
    const handleFollow = async () => {
        try {
            // Realizar la solicitud de seguimiento
            const response = await axios.post(`/api/user/follow/${userData.idUser}`);
            if (response.data.message === "User followed successfully") {
                setIsFollowing(true);
            } else if (response.data.message === "User unfollowed successfully") {
                setIsFollowing(false);
            }
        } catch (error) {
            console.error("Error toggling follow status:", error);
        }
    };

    return (
        <div className="flex justify-between items-center">
            <Link className="flex gap-4 items-center" href={`/social/profile/${userData.idUser}/publicaciones`}>
                <Image
                    src={profilePhoto}
                    alt="profile photo"
                    width={50}
                    height={50}
                    className="rounded-full"
                />
                <div className="flex flex-col gap-1">
                    <p className="text-[14px] leading-[140%] font-semibold text-light-1">
                        {userData.name}
                    </p>
                </div>
            </Link>
            {userData.idUser !== creator[0]?.idUser && (
                isFollowing ? (
                    <PersonRemove
                        sx={{ color: "#7857FF", cursor: "pointer" }}
                        onClick={handleFollow}
                    />
                ) : (
                    <PersonAddAlt
                        sx={{ color: "#7857FF", cursor: "pointer" }}
                        onClick={handleFollow}
                    />
                )
            )}
        </div>
    );
};

export default UserCard;
