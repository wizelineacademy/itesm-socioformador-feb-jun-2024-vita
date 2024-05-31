import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { UserPost } from '@/src/data/datatypes/user'
import {
  BorderColor,
  Delete,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material'
import Swal from 'sweetalert2'
import axios from 'axios'
import { CommentSocial } from '@/src/data/datatypes/comment'

// Define the props interface
interface PostCardProps {
  post: Post
  creator: UserPost[]
  onPostDelete: () => void // Nueva prop para manejar la actualización del feed
}

const PostCard: React.FC<PostCardProps> = ({ post, creator, onPostDelete }) => {
  const profilePhoto = post.profilePhoto ?? '/assets/noAvatar.png'
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false) // New state for like status
  const [likeCount, setLikeCount] = useState(0) // New state for like count
  const [commentText, setCommentText] = useState('') // State for comment text
  const [comments, setComments] = useState<CommentSocial[]>([])

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  // Fetch like status and count when component mounts
  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await axios.get(`/api/user/like/${post.idPost}`)
        setIsLiked(response.data.isLiked)
        setLikeCount(response.data.likeCount) // Assuming like count is returned
      } catch (error) {
        console.error('Error fetching like status:', error)
      }
    }

    fetchLikeStatus()
  }, [post.idPost])

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/post/comment/${post.idPost}`)
      if (response.data && response.data.comments) {
        const commentsData = response.data.comments
        // Convierte el objeto de comentarios en un array
        const commentsArray = Object.keys(commentsData).map(
          (key) => commentsData[key],
        )
        setComments(commentsArray)
      } else {
        console.error('Response data does not contain comments:', response.data)
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }
  // Fetch comments when component mounts
  useEffect(() => {
    fetchComments()
  }, [post.idPost])

  const handleLike = async () => {
    try {
      const response = await axios.post(`/api/user/like/${post.idPost}`)
      if (response.data.message === 'Post liked successfully') {
        setIsLiked(true)
        setLikeCount((prevCount) => prevCount + 1) // Increment like count
      } else if (response.data.message === 'Post unliked successfully') {
        setIsLiked(false)
        setLikeCount((prevCount) => prevCount - 1) // Decrement like count
      }
    } catch (error) {
      console.error('Error toggling like status:', error)
    }
  }

  const handleDelete = async () => {
    // Mostrar mensaje de confirmación
    const confirmationResult = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este recordatorio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    })

    // Si el usuario confirma la eliminación
    if (confirmationResult.isConfirmed) {
      try {
        const response = await axios.delete(`/api/post/${post.idPost}`)
        if (response.status === 200) {
          onPostDelete() // Llama a la función pasada como prop para actualizar el feed
          Swal.fire({
            title: 'Éxito',
            text: 'El recordatorio ha sido eliminado exitosamente',
            icon: 'success',
            confirmButtonText: 'OK',
          })
        }
      } catch (error) {
        console.log(error)
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al eliminar el recordatorio',
          icon: 'error',
          confirmButtonText: 'OK',
        })
      }
    }
  }

  const handleAddComment = async () => {
    if (commentText.trim() === '') return
    try {
      const response = await axios.post(`/api/post/comment/${post.idPost}`, {
        content: commentText,
      })
      if (response.status === 200) {
        // Si la solicitud es exitosa, actualiza el estado de los comentarios
        const newComment = response.data
        setComments((prevComments) => [...prevComments, newComment])
        setCommentText('') // Limpia el campo del comentario
        fetchComments()
      }
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  return (
    <div className='flex w-full flex-col gap-4 rounded-lg bg-dark-1 p-5 max-sm:gap-2 md:w-3/4'>
      <div className='flex justify-between'>
        <div>
          <Link href={`/social/profile/${post.creatorId}/publicaciones`}>
            <div className='flex items-center gap-3'>
              <Image
                src={profilePhoto}
                alt='profile photo'
                width={50}
                height={50}
                className='rounded-full'
              />
              <div className='flex flex-col gap-1'>
                <p className='text-[14px] font-semibold leading-[140%] text-light-1'>
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
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  width: '30px',
                  height: '30px',
                }}
              />
            </Link>
          )}
        </div>
      </div>

      <p className='text-[18px] font-medium leading-[140%] text-light-1 max-sm:text-[14px]'>
        {post.caption}
      </p>

      <div className='relative cursor-pointer' onClick={openModal}>
        <Image
          src={post.postPhoto}
          alt='post photo'
          width={300}
          height={300}
          className='h-64 w-full rounded-lg object-cover'
        />
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'>
          <div className='relative flex max-h-full w-full max-w-xs items-center justify-center rounded-lg bg-dark-1 p-8'>
            <button
              className='absolute right-2 top-2 text-xl text-white'
              onClick={closeModal}
            >
              &times;
            </button>
            <div className='flex max-h-[60vh] max-w-[60vw] items-center justify-center overflow-auto'>
              <Image
                src={post.postPhoto}
                alt='post photo'
                width={600}
                height={600}
                className='rounded-lg object-contain'
              />
            </div>
          </div>
        </div>
      )}

      <p className='text-[16px] font-medium leading-[140%] text-purple-1 max-sm:text-[12px]'>
        {post.tag}
      </p>

      <div className='flex justify-between'>
        <div className='flex items-center gap-2'>
          {isLiked ? (
            <Favorite
              sx={{ color: 'red', cursor: 'pointer' }}
              onClick={handleLike}
            />
          ) : (
            <FavoriteBorder
              sx={{ color: 'white', cursor: 'pointer' }}
              onClick={handleLike}
            />
          )}
          <p className='text-light-1'>{likeCount}</p>
        </div>

        {creator.length > 0 && post.creatorId === creator[0]?.idUser && (
          <Delete
            sx={{ color: 'white', cursor: 'pointer' }}
            onClick={() => handleDelete()}
          />
        )}
      </div>

      {/* Sección de comentarios */}
      <div className='mt-8'>
        <h2 className='mb-4 text-lg font-semibold text-light-1'>Comentarios</h2>
        <div className='space-y-4'>
          {Array.isArray(comments) &&
            comments.map((comment) => (
              <div
                key={comment.idComment}
                className='flex items-start space-x-4'
              >
                <img
                  src={comment.profilePhoto ?? '/assets/noAvatar.png'}
                  alt='User Avatar'
                  className='h-10 w-10 rounded-full'
                />
                <div>
                  <p className='pb-2 font-semibold text-light-1'>
                    {comment.name}
                  </p>
                  <p className='rounded-lg bg-gray-200 p-2'>
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
        </div>

        {/* Formulario para agregar comentarios */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleAddComment()
          }}
          className='mt-4'
        >
          <input
            type='text'
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder='Escribe un comentario...'
            className='w-full rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none'
          />
          <button
            type='submit'
            className='mt-2 rounded-md bg-purple-500 px-4 py-2 text-white focus:outline-none'
          >
            Comentar
          </button>
        </form>
      </div>
    </div>
  )
}

export default PostCard
