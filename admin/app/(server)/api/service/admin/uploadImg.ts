import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

interface UploadFileParams {
  fileInput: File
  alt: string
  type: string
}

const uploadImg = async ({ fileInput, alt, type }: UploadFileParams) => {
  const url = `http://95.217.34.212:30000/api/images/upload-${type}`
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTAyZGFiNDVkZGY4ZjJiMDY1YzQwMjEiLCJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNjk0Njg1OTQ0fQ.I0LLv5ihAY4OxR-h4RDfboVEO08pHrr3uUilr91poek`,
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

export default uploadImg
