import MarkdownIt from 'markdown-it'

const customStyle = `
<style>
.markdown-content {
  color:#fff;
}

.markdown-content strong {
font-family: ['var(--font-exo-2)'];
font-size: 24px;
font-style: normal;
font-weight: 600;
line-height: normal;
}

.markdown-content p {
  font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 150%; 
}

.markdown-content a {
  text-decoration: none;
}

.markdown-content a:hover {
  text-decoration: underline;
}

.markdown-content ul, .markdown-content ol {
   list-style-type: disc;
  margin-left: 20px;
  font-size: 16px;
}

.markdown-content code {
  font-family: "Courier New", monospace;
  padding: 2px 4px;
}

.markdown-content blockquote {
  margin: 0;
  padding: 10px 20px;
}

.markdown-content table {
  border-collapse: collapse;
  width: 100%;
}

.markdown-content th, .markdown-content td {
  padding: 8px;
}

.markdown-content img {
  width: 100%;
  height: auto;
}



</style>
`

interface RenderMarkdownLightProps {
  markdown: string
}

const RenderMarkdownLight = ({ markdown }: RenderMarkdownLightProps) => {
  const renderMarkdown = new MarkdownIt({
    html: true,
  })

  return (
    <span
      className='markdown-content'
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: customStyle + renderMarkdown.render(markdown),
      }}
    />
  )
}

export default RenderMarkdownLight
