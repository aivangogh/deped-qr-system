import { NextApiRequest, NextApiResponse } from "next";

export default async function methodNaHandler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(405).json({ message: "Method Not Allowed" });
}