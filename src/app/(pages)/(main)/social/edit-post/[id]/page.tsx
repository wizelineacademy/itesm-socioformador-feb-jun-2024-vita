'use client'

import Loader from '@/src/components/Loader'
import Posting from '@/src/components/form/Posting'
import axios from 'axios'
import { useEffect, useState } from 'react'

interface PostData {
  creatorId: string
  caption: string
  tag: string
  postPhoto: string
}

const EditPost = ({ params }: { params: { id: string } }) => {
  const id = params.id

  const [loading, setLoading] = useState(true)
  const [postData, setPostData] = useState<PostData>({
    creatorId: '',
    caption: '',
    tag: '',
    postPhoto: '',
  })

  const getPost = async () => {
    try {
      const response = await axios.get(`/api/post/${id}`)
      setPostData(response.data[0]) // Asegúrate de que response.data[0] es del tipo PostData
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch post:', error)
    }
  }

  useEffect(() => {
    getPost()
  }, [])

  const postInfo = {
    caption: postData.caption,
    tag: postData.tag,
    postPhoto: postData.postPhoto,
  }

  return loading ? (
    <Loader />
  ) : (
    <div className='pt-6'>
      <Posting post={postInfo} apiEndpoint={`/api/post/${id}`} />
    </div>
  )
}

export default EditPost
