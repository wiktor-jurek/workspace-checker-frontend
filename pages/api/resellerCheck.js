const { google } = require("googleapis");
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

const credentials = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
};

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    // Set up google auth usig JWT.
    const auth = new google.auth.GoogleAuth({
      scopes: "https://www.googleapis.com/auth/apps.order.readonly",
      clientOptions: {
        subject: "wiktor@cobry.uk",
      },
      credentials: credentials,
    });
    const client = await auth.getClient();

    const reseller = google.reseller({
      version: "v1",
      auth: client,
    });

    const domain = req.body.domain;
    try {
      const response = await reseller.customers.get({
        customerId: `${domain}`,
      });
      if (response.status == 200) {
        res.status(200).json(response.data);
      } else res.status(404).json({ error: "Not Found" });
    } catch (error) {
      res.status(404).json({ error: "Not Found" });
    }
  } else {
    res.status(401).json({ error: "You're not authenticated to do this." });
  }
}
