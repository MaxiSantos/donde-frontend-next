import { runCors } from 'app/common/lib/api/helper';
import { getPaths } from 'app/common/lib/revalidate';
import { NextApiRequest, NextApiResponse } from 'next';

/*
 * https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // TODO: must test if this work in middleware. Maybe do something like if route.startsWith("/api") then ...
  await runCors(req, res)
  if (req.method === 'POST') {
    const { token } = req.headers;
    const { routeToRevalidate, id } = req.body;
    console.log({ routeToRevalidate })
    console.log({ id })
    console.log({ token })
    // Check for secret to confirm this is a valid request
    if (token === process.env.VERCEL_API_TOKEN) {
      try {
        const pathsToRevalite = await getPaths(routeToRevalidate, id);
        console.log({ pathsToRevalite })
        const apiCall = await Promise.all(pathsToRevalite.map(path => {
          return res.revalidate(path as string)
        }));
        apiCall.forEach((data, i) => {
          console.log("revalidation went ok: ", pathsToRevalite[i])
        });
        return res.json({ revalidated: true })
      } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        console.log(err)
        return res.status(500).send('Error revalidating: '+err)
      }
    } else {
      console.log("Invalid token")
      return res.status(401).json({ message: "Invalid token" })
    }
  }
}
