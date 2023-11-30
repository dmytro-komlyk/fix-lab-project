'use client'

import TinyMCEEditor from '@admin/app/(utils)/wysiwygEditor/TinyMCEEditor'
import React from 'react'

interface CustomEditorProps {
  id: string
  content: string
  setContent: (content: string) => void
}
const CustomEditor: React.FC<CustomEditorProps> = ({
  content,
  setContent,
  id,
}) => {
  const handleEditorChange = (newContent: string) => {
    setContent(newContent)
  }
  return <TinyMCEEditor id={id} value={content} onChange={handleEditorChange} />
}

export default CustomEditor
