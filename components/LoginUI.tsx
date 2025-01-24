
const LoginUI = () => {
  return (
    <article style={{
      display : "flex",
      justifyContent : "center",
      alignItems : "center",
      flexDirection : "column"
    }}>
      <h2 style={{ fontSize : "48px", color : "white", margin : "0"}}>404</h2>
      <h3 style={{ fontSize : "32px", color : "white", margin : "0"}}>You are not logged In</h3>
      <a style={{
        backgroundColor : "rgba(253, 253, 253, 0.98)",
        color : "black",
        display : "block",
        padding : "8px 20px",
        marginTop : "20px",
        fontWeight : "bold",
        borderRadius : "5px",
        cursor : "pointer",
        textDecoration : "none"
      }}
        href="https://shield-pass-web.vercel.app/login"
        target="_blank"
      
      >Please LogIn</a>
    </article>
  )
}

export default LoginUI