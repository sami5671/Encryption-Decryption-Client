import Container from "./../../Container";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import UseAuth from "./../../Hooks/UseAuth";
import { useState } from "react";
import forge from "node-forge";
import { postEncryptedData } from "../../Api/utils";
import { toast } from "react-hot-toast";
// =================================================================

const EncryptionPage = () => {
  const { user } = UseAuth();
  const [privateKeyPem, setPrivateKeyPem] = useState("");
  const [publicKeyPem, setPublicKeyPem] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair(2048);

  // ============================Function to handle key generation============================
  const generateKeysAndEncrypt = () => {
    // Generate RSA key pair

    // Convert keys to PEM format
    const privateKeyPem = forge.pki.privateKeyToPem(privateKey);
    const publicKeyPem = forge.pki.publicKeyToPem(publicKey);

    // Decrypt the encrypted text
    // const decrypted = privateKey.decrypt(encrypted, "RSA-OAEP");
    // console.log(decrypted);

    // Update state
    setPrivateKeyPem(privateKeyPem);
    setPublicKeyPem(publicKeyPem);
    // setDecryptedText(decrypted);
  };
  // ====================================================================================================

  // =====================================for encrypt the message and send to database============================================================
  const handelEncryptText = async (event) => {
    event.preventDefault();
    const form = event.target;
    const userText = form.userText.value;

    // Encrypt the input text
    const encrypted = publicKey.encrypt(userText, "RSA-OAEP");
    const encodedEncrypted = forge.util.encode64(encrypted);

    // Update state with the encrypted text
    setEncryptedText(encodedEncrypted);
    setInputText(userText);

    // Construct encryptedData with the updated state values
    const encryptedData = {
      email: user.email,
      displayName: user.displayName,
      publicKey: publicKeyPem,
      privateKey: privateKeyPem,
      encryptedText: encodedEncrypted,
    };

    try {
      // Post encryptedData to MongoDB
      const result = await postEncryptedData(encryptedData);

      if (result.acknowledged) {
        toast.success("Successfully Encrypted and Posted to MongoDB!");
      } else {
        toast.error("Failed to post encrypted data to MongoDB");
      }
    } catch (error) {
      console.error("Error posting encrypted data:", error);
      toast.error("Error posting encrypted data to MongoDB");
    }
  };

  // console.log(inputText, encryptedText);
  // =================================================================================================
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Encryption</Tab>
          <Tab>Decryption</Tab>
        </TabList>

        <TabPanel>
          <Container>
            <div className="border border-purple-300 p-20 shadow-2xl mt-14 mb-20 rounded-2xl">
              <h2 className="text-5xl text-center font-bold mb-14 text-purple-500">
                Encrypt your Message
              </h2>

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
                <textarea
                  placeholder="Public Key"
                  className="input input-bordered w-full lg:h-[150px]"
                  defaultValue={publicKeyPem}
                  readOnly
                />
                <textarea
                  placeholder="Private Key"
                  defaultValue={privateKeyPem}
                  className="input input-bordered w-full lg:h-[150px]"
                  readOnly
                />
              </div>

              <div className="flex items-center justify-center mt-12">
                <button
                  onClick={generateKeysAndEncrypt}
                  className="border-2 rounded-lg px-2 py-2 bg-purple-500 hover:bg-slate-300 text-white hover:text-black font-bold"
                >
                  Generate Keys
                </button>
              </div>

              {/* get the user message input */}
              <form className="space-y-10 mt-12" onSubmit={handelEncryptText}>
                <div className="flex flex-col md:flex-row gap-10">
                  <textarea
                    name="userText"
                    placeholder="Write your message............."
                    className="input input-bordered w-full lg:h-[150px]"
                    required
                  />
                  <textarea
                    className="input input-bordered w-full lg:h-[150px]"
                    readOnly
                    value={encryptedText}
                  />
                </div>
                <input
                  type="submit"
                  value="Encrypt Message"
                  className="btn btn-block text-xl font-bold text-white bg-purple-500 border-none"
                  required
                />
              </form>
            </div>
          </Container>
        </TabPanel>
        <TabPanel>
          <Container>
            <div className="border border-purple-300 p-20 shadow-2xl mt-14 mb-20 rounded-2xl">
              <h2 className="text-5xl text-center font-bold mb-14 text-purple-500">
                Decrypt your Message
              </h2>
              <form className="space-y-10">
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
                  <textarea
                    placeholder="Public Key"
                    className="input input-bordered w-full lg:h-[150px]"
                    defaultValue={publicKeyPem}
                    readOnly
                  />
                  <textarea
                    placeholder="Private Key"
                    defaultValue={privateKeyPem}
                    className="input input-bordered w-full lg:h-[150px]"
                    readOnly
                  />
                </div>
                <input
                  type="submit"
                  value="Decrypt Message"
                  className="btn btn-block text-xl font-bold text-white bg-purple-500 border-none"
                  required
                />
              </form>
            </div>
          </Container>
        </TabPanel>
      </Tabs>
    </>
  );
};

export default EncryptionPage;
