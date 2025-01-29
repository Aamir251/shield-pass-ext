
import icon from "./assets/icon.png"

function IndexPopup() {
  return (
    <div style={{
      width: 240,
      height: 200,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      backgroundColor: "black",
      padding: 0,
      margin: 0
    }}>
      <h1 style={{ margin: "0 0 10px 0", color: "white", fontWeight: "normal", fontSize: "1.7rem" }}>Shield Pass</h1>
      <img src={icon} alt="shield pass" width={80} height={80} />


      <p style={{
        color: "white",
        marginTop: "0.5rem",
        display: "inline-block"
      }}
      >
        Press
        <span style={{
          display: "inline-block",
          padding: "0.2rem 0.5rem",
          margin: "0 0.4rem",
          backgroundColor: "GrayText",
          borderRadius: 2
        }} >ALT + S</span> to View Credentials
      </p>
    </div>
  )
}

export default IndexPopup
