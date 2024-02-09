import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { getSession } from 'next-auth/react'

interface UploadFileParams {
  fileInput: File
  alt: string
  type: string
}
const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL as string

const uploadImg = async ({ fileInput, alt, type }: UploadFileParams) => {
  const url = `${apiUrl}/images/upload-${type}`
  const session = await getSession()

  if (session?.user?.accessToken === undefined) {
    throw new Error('Headers are undefined')
  }

  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${session?.user.accessToken}`,
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
    throw new Error('Error uploading image')
  }
}

export { uploadImg }
