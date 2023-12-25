import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

interface UploadFileParams {
  fileInput: File
  alt: string
  type: string
}
const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL as string
const uploadImg = async ({ fileInput, alt, type }: UploadFileParams) => {
  const url = `${apiUrl}/images/upload-${type}`
  // const session = await getSession()

  // if (session?.user.token === undefined) {
  //   throw new Error('Headers are undefined')
  // }

  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTg5ODE2YjNiNzk3OGQ1MmNhMThkNmYiLCJpYXQiOjE3MDM1MTAzODJ9.oSu2p7ehVxcORXEKkZ-oU64nDDi7u5pNB7A9AU_PvFY`,
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
