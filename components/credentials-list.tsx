import type { Credential } from "~types"
import CredentialItem from "./credential-item"

type Props = {
  credentials: Credential[]
  fillPassword: (password: string) => void
}

const CredentialsList = ({ credentials, fillPassword }: Props) => {



  
  if (!credentials.length) {
    return (
  
      <h2 style={{
        fontFamily: "sans-serif",
        fontSize: "1.8rem",
        fontWeight: "normal",
        textAlign: "center"
      }}>No Shared Credentials Found</h2>
    )
  }

  return (
    <div style={{
      padding: "10px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
    }}>
      {
        credentials.map(credential => <CredentialItem fillPassword={fillPassword} key={credential.id} credential={credential} />)
      }
    </div>
  )
}

export default CredentialsList