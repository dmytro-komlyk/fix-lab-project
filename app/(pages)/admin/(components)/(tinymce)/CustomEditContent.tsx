'use client'

import React from 'react'

import TinyMCEEditor from './TinyMCEEditor'

interface EditBlogSectionProps {
  contentBlog: string
  setContentBlog: (editContent: string) => void
}
const CustomEditor: React.FC<EditBlogSectionProps> = ({
  contentBlog,
  setContentBlog,
}) => {
  const handleEditorChange = (newContent: string) => {
    setContentBlog(newContent)
  }

  return <TinyMCEEditor value={contentBlog} onChange={handleEditorChange} />
}

export default CustomEditor
