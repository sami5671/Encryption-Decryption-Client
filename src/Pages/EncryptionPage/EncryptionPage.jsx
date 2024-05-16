import Container from "./../../Container";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import UseAuth from "./../../Hooks/UseAuth";
import NodeRSA from "node-rsa";
import { useState } from "react";

// =================================================================

const EncryptionPage = () => {
  const { user } = UseAuth();
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [inputText, setInputText] = useState("");

  // Function to handle key generation
  const generateKeysAndEncrypt = () => {
    const key = new NodeRSA({ b: 512 });

    const text = inputText;
    const encrypted = key.encrypt(text, "base64");
    const decrypted = key.decrypt(encrypted, "utf8");

    const privateKey = key.exportKey("private");
    const publicKey = key.exportKey("public");

    setPrivateKey(privateKey);
    setPublicKey(publicKey);
    setEncryptedText(encrypted);
    setDecryptedText(decrypted);
  };

  // =================================================================
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
                <div className="flex flex-col md:flex-row gap-10">
                  <input
                    type="text"
                    placeholder="Public Key"
                    name=""
                    className="input input-bordered w-full lg:h-[150px]"
                    required
                    defaultValue={publicKey}
                  />
                  <input
                    type="text"
                    placeholder="Private Key"
                    name=""
                    defaultValue={privateKey}
                    className="input input-bordered w-full lg:h-[150px]"
                    required
                  />
                </div>
                <div className="flex items-center justify-center">
                  <button
                    onClick={generateKeysAndEncrypt}
                    className="border-2 rounded-lg px-2 py-2 bg-purple-500 hover:bg-slate-300 text-white hover:text-black font-bold"
                  >
                    Generate Keys
                  </button>
                </div>
                <div className="flex flex-col md:flex-row gap-10">
                  <input
                    type="text"
                    placeholder="Write your message"
                    name="location"
                    className="input input-bordered w-full lg:h-[150px]"
                    required
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
                    type="text"
                    placeholder="Spot Name"
                    name="touristSpotName"
                    className="input input-bordered w-full"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Country Name"
                    name="countryName"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-10">
                  <input
                    type="text"
                    placeholder="Location"
                    name="location"
                    className="input input-bordered w-full"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Short Description"
                    name="shortDescription"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-10">
                  <input
                    type="number"
                    placeholder="Average Cost ($USD)"
                    name="averageCost"
                    className="input input-bordered w-full"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Seasonality"
                    name="seasonality"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-10">
                  <input
                    type="text"
                    placeholder="Travel Time"
                    name="travelTime"
                    className="input input-bordered w-full"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Total Visitors Per Year"
                    name="totalVisitorPerYear"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-10">
                  <input
                    type="text"
                    placeholder="User Name"
                    name="name"
                    className="input input-bordered w-full"
                    required
                  />
                  <input
                    type="text"
                    placeholder="User Email"
                    name="email"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="">
                  <input
                    type="text"
                    placeholder="Image URL"
                    name="photo"
                    className="input input-bordered w-full"
                    required
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
