import React, { useEffect, useState } from "react";
import Container from "../../Container";
import { getEncryptedData } from "../../Api/utils";
import { toast } from "react-hot-toast";
import UseAuth from "../../Hooks/UseAuth";
import { Link } from "react-router-dom";
import forge from "node-forge";

const DecryptionPage = () => {
  const { user } = UseAuth();
  const [decryptedText, setDecryptedText] = useState("");
  const [userEncryptedText, setUserEncryptedText] = useState([]);

  useEffect(() => {
    getEncryptedData().then((data) => {
      setUserEncryptedText(data);
    });
  }, []);

  const handleDecryptMessage = (event) => {
    event.preventDefault();
    const form = event.target;
    const userPrivateKeyPem = form.userPrivateKey.value;
    const encryptedMessage = form.encryptedMessage.value;

    // Find matching entry based on private key
    const matchedEntry = userEncryptedText.find(
      (entry) => entry.privateKey === userPrivateKeyPem
    );

    if (matchedEntry && encryptedMessage === matchedEntry.encryptedText) {
      try {
        // Convert private key PEM string to a Forge private key object
        const privateKey = forge.pki.privateKeyFromPem(userPrivateKeyPem);

        // Decrypt the encrypted message using the private key
        const encryptedBytes = forge.util.decode64(encryptedMessage);
        const decrypted = privateKey.decrypt(encryptedBytes, "RSA-OAEP");

        // Update state with the decrypted message
        setDecryptedText(decrypted);
      } catch (error) {
        console.error("Error decrypting message:", error);
        toast.error("Error decrypting message");
      }
    } else {
      toast.error("Invalid private key or encrypted text");
    }
  };

  return (
    <Container>
      <div className="flex items-center justify-center">
        <Link to="/encryptionPage">
          <button className="border-2 bg-purple-900 text-white font-bold px-2 py-2">
            Encrypt
          </button>
        </Link>
        <Link to="/decryptionPage">
          <button className="border-2 bg-purple-400 text-white font-bold px-2 py-2">
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
            <textarea
              placeholder="Paste Your Private Key"
              name="userPrivateKey"
              className="input input-bordered w-full lg:h-[150px]"
              required
            />
            <textarea
              placeholder="Paste Your Encrypted Message"
              name="encryptedMessage"
              required
              className="input input-bordered w-full lg:h-[150px]"
            />
          </div>
          <div>
            <textarea
              placeholder="Decrypted Message"
              readOnly
              value={decryptedText}
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
