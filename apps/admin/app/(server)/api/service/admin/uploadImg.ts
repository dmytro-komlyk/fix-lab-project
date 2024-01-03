import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { getSession } from 'next-auth/react'

interface UploadFileParams {
  fileInput: File
  alt: string
  type: string
}
const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL as string
const uploadImg = async ({ fileInput, alt, type }: UploadFileParams) => {
  const url = `${apiUrl}/images/upload-${type}`
  const session = await getSession()

  if (session?.user.token === undefined) {
    throw new Error('Headers are undefined')
  }

  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTg5OTBlZmFjNWRmNjcwNjU5YTA1MzgiLCJpYXQiOjE3MDM2ODg2MTl9.3C_gHBI41slAP7GDXs74Rw1NLNOrDF6vv9s2NyCLTY8`,
    },
  }

  if (!fileInput) {
    throw new Error('No file')
  }

  const formData = new FormData()
  formData.append('file', fileInput)
  formData.append('alt', alt)
  formData.append('type', type)

  try {
    const response = await axios.post(url, formData, config)
    return response
  } catch (error) {
    console.log(error)
    throw new Error('Error uploading image')
  }
}

export default uploadImg
