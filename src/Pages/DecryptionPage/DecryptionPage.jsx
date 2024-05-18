import React, { useState } from "react";
import Container from "../../Container";
import UseAuth from "../../Hooks/UseAuth";
import { Link } from "react-router-dom";
import forge from "node-forge";

const DecryptionPage = () => {
  const { user } = UseAuth();

  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [receiverPrivateKeyPem, setReceiverPrivateKeyPem] = useState("");
  const [senderPublicKeyPem, setSenderPublicKeyPem] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");

  const handleFileUpload = (event, setKey) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setKey(e.target.result);
    };
    reader.readAsText(file);
  };

  const handleDecryptMessage = (event) => {
    event.preventDefault();
    try {
      // Parse the keys
      const receiverPrivateKey = forge.pki.privateKeyFromPem(
        receiverPrivateKeyPem
      );
      const senderPublicKey = forge.pki.publicKeyFromPem(senderPublicKeyPem);

      // Decode the encrypted message
      const encryptedBytes = forge.util.decode64(encryptedMessage);

      // Decrypt the message with the receiver's private key
      const decrypted = receiverPrivateKey.decrypt(encryptedBytes, "RSA-OAEP");

      // Update state with the decrypted message
      setDecryptedMessage(decrypted);
    } catch (error) {
      console.error("Error during decryption:", error);
    }
  };

  return (
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
          Decrypt your Message
        </h2>
        <form className="space-y-10" onSubmit={handleDecryptMessage}>
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
              <label className="block mb-2">Receiver Private Key</label>
              <input
                type="file"
                accept=".pem"
                className="input input-bordered w-full lg:h-[120px] bg-purple-200 text-white cursor-pointer"
                onChange={(e) => handleFileUpload(e, setReceiverPrivateKeyPem)}
              />
            </div>
            <div className="w-full lg:h-[150px]">
              <label className="block mb-2">Sender Public Key</label>
              <input
                type="file"
                accept=".pem"
                className="input input-bordered w-full lg:h-[120px] bg-purple-200 text-white cursor-pointer"
                onChange={(e) => handleFileUpload(e, setSenderPublicKeyPem)}
              />
            </div>
            <div className="w-full lg:h-[150px]">
              <label className="block mb-2">Encrypted Message</label>
              <input
                type="file"
                accept=".txt"
                className="input input-bordered w-full lg:h-[120px] bg-purple-200 text-white cursor-pointer"
                onChange={(e) => handleFileUpload(e, setEncryptedMessage)}
              />
            </div>
          </div>
          <div>
            <textarea
              placeholder="Decrypted Message"
              readOnly
              value={decryptedMessage}
              className="input input-bordered w-full lg:h-[150px]"
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
  );
};

export default DecryptionPage;
