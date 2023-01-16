const dnsPromises = require("dns").promises;

import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    try {
      const mxResult = await dnsPromises.resolveMx(req.body.domain);

      res.status(200).json(mxResult);
    } catch (error) {
      res.status(404).json({ error: "Invalid Domain" });
    }
  } else {
    res.status(401).json({ error: "You're not authenticated to do this." });
  }
}
