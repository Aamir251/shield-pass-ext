import type { Credential } from "~types";
import { fetchCredentialsSharedWithMe } from "~utils/helpers";
import { Storage } from "@plasmohq/storage";
import { ACTIONS } from "~utils/constants";


const SERVER_URL = "http://localhost:3000"


const storage = new Storage({
  area: "local"
})

export { }


let authStatus: boolean = false;

let sharedCredentials: Credential[] = []



const init = async () => {

  try {
    const { credentials, sharedPrivateKey } = await fetchCredentialsSharedWithMe()

    /**
     * Use Storage API as this gets killed after 5 minutes
    */

    await storage.set(ACTIONS.SHARED_CREDENTIALS, JSON.stringify(credentials))
    await storage.set(ACTIONS.PRIVATE_KEY, JSON.stringify(sharedPrivateKey))
  } catch (error) {


    if (error.message === "unauthorized") {
      // Handle Unauthorized Error

      await storage.set(ACTIONS.SHARED_CREDENTIALS, JSON.stringify("UNAUTHORIZED"))
      return
    }

  }


}


init()
