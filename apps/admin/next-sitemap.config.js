/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL, // FIXME: Change to the production URL
  generateRobotsTxt: false,
  output: 'export',
}
