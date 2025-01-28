import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage";

const handler : PlasmoMessaging.MessageHandler = async (req, res) => {

  const storage = new Storage({
    area: "session"
  })
  const token = req.body

  console.log("token to save ", token);
  

  await storage.set("sp-auth", token)
}

export default handler