'use client'

import Loader from '@/src/components/Loader'
import Posting from '@/src/components/form/Posting'
import axios from 'axios'
import { useEffect, useState } from 'react'

const EditPost = ({ params }: { params: { id: string } }) => {
  const id = params.id

  const [loading, setLoading] = useState(true)
  const [postData, setPostData] = useState<any>({
    creatorId: undefined,
    caption: undefined,
    tag: undefined,
    postPhoto: undefined,
  })

  const getPost = async () => {
    try {
      const response = await axios.get(`/api/post/${id}`)
      setPostData(response.data[0]) // Suponiendo que solo obtienes un único objeto de la API
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch post:', error)
    }
  }

  useEffect(() => {
    getPost()
  }, [])

  const postInfo = {
    caption: postData?.caption,
    tag: postData?.tag,
    postPhoto: postData?.postPhoto,
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
