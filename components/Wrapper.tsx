import type { PropsWithChildren } from "~node_modules/@types/react"

const Wrapper = ({ children } : PropsWithChildren) => {
  return (
    <section  style={{
      position: "fixed",
      inset: 0,
      zIndex: 10000,
      backgroundColor: "rgb(0 0 0 / 35%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      
      {children}
    </section>
  )
}

export default Wrapper