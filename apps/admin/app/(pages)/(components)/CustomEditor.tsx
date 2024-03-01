'use client'

import TinyMCEEditor from '@admin/app/(utils)/tiny-editor/TinyMCEEditor'
import { Field } from 'formik'
import React from 'react'

interface CustomEditorProps {
  id: string
  name: string
  styles: {
    body: string
  }
}
const CustomEditor: React.FC<CustomEditorProps> = ({ id, name, styles }) => {
  const handleEditorChange = (newContent: string, setFieldValue: any) => {
    setFieldValue(name, newContent)
  }

  return (
    <Field name={name}>
      {({ field, form, meta }: any) => {
        const { setFieldValue } = form
        return (
          <>
            <div
              className={`${meta.error ? '[&>.tox-tinymce]:border-danger' : ''}`}
            >
              <TinyMCEEditor
                id={id}
                value={field.value}
                onChange={newContent =>
                  handleEditorChange(newContent, setFieldValue)
                }
                styles={styles}
              />
            </div>
            <span className='text-danger'>{meta.error}</span>
          </>
        )
      }}
    </Field>
  )
}

export default CustomEditor
