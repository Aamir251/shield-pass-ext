import type { Credential } from "~types"

type CredentialItemProps = {
  credential: Credential

  fillPassword : (password : string, masterPassword : string) => void
}


const CredentialItem = ({ credential : { websiteUrl, category, email, name, username , password}, fillPassword  }: CredentialItemProps) => {
  return (
    <article style={{
      backgroundColor: "#141415",
      padding: "12px",
      border: "1px solid #373737",
      borderRadius: "3px",
      color: "whitesmoke",
      position : "relative"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 10
      }}>
        <figure style={{
          margin: "0",
          display: "flex",
          padding: 7,
          backgroundColor: "#22222A"
        }}>
          {
            websiteUrl ? <img
              alt={name}
              style={{
                width: "20px",
                height: "20px"
              }}
              src={`http://www.google.com/s2/favicons?domain=${websiteUrl}`}
            /> : <h4>{name.charAt(0)}</h4>
          }
        </figure>
        <h4 style={{ color: "whitesmoke", fontWeight: "normal", margin: "0", fontSize: 15 }}>{name}</h4>
      </div>


      { email && <div className="email-wrap">
        <h6 style={{ fontWeight: "normal", fontSize: 14, margin: 0 }} className="email">{email}</h6>
      </div>}

      { username && <div className="username-wrap">
        <h6 style={{ fontWeight: "normal", fontSize: 14, margin: 0 }} className="username">{username}</h6>
      </div>}
      
      <button className="copy-password" 
        onClick={() => {
          fillPassword(password, "test123")
        }} style={{ 
          backgroundColor : "#22222A",
          outline : "none",
          border : "none",
          padding : "6px 10px",
          fontSize : 13,
          color : "whitesmoke",
          borderRadius : 3,
          position : "absolute",
          right : "8px",
          bottom : "8px",
          cursor : "pointer"
        }}>Fill Password</button>
    </article>
  )
}

export default CredentialItem