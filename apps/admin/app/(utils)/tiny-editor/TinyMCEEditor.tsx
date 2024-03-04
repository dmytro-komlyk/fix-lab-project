import { Editor } from '@tinymce/tinymce-react'
import React, { useRef } from 'react'

interface TinyMCEEditorProps {
  id: string
  value: string
  onChange: (contentBlog: string) => void
  styles: {
    body: string
  }
}

const TinyMCEEditor: React.FC<TinyMCEEditorProps> = ({
  value,
  onChange,
  id,
  styles,
}) => {
  const editorRef = useRef(null) as any

  return (
    <Editor
      value={value}
      onEditorChange={onChange}
      onInit={editor => (editorRef.current = editor)}
      id={id}
      apiKey='9r20v2xm7wgvyig8pxzk65b9k7a6r2ntescpvmiqhdtidh5n'
      init={{
        language: 'uk',
        skin: 'oxide',
        theme: 'silver',
        menubar: false,
        plugins: [
          'advlist',
          'searchreplace',
          'link',
          'anchor',
          'autolink',
          'image',
          'insertdatetime',
          'table',
          'charmap',
          'fullscreen',
          'code',
          'media',
          'preview',
          'lists',
          'help',
          'wordcount',
          'visualblocks',
        ],
        toolbar:
          'cut copy paste pastetext | undo redo | searchreplace | selectall | link unlink anchor | ' +
          'image| table | hr| charmap  |fullscreen | code | preview print | ' +
          'bold italic underline strikethrough subscript superscript | removeformat |' +
          'numlist bullist | outdent indent | blockquote |alignleft aligncenter alignright alignjustify |' +
          'blocks fontfamily fontsize | forecolor backcolor|help |' +
          '',
        toolbar_mode: 'wrap',
        content_style: `body { ${styles.body} }`,
      }}
    />
  )
}

export default TinyMCEEditor
