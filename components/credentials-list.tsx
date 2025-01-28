import type { Credential } from "~types"
import CredentialItem from "./credential-item"

type Props = {
  credentials : Credential[]
  fillPassword : (password : string, masterPassword : string) => void
}

const CredentialsList = ({ credentials, fillPassword } : Props) => {

  console.log({ credentialsList : credentials  });
  
  return (
    <div style={{
      padding : "10px",
      display : "grid",
      gridTemplateColumns : "1fr 1fr",
      gap : "20px",
    }}>
      {
        credentials.map(credential => <CredentialItem fillPassword={fillPassword} key={credential.id} credential={credential} /> )
      }
    </div>
  )
}

export default CredentialsList