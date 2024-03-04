import parse from 'html-react-parser'

interface IParserValueEditorProps {
  value: string | undefined
}

const ParserValueEditor = ({ value }: IParserValueEditorProps) => {
  return value && parse(value)
}

export default ParserValueEditor
