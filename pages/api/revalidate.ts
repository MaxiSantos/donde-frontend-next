import { locales } from 'app/shared/config/translationsLocales';
import { NextApiRequest, NextApiResponse } from 'next';
import { getHook } from "react-hooks-outside";
/*
 * https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation
 */
const t = getHook("translation");
const getRoute = (route) => {
  return route;
}

const getPaths = (route, slug) => {
  return locales.map(lang => {
    return `/${lang}/${getRoute(route)}/${slug}`;
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for secret to confirm this is a valid request
  if (req.method === 'POST') {
    const { token, route, slug } = req.headers;
    if (token === process.env.VERCEL_API_TOKEN) {
      // TODO: we should log this somewhere
      try {
        // this should be the actual path not a rewritten path
        // e.g. for "/blog/[slug]" this should be "/blog/post-1"
        const paths = getPaths(route, slug);
        const apiCall = await Promise.all(paths.map(path => {
          return res.revalidate(path as string)
        }));
        apiCall.forEach((data, i) => {
          console.log("revalidation went ok: ", paths[i])
        });
        //await res.revalidate(path as string)

        return res.json({ revalidated: true })
      } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        console.log(err)
        return res.status(500).send('Error revalidating')
      }
    } else {
      return res.status(401).json({ message: "Invalid token" })
    }
  }
}
