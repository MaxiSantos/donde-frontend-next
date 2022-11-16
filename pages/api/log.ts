import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("logging handler")
  console.log(req?.body)
  res.status(200).json({
    body: req.body,
    query: req.query,
    cookies: req.cookies,
  });
}
