"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { UserPost } from "@/data/datatypes/user";
import {
  BorderColor,
  Delete,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";
import axios from "axios";

// Define the props interface
interface PostCardProps {
  post: Post;
  creator: UserPost[];
  onPostDelete: () => void; // Nueva prop para manejar la actualización del feed
}

const PostCard: React.FC<PostCardProps> = ({ post, creator, onPostDelete }) => {
  const profilePhoto = post.profilePhoto ?? "/assets/noAvatar.png";
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const router = useRouter();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = async () => {
    // Mostrar mensaje de confirmación
    const confirmationResult = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este recordatorio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    });
  
    // Si el usuario confirma la eliminación
    if (confirmationResult.isConfirmed) {
      try {
        const response = await axios.delete(`/api/post/${post.idPost}`);
        if (response.status === 200) {
          onPostDelete(); // Llama a la función pasada como prop para actualizar el feed
          Swal.fire({
            title: 'Éxito',
            text: 'El recordatorio ha sido eliminado exitosamente',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        } 

      } catch (error) {
        console.log(error);
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al eliminar el recordatorio',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };

  return (
    <div className="md:w-3/4 w-full rounded-lg flex flex-col gap-4 bg-dark-1 p-5 max-sm:gap-2">
      <div className="flex justify-between">
        <div>
          <Link href={`/social/profile/${post.creatorId}/publicaciones`}>
            <div className="flex gap-3 items-center">
              <Image
                src={profilePhoto}
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
        </div>

        <div>
          {creator.length > 0 && post.creatorId === creator[0]?.idUser && (
            <Link href={`/social/edit-post/${post.idPost}`}>
              <BorderColor
                sx={{ color: "white", cursor: "pointer", width: "30px", height: "30px" }}
              />
            </Link>
          )}
        </div>
      </div>

      <p className="text-[18px] leading-[140%] font-medium text-light-1 max-sm:text-[14px]">
        {post.caption}
      </p>

      <div className="relative cursor-pointer" onClick={openModal}>
        <Image
          src={post.postPhoto}
          alt="post photo"
          width={300}
          height={300}
          className="object-cover w-full h-64 rounded-lg"
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-dark-1 p-8 rounded-lg max-w-xs w-full max-h-full flex items-center justify-center">
            <button
              className="absolute top-2 right-2 text-white text-xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <div className="max-h-[60vh] max-w-[60vw] flex items-center justify-center overflow-auto">
              <Image
                src={post.postPhoto}
                alt="post photo"
                width={600}
                height={600}
                className="rounded-lg object-contain"
              />
            </div>
          </div>
        </div>
      )}

      <p className="text-[16px] leading-[140%] font-medium text-purple-1 max-sm:text-[12px]">
        {post.tag}
      </p>

      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          {/* {!isLiked ? (
            <FavoriteBorder sx={{ color: "white", cursor: "pointer" }} onClick={() => handleLike()} />
          ) : ( */}
          <Favorite sx={{ color: "red", cursor: "pointer" }} />
          {/* )} */}
          <p className="text-light-1">0 </p>
        </div>

        

        {creator.length > 0 && post.creatorId === creator[0]?.idUser && (
          <Delete sx={{ color: "white", cursor: "pointer" }} onClick={() => handleDelete()} />
        )}
      </div>
    </div>
  );
};

export default PostCard;
