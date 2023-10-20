import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.query.secret !== 'fixlab') {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    const path = req.query.pars as string

    await res.revalidate(path)

    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}
