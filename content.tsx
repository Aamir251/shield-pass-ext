import { sendToBackground } from "@plasmohq/messaging";
import { useEffect, useState } from "react";
import Container from "~components/Container";
import CredentialsList from "~components/CredentialsList";
import Loader from "~components/Loader";
import LoginUI from "~components/LoginUI";
import Wrapper from "~components/Wrapper";
import type { Credential } from "~types";
import { decryptSharedCredentialPassword, decryptSharedPrivateKey } from "~utils/cipher";
import { disableInputToggle } from "~utils/helpers";


const Button = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [selectedInput, setSelectedInput] = useState<HTMLInputElement | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [sharedCredentials, setSharedCredentials] = useState<Credential[]>([])

  /**
   * Keyboard combo listener to open the Content Window
   */

  const selectedInputType = selectedInput?.type;
  useEffect(() => {
    document.addEventListener("keydown", async ({ repeat, altKey, key }) => {

      if (key === "Escape") {

        setIsOpen(false)
        return
      }


      if (repeat) return

      if (!altKey || key !== "s") return

      setIsOpen(true)

    })



    const getCredentials = async () => {
      const resp = await sendToBackground({
        name: "get-shared-credentials",
      })

      console.log({ resp })
      if (resp?.message === "UNAUTHORIZED") {
        setIsLoggedIn(false)
      } else {
        setIsLoggedIn(true)
        setSharedCredentials(resp.sharedCredentials)

      }

      setIsLoading(false)


    }

    getCredentials()


  }, [])

  useEffect(() => {

    const addInputFocusListener = () => {
      const inputNodes = document.querySelectorAll(
        'input[type="text"], input[type="email"], input[type="password"]'
      );

      inputNodes.forEach(node => {

        node.addEventListener("focus", () => {
          console.log(node);

          setSelectedInput(node as HTMLInputElement)

        })
      })
    }
    setTimeout(addInputFocusListener, 500)

  }, [])

  const fillPassword = async (credentialPassword: string, masterPassword: string) => {
    const privateKeyResponse = await sendToBackground({
      name: "get-private-key"
    });

    const decrytedSharedPrivateKey = await decryptSharedPrivateKey(privateKeyResponse.privateKey, masterPassword)

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

  if (!isLoggedIn) return (<Wrapper>
    <Container>
      <LoginUI />
    </Container>

  </Wrapper>)
  return (
    <Wrapper>

      <Container>
        {
          isLoading ? <Loader /> : <CredentialsList fillPassword={fillPassword} credentials={sharedCredentials} />
        }
      </Container>

    </Wrapper>
  )
}

export default Button




// document.addEventListener("keydown", async ({ repeat, altKey, key }) => {

//   if (repeat) return

//   if (!altKey || key !== "s") return

//   console.log("Open Popup");


// })

