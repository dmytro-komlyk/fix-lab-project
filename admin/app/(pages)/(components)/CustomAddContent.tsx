import TinyMCEEditorAdd from '@/app/(utils)/wysiwygEditor/TinyMCEEditorAdd'

interface CustomAddContentProps {
  content: string
  setContent: (editContent: string) => void
  id: string
}

const CustomAddContent: React.FC<CustomAddContentProps> = ({
  content,
  setContent,
  id,
}) => {
  const handleEditorChange = (newContent: string) => {
    setContent(newContent)
  }

  return (
    <TinyMCEEditorAdd id={id} value={content} onChange={handleEditorChange} />
  )
}

export default CustomAddContent
