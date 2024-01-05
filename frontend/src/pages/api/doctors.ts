import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.status(200).json([
    { id: 1, firstName: "JAN", lastName: "PAWEŁ 2" },
    { id: 2, firstName: "JAN", lastName: "PAWEŁ 3"},
  ]);
}
