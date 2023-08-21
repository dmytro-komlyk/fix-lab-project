import TinyMCEEditorAdd from './TinyMCEEditorAdd'

interface CustomAddContentProps {
  contentBlog: string
  setContent: (editContent: string) => void
}

const CustomAddContent: React.FC<CustomAddContentProps> = ({
  contentBlog,
  setContent,
}) => {
  const handleEditorChange = (newContent: string) => {
    setContent(newContent)
  }

  return <TinyMCEEditorAdd value={contentBlog} onChange={handleEditorChange} />
}

export default CustomAddContent
