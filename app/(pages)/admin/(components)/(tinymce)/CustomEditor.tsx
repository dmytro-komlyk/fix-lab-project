'use client'

import React from 'react'

import TinyMCEEditor from './TinyMCEEditor'

interface CustomEditorProps {
  contentBlog: string
  setContentBlog: (contentBlog: string) => void
}
const CustomEditor: React.FC<CustomEditorProps> = ({
  contentBlog,
  setContentBlog,
}) => {
  const handleEditorChange = (newContent: string) => {
    setContentBlog(newContent)
  }

  return <TinyMCEEditor value={contentBlog} onChange={handleEditorChange} />
}

export default CustomEditor
