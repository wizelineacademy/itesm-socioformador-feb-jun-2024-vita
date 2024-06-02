import axios from 'axios'

export async function handler() {
  try {
    await axios.post(`https://d8vd0r6uuds8z.cloudfront.net/api/blog`, {})
    console.log('Blog creado con éxito')
  } catch (error) {
    console.log(error)
  }
}
