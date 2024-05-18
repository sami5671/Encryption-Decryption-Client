import Container from "./../../Container";
import "react-tabs/style/react-tabs.css";
import UseAuth from "./../../Hooks/UseAuth";
import { useState } from "react";
import forge from "node-forge";
import { Link } from "react-router-dom";
import { saveAs } from "file-saver";

const EncryptionPage = () => {
  const { user } = UseAuth();

  const [privateKeyPem, setPrivateKeyPem] = useState("");
  const [publicKeyPem, setPublicKeyPem] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [inputText, setInputText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileUpload = (event, setKey) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setKey(e.target.result);
    };
    reader.readAsText(file);
  };

  const handleEncryptText = async (event) => {
    event.preventDefault();
    const form = event.target;
    const userText = form.userText.value;

    try {
      // Validate input keys
      if (!publicKeyPem || !privateKeyPem) {
        setErrorMessage("Both public and private keys must be provided.");
        return;
      }

      // Parse the PEM formatted keys
      const receiverPublicKey = forge.pki.publicKeyFromPem(publicKeyPem);
      const senderPrivateKey = forge.pki.privateKeyFromPem(privateKeyPem);

      // Encrypt the input text with the receiver's public key
      const encrypted = receiverPublicKey.encrypt(userText, "RSA-OAEP");
      const encodedEncrypted = forge.util.encode64(encrypted);

      // Update state with the encrypted text
      setEncryptedText(encodedEncrypted);
      setInputText(userText);
      setErrorMessage(""); // Clear any previous error messages
    } catch (error) {
      setErrorMessage("Invalid PEM formatted message. Please check the keys.");
      console.error("Error during encryption:", error);
    }
  };

  const handleDownloadEncryptedText = () => {
    const blob = new Blob([encryptedText], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "encrypted_message.txt");
  };

  return (
    <>
      <Container>
        <div className="flex items-center justify-center">
          <Link to="/generateKeys">
            <button className="border-2 bg-green-500 text-white font-bold px-2 py-2 hover:bg-white hover:text-black">
              Generate Keys
            </button>
          </Link>
          <Link to="/encryptionPage">
            <button className="border-2 bg-purple-900 text-white font-bold px-2 py-2 hover:bg-white hover:text-black">
              Encrypt
            </button>
          </Link>
          <Link to="/decryptionPage">
            <button className="border-2 bg-purple-400 text-white font-bold px-2 py-2 hover:bg-white hover:text-black">
              Decrypt
            </button>
          </Link>
        </div>
        <div className="border border-purple-300 p-20 shadow-2xl mt-14 mb-20 rounded-2xl">
          <h2 className="text-5xl text-center font-bold mb-14 text-purple-500">
            Encrypt your Message
          </h2>
          <form className="space-y-10 mt-12" onSubmit={handleEncryptText}>
            <div className="flex flex-col md:flex-row gap-10">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={user?.displayName}
                className="input input-bordered w-full"
                required
                readOnly
              />
              <input
                type="text"
                value={user?.email}
                placeholder="Name"
                name="Name"
                className="input input-bordered w-full"
                required
                readOnly
              />
            </div>
            <div className="flex flex-col md:flex-row gap-10 mt-12">
              <div className="w-full lg:h-[150px]">
                <label className="block mb-2">Receiver Public Key</label>
                <input
                  type="file"
                  accept=".pem"
                  className="input input-bordered w-full lg:h-[120px] bg-purple-200 text-white cursor-pointer"
                  onChange={(e) => handleFileUpload(e, setPublicKeyPem)}
                />
              </div>
              <div className="w-full lg:h-[150px]">
                <label className="block mb-2">Sender Private Key</label>
                <input
                  type="file"
                  accept=".pem"
                  className="input input-bordered w-full lg:h-[120px] bg-purple-200 text-white cursor-pointer"
                  onChange={(e) => handleFileUpload(e, setPrivateKeyPem)}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-10">
              <textarea
                name="userText"
                placeholder="Write your message..."
                className="input input-bordered w-full lg:h-[150px]"
                required
              />
              <textarea
                className="input input-bordered w-full lg:h-[150px]"
                readOnly
                value={encryptedText}
              />
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <input
              type="submit"
              value="Encrypt Message"
              className="btn btn-block text-xl font-bold text-white bg-purple-500 border-none"
              required
            />
          </form>
          {encryptedText && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleDownloadEncryptedText}
                className="btn btn-primary"
              >
                Download Encrypted Text
              </button>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default EncryptionPage;
