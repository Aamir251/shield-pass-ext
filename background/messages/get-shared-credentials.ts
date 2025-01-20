import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage";
import { ACTIONS } from "~utils/constants";



const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  

  const storage = new Storage({
    area : "local"
  })

  const data = JSON.parse(await storage.get(ACTIONS.SHARED_CREDENTIALS))
  
  if (data === "UNAUTHORIZED") {
    res.send({
      message : "UNAUTHORIZED"
    })
  } else {
    res.send({
      sharedCredentials : data
    })
  }
 
}
 
export default handler