import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import PostCard from './PostCard'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Post } from '@/src/data/datatypes/posts'
import { UserPost } from '@/src/data/datatypes/user'
import { CommentSocial } from '@/src/data/datatypes/comment'

vi.mock('axios')
vi.mock('sweetalert2')

const mockPost: Post = {
  idPost: 1,
  creatorId: 123,
  profilePhoto: undefined, // Cambiado a undefined
  name: 'Test User',
  caption: 'This is a test caption',
  postPhoto: '/path/to/photo.jpg',
  tag: 'test tag',
  createdAt: '2024-01-01T00:00:00Z',
}

const mockCreator: UserPost[] = [
  {
    idUser: 123,
    name: 'Test Creator',
    email: '',
    createdAt: '',
  },
]

const mockComments: CommentSocial[] = [
  {
    idComment: 1,
    profilePhoto: undefined, // Cambiado a undefined
    name: 'Commenter One',
    content: 'This is a test comment',
    postId: 0,
    userId: 0,
  },
]

describe('PostCard Component', () => {
  beforeEach(() => {
    vi.spyOn(axios, 'get').mockImplementation((url) => {
      if (url.includes('/api/user/like/')) {
        return Promise.resolve({ data: { isLiked: false, likeCount: 10 } })
      } else if (url.includes('/api/post/comment/')) {
        return Promise.resolve({ data: { comments: mockComments } })
      }
      return Promise.reject(new Error('not found'))
    })
    vi.spyOn(axios, 'post').mockImplementation(() =>
      Promise.resolve({ status: 200, data: {} }),
    )
    vi.spyOn(axios, 'delete').mockImplementation(() =>
      Promise.resolve({ status: 200 }),
    )

    vi.spyOn(Swal, 'fire').mockResolvedValue({
      isConfirmed: true,
      isDenied: false,
      isDismissed: false,
    }) // Simula la confirmación de SweetAlert
  })

  const defaultProps = {
    post: mockPost,
    creator: mockCreator,
    onPostDelete: vi.fn(),
  }

  it('renders the PostCard component', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<PostCard {...defaultProps} />)
    })
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('This is a test caption')).toBeInTheDocument()
    expect(screen.getByText('test tag')).toBeInTheDocument()
  })

  it('displays the default profile photo if none is provided', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<PostCard {...defaultProps} />)
    })
    const profilePhoto = screen.getByAltText(
      'profile photo',
    ) as HTMLImageElement
    expect(profilePhoto.src).toContain(
      '/_next/image?url=%2Fassets%2FnoAvatar.png',
    )
  })

  it('handles like button click', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<PostCard {...defaultProps} />)
    })
    const likeButton = screen.getByTestId('FavoriteBorderIcon') // Usa el data-testid
    fireEvent.click(likeButton)
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `/api/user/like/${mockPost.idPost}`,
      )
    })
  })

  it('opens and closes the modal when the post photo is clicked', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<PostCard {...defaultProps} />)
    })
    const postPhoto = screen.getByAltText('post photo')
    fireEvent.click(postPhoto)
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    const closeButton = screen.getByText('×')
    fireEvent.click(closeButton)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('handles adding a comment', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<PostCard {...defaultProps} />)
    })
    const commentInput = screen.getByPlaceholderText('Escribe un comentario...')
    const commentButton = screen.getByRole('button', { name: /comentar/i })

    fireEvent.change(commentInput, { target: { value: 'New Comment' } })
    fireEvent.click(commentButton)

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `/api/post/comment/${mockPost.idPost}`,
        { content: 'New Comment' },
      )
    })
  })

  it('calls onPostDelete when the delete button is clicked', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<PostCard {...defaultProps} />)
    })
    const deleteButton = screen.getByTestId('DeleteIcon') // Usa el data-testid
    fireEvent.click(deleteButton)
    await waitFor(() => {
      expect(defaultProps.onPostDelete).toHaveBeenCalled()
    })
  })
})
