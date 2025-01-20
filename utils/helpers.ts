import type { Credential } from "~types"

const SERVER_URL = "http://localhost:3000"


export const fetchCredentialsSharedWithMe = async () => {


  const resp = await fetch(`${SERVER_URL}/api/shared-credentials`, {
    credentials: "include"
  })

  const data = await resp.json()

  console.log({ data })

  if (!data?.success) {
    throw new Error(data.error)
  }

  return {
    credentials : data.credentials,
    sharedPrivateKey : data.sharedPrivateKey
  }


}


