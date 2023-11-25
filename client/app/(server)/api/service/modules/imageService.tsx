import type { Multer } from 'multer'

export interface IImage {
  _id: string
  file: Multer
  src: string
  alt: string
  type: string
}
