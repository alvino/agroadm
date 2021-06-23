import { getSession } from "next-auth/client";

export default (handler) => async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    req.session = session;
    return handler(req, res);
  } else {
    res.status(401).end("no auth");
  }
};
