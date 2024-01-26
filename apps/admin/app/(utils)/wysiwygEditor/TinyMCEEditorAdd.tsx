/* eslint-disable no-multi-str */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Editor } from '@tinymce/tinymce-react'

interface TinyMCEEditorAddProps {
  value: string
  onChange: (contentBlog: string) => void
  id: string
}

const TinyMCEEditorAdd: React.FC<TinyMCEEditorAddProps> = ({
  value,
  onChange,
  id,
}) => {
  return (
    <Editor
      value={value}
      onEditorChange={onChange}
      id={id}
      apiKey='hw5vdm4narvqegl42egpgk1ld9n2tkjarnwjf85dwh65u5ew'
      init={{
        language: 'uk',
        skin: 'oxide',
        theme: 'silver',
        menubar: true,
        extended_valid_elements: 'span, img, small',
        forced_root_block: 'div',
        convert_urls: false,
        entity_encoding: 'raw',
        plugins:
          'advlist autolink lists link image charmap preview anchor \
                        searchreplace visualblocks code fullscreen table emoticons nonbreaking \
                        insertdatetime media table code help wordcount',
        toolbar:
          'undo redo | styles | bold italic forecolor backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        media table emoticons visualblocks code|\
                        nonbreaking bullist numlist outdent indent | removeformat | help',
        style_formats: [
          {
            title: 'Headings',
            items: [
              { title: 'h1', block: 'h1' },
              { title: 'h2', block: 'h2' },
              { title: 'h3', block: 'h3' },
              { title: 'h4', block: 'h4' },
              { title: 'h5', block: 'h5' },
              { title: 'h6', block: 'h6' },
            ],
          },

          {
            title: 'Text',
            items: [
              { title: 'Paragraph', block: 'p' },
              {
                title: 'Paragraph with small letters',
                block: 'small',
              },
            ],
          },
        ],
      }}
    />
  )
}

export default TinyMCEEditorAdd
