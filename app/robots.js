const { NEXT_APP_BASE_URL } = process.env;
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${NEXT_APP_BASE_URL}/sitemap.xml`,
  };
}
