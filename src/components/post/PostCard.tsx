import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  BorderColor,
  Delete,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material'
import Swal from 'sweetalert2'
import axios from 'axios'
import { CommentSocial } from '@/src/data/datatypes/comment'
import { Post } from '@/src/data/datatypes/posts'
import { UserPost } from '@/src/data/datatypes/user'

interface PostCardProps {
  post: Post
  creator: UserPost[]
  onPostDelete: () => void
}

const PostCard: React.FC<PostCardProps> = ({ post, creator, onPostDelete }) => {
  const profilePhoto = post.profilePhoto ?? '/assets/noAvatar.png'
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState<CommentSocial[]>([])

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await axios.get(`/api/user/like/${post.idPost}`)
        setIsLiked(response.data?.isLiked ?? false)
        setLikeCount(response.data?.likeCount ?? 0)
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

  useEffect(() => {
    fetchComments()
  }, [post.idPost])

  const handleLike = async () => {
    try {
      const response = await axios.post(`/api/user/like/${post.idPost}`)
      if (response.data.message === 'Post liked successfully') {
        setIsLiked(true)
        setLikeCount((prevCount) => prevCount + 1)
      } else if (response.data.message === 'Post unliked successfully') {
        setIsLiked(false)
        setLikeCount((prevCount) => prevCount - 1)
      }
    } catch (error) {
      console.error('Error toggling like status:', error)
    }
  }

  const handleDelete = async () => {
    const confirmationResult = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este recordatorio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    })

    if (confirmationResult.isConfirmed) {
      try {
        const response = await axios.delete(`/api/post/${post.idPost}`)
        if (response.status === 200) {
          onPostDelete()
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
        const newComment = response.data
        setComments((prevComments) => [...prevComments, newComment])
        setCommentText('')
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
                data-testid='EditIcon'
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

      {post.postPhoto && (
        <button className='relative cursor-pointer' onClick={openModal}>
          <Image
            src={post.postPhoto}
            alt='post photo'
            width={300}
            height={300}
            className='h-64 w-full rounded-lg object-cover'
          />
        </button>
      )}

      {post.postPhoto && isModalOpen && (
        <div
          role='dialog'
          className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'
        >
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
              data-testid='FavoriteIcon'
              sx={{ color: 'red', cursor: 'pointer' }}
              onClick={handleLike}
            />
          ) : (
            <FavoriteBorder
              data-testid='FavoriteBorderIcon'
              sx={{ color: 'white', cursor: 'pointer' }}
              onClick={handleLike}
            />
          )}
          <p className='text-light-1'>{likeCount}</p>
        </div>

        {creator.length > 0 && post.creatorId === creator[0]?.idUser && (
          <Delete
            data-testid='DeleteIcon'
            sx={{ color: 'white', cursor: 'pointer' }}
            onClick={() => handleDelete()}
          />
        )}
      </div>

      <div className='mt-8'>
        <h2 className='mb-4 text-lg font-semibold text-light-1'>Comentarios</h2>
        <div className='space-y-4'>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.idComment}
                className='flex items-start space-x-4'
              >
                <Image
                  src={comment.profilePhoto ?? '/assets/noAvatar.png'}
                  alt='User Avatar'
                  className='h-10 w-10 rounded-full'
                  width={50}
                  height={50}
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
            ))
          ) : (
            <p>No hay comentarios</p>
          )}
        </div>

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
