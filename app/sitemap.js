const { NEXT_APP_BASE_URL } = process.env;
export default function sitemap() {
  return [
    {
      url: `${NEXT_APP_BASE_URL}`,
      lastModified: new Date(),
    },
    {
      url: `${NEXT_APP_BASE_URL}/repair`,
      lastModified: new Date(),
    },
    {
      url: `${NEXT_APP_BASE_URL}/business`,
      lastModified: new Date(),
    },
    {
      url: `${NEXT_APP_BASE_URL}/blog`,
      lastModified: new Date(),
    },
    {
      url: `${NEXT_APP_BASE_URL}/contacts`,
      lastModified: new Date(),
    },
  ];
}
