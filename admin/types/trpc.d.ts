interface Metadata {
  description: string
  keywords: string
  title: string
}

interface ImagesFile {
  destination: string
  encoding: string
  fieldname: string
  filename: string
  mimetype: string
  originalname: string
  path: string
  size: number
}

interface Article {
  id: string
  image: Image
  image_id: string
  isActive: boolean
  metadata: Metadata
  preview: string
  slug: string
  text: string
  title: string
  createdAt: Date
  updatedAt: Date
}

interface Benefit {
  id: string
  icon: Image
  icon_id: string
  title: string
  isActive: boolean
  issues: Issue[]
  issues_ids: string[]
}

interface Brand {
  id: string
  article: string
  icon: Image
  icon_id: string
  isActive: boolean
  metadata: Metadata
  slug: string
  title: string
  gadgets: Gadget[]
  gadgets_ids: string[]
}

interface Contact {
  id: string
  address: string
  area: string
  comment?: string
  googleMapLink: string
  googlePluginLink: string
  image: Image
  image_id: string
  isActive: boolean
  phones: string[]
  subways: string[]
  workingDate: string
  workingTime: string
}

interface Gadget {
  id: string
  slug: string
  title: string
  description: string
  icon: Image
  icon_id: string
  brands: Brand[]
  brands_ids: string[]
  gallery: Image[]
  gallery_ids: string[]
  issues: Issue[]
  issues_ids: string[]
  metadata: Metadata
  isActive: boolean
}

interface Issue {
  id: string
  slug: string
  title: string
  description: string
  info: string
  price: string
  image: Image
  image_id: string
  benefits: Benefit[]
  benefits_ids: string[]
  metadata: Metadata
  isActive: boolean
  gadgets: Gadget[]
  gadgets_ids: string[]
}

interface Image {
  id: string
  alt: string
  file: ImagesFile
  type: string
  gadget_gallery: Gadget[]
  gadget_gallery_ids: string[]
  gadget_icon: Gadget[]
  issue_image: Issue[]
  contact_image: Contact[]
  brand_icon: Brand[]
  benefit_icon: Benefit[]
  article_image: Article[]
}

interface User {
  id: string
  email: string
  login: string
  name: string
  password: string
  isActive: boolean
}
