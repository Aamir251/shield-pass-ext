/**
 * 
 * @param encryptedPrivateKey User's encrypted Private Key in Int[] format
 * @param salt 
 * @param iv 
 * @param masterPassword 
 * @returns The private key in string format that can be used to decrypt the credential that was shared with him
 */

import type { EncrytedSharedPrivateKey } from "~types";





export const decryptSharedPrivateKey = async (sharedPrivateKey: EncrytedSharedPrivateKey, masterPassword: string) => {
  const decoder = new TextDecoder();

  // Step 1: Decode the salt, IV, and encrypted data from Base64
  const salt = Uint8Array.from(atob(sharedPrivateKey.salt), (c) => c.charCodeAt(0));
  const iv = Uint8Array.from(atob(sharedPrivateKey.iv), (c) => c.charCodeAt(0));
  const encryptedData = Uint8Array.from(atob(sharedPrivateKey.data), (c) => c.charCodeAt(0));

  // Step 2: Derive the decryption key from the master password
  const encoder = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(masterPassword),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  const decryptionKey = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["decrypt"]
  );

  // Step 3: Decrypt the Base64 private key string
  const decryptedData = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    decryptionKey,
    encryptedData
  );

  const base64Key = decoder.decode(decryptedData);

  // Step 4: Decode the private key from the Base64 string to an ArrayBuffer
  const exportedKey = Uint8Array.from(atob(base64Key), (c) => c.charCodeAt(0)).buffer;

  // Step 5: Import the private key back into a CryptoKey object
  const privateKey = await window.crypto.subtle.importKey(
    "pkcs8",
    exportedKey,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["decrypt"]
  );

  return privateKey;
}

const convertStringToArrayBuffer = (base64 : string) => {
  const binary = atob(base64); // Decodes Base64 back to binary
  const buffer = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    buffer[i] = binary.charCodeAt(i);
  }
  return buffer.buffer;
}


export const decryptSharedCredentialPassword = async (password : string, recipientPrivateKey : CryptoKey) => {

  const privateRecipientKey = await crypto.subtle.exportKey("pkcs8", recipientPrivateKey)

  const passwordInBufferArray = convertStringToArrayBuffer(password)


  const privateCryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    privateRecipientKey,
    { name: "RSA-OAEP", hash: "SHA-256" },
    true,
    ["decrypt"]
  )


  const decryptedCredential = await crypto.subtle.decrypt(
    { name: "RSA-OAEP" },
    privateCryptoKey,
    passwordInBufferArray
  );


  return new TextDecoder().decode(decryptedCredential)

}