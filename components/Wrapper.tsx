import type { PropsWithChildren } from "react"
import CloseIcon from "assets/close.svg";

type Props = PropsWithChildren<{
  setIsOpen : React.Dispatch<React.SetStateAction<boolean>>

}
>
const Wrapper = ({ children, setIsOpen } : Props) => {

  return (
    <section style={{
      position: "fixed",
      inset: 0,
      zIndex: 10000,
      backgroundColor: "rgb(0 0 0 / 45%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <img onClick={setIsOpen.bind(null, false)} src={CloseIcon} alt="close" width={40} height={40} style={{
        position : "absolute",
        left : "50%",
        top : "50px",
        transform : "translateX(-50%)",
        cursor : "pointer"
      }} />
      {children}
    </section>
  )
}

export default Wrapper