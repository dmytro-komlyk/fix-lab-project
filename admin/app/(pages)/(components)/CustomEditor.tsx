'use client'

import React from 'react'

import TinyMCEEditor from '@/app/(utils)/wysiwygEditor/TinyMCEEditor'

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
