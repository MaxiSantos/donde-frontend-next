import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("logging handlerrrrr");
  const cookieParsed = cookie.parse(req.body);
  //console.log({ cookieParsed })
  console.log(req?.body)
  res.status(200).json({
    body: cookieParsed,
    query: req.query,
    cookies: req.cookies,
  });
}
