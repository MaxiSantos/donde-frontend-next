import { NextApiRequest, NextApiResponse } from 'next';
/*
 * https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for secret to confirm this is a valid request
  if (req.method === 'POST') {
    const { token, path } = req.headers;
    if (token !== process.env.VERCEL_API_TOKEN) {
      // TODO: we should log this somewhere
      return res.status(401).json({ message: "Invalid token" })
    }
    try {
      // this should be the actual path not a rewritten path
      // e.g. for "/blog/[slug]" this should be "/blog/post-1"
      await res.revalidate(path as string)
      console.log("revalidation went ok: ", path)
      return res.json({ revalidated: true })
    } catch (err) {
      // If there was an error, Next.js will continue
      // to show the last successfully generated page
      console.log(err)
      return res.status(500).send('Error revalidating')
    }
  }
}
