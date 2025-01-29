import { useEffect, useState } from "react";
import Container from "~components/Container";
import CredentialsList from "~components/credentials-list";
import Loader from "~components/Loader";
import LoginForm from "~components/login-form";
import Wrapper from "~components/Wrapper";
import type { Credential, EncrytedSharedPrivateKey } from "~types";
import { decryptSharedCredentialPassword, decryptSharedPrivateKey } from "~utils/cipher";
import { disableInputToggle } from "~utils/helpers";


const Content = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [selectedInput, setSelectedInput] = useState<HTMLInputElement | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [sharedCredentials, setSharedCredentials] = useState<Credential[]>([])

  const [ privateKey, sharedPrivateKey ] = useState<EncrytedSharedPrivateKey>()
  
  /**
   * Keyboard combo listener to open the Content Window
   */

  const selectedInputType = selectedInput?.type;

  const loginSuccessHandler = async (credentials : Credential[], privateKey : EncrytedSharedPrivateKey) => {

    sharedPrivateKey(privateKey)
    setSharedCredentials(credentials)
    setIsLoggedIn(true)
    setIsLoading(false)


  }


  useEffect(() => {

    const addInputFocusListener = () => {
      const inputNodes = document.querySelectorAll(
        'input[type="text"], input[type="email"], input[type="password"]'
      );

      inputNodes.forEach(node => {
        node.addEventListener("focus", () => {
          setSelectedInput(node as HTMLInputElement)
        })
      })
    }
    setTimeout(addInputFocusListener, 500)

  }, [])


  useEffect(() => {

    const handleKeyDown = async ({ repeat, altKey, key }) => {
      if (key === "Escape") {
        setIsOpen(false)
        return
      }

      if (repeat) return
      if (!altKey || key !== "s") return
      setIsOpen(true)

    }
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)

    }
  }, [])

  const fillPassword = async (credentialPassword: string, masterPassword: string) => {
    
    

    const decrytedSharedPrivateKey = await decryptSharedPrivateKey(privateKey, masterPassword)

    if (!selectedInput) {
      console.log("input not selected");
      return
    }

    const pass = await decryptSharedCredentialPassword(credentialPassword, decrytedSharedPrivateKey)

    selectedInput.value = `${pass}`
    // Dispatch input event to notify the page of the new value
    const inputEvent = new Event('input', { bubbles: true });
    selectedInput.dispatchEvent(inputEvent);

    selectedInput.type = "password"
    // Disable the clipboard/context menu for this field
    selectedInput.addEventListener('copy', (event) => event.preventDefault());
    selectedInput.addEventListener('contextmenu', (event) => event.preventDefault());

    // Set the field to readonly to prevent user interaction
    // selectedInput.readOnly = true

    // start mutation observer on this Input to avoid changing the input back to text;

    disableInputToggle(selectedInput, selectedInputType)

    setTimeout(() => {
      selectedInput.setAttribute("value", ""); // Clear the visible value
    }, 0);

    Object.defineProperty(selectedInput, 'value', {
      get: () => pass, // Return the decrypted password for submission
      set: () => { }, // Prevent any new value from being set
      configurable: true,
    });
  }


  if (!isOpen) return null

  if (!isLoggedIn) return (<Wrapper setIsOpen={setIsOpen}>
    <Container>
      <LoginForm loginSuccessHandler={loginSuccessHandler} />
    </Container>

  </Wrapper>)
  return (
    <Wrapper setIsOpen={setIsOpen}>

      <Container>
        {
          isLoading ? <Loader /> : <CredentialsList fillPassword={fillPassword} credentials={sharedCredentials} />
        }
      </Container>

    </Wrapper>
  )
}

export default Content




// document.addEventListener("keydown", async ({ repeat, altKey, key }) => {

//   if (repeat) return

//   if (!altKey || key !== "s") return

//   console.log("Open Popup");


// })

