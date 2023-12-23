import type { IBrand } from './brandService'
import type { IImage } from './imageService'
import type { IIssue } from './issueService'

export interface IGadget {
  id: string
  slug: string
  isActive: boolean
  title: string
  description: string
  icon: IImage
  gallery: IImage[]
  metadata: {
    title: string
    description: string
    keywords: string
  }
  brands: IBrand[]
  issues: IIssue[]
}
