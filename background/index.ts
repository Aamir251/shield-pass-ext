import type { Credential } from "~types";
import { fetchCredentialsSharedWithMe } from "~utils/helpers";
import { Storage } from "@plasmohq/storage";
import { ACTIONS } from "~utils/constants";


const storage = new Storage({
  area: "session"
})

export { }


let authStatus: boolean = false;

let sharedCredentials: Credential[] = []



export const init = async () => {


  try {

    const storage = new Storage({
      area: "session"
    })
    const token = await storage.get("sp-auth")


    if (!token) throw new Error("unauthorized")
    console.log("response ", token)

    const { credentials, sharedPrivateKey } = await fetchCredentialsSharedWithMe(token)

    /**
     * Use Storage API as this gets killed after 5 minutes
    */

    // await storage.set(ACTIONS.SHARED_CREDENTIALS, JSON.stringify(credentials))
    // await storage.set(ACTIONS.PRIVATE_KEY, JSON.stringify(sharedPrivateKey))
  } catch (error) {

    console.log({ error });

    if (error.message === "unauthorized") {
      // Handle Unauthorized Error

      await storage.set(ACTIONS.SHARED_CREDENTIALS, JSON.stringify("UNAUTHORIZED"))
      return
    }

  }


}


// init()



