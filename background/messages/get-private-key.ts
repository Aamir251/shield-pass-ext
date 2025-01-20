import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage";
import { ACTIONS } from "~utils/constants";



const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  

  const storage = new Storage({
    area : "local"
  })

  const data = JSON.parse(await storage.get(ACTIONS.PRIVATE_KEY))

  console.log("DATA ",);
  
  
  if (data === "UNAUTHORIZED") {
    res.send({
      message : "UNAUTHORIZED"
    })
  } else {
    res.send({
      privateKey : {
        data : data.data,
        iv : data.iv,
        salt : data.salt
      }
    })
  }
 
}
 
export default handler