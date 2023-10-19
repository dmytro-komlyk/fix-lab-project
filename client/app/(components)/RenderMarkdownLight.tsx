import MarkdownIt from 'markdown-it'

const customStyle = `
<style>
.markdown-content-light {
  color:#fff;
}

.markdown-content-light strong {
font-family: ['var(--font-exo-2)'];
font-size: 24px;
font-style: normal;
font-weight: 600;
line-height: normal;
}

.markdown-content-light p {
  font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 150%; 
}

.markdown-content-light a {
  text-decoration: none;
}

.markdown-content-light a:hover {
  text-decoration: underline;
}

.markdown-content-light ul, .markdown-content-light ol {
   list-style-type: disc;
  margin-left: 20px;
  font-size: 16px;
}

.markdown-content-light code {
  font-family: "Courier New", monospace;
  padding: 2px 4px;
}

.markdown-content-light blockquote {
  margin: 0;
  padding: 10px 20px;
}

.markdown-content-light table {
  border-collapse: collapse;
  width: 100%;
}

.markdown-content-light th, .markdown-content-light td {
  padding: 8px;
}

.markdown-content-light img {
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
      className='markdown-content-light'
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: customStyle + renderMarkdown.render(markdown),
      }}
    />
  )
}

export default RenderMarkdownLight
