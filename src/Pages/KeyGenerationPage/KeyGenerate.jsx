import { useState } from "react";
import UseAuth from "../../Hooks/UseAuth";
import forge from "node-forge";
import { Link } from "react-router-dom";

const KeyGenerate = () => {
  const [privateKeyPem, setPrivateKeyPem] = useState("");
  const [publicKeyPem, setPublicKeyPem] = useState("");
  const [encryptedText, setEncryptedText] = useState("");

  const { user } = UseAuth();

  const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair(2048);

  const generateKeysAndEncrypt = async () => {
    const privateKeyPem = forge.pki.privateKeyToPem(privateKey);
    const publicKeyPem = forge.pki.publicKeyToPem(publicKey);

    setPrivateKeyPem(privateKeyPem);
    setPublicKeyPem(publicKeyPem);
  };

  const downloadFile = (filename, content) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div>
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
          Generate Your Public and Private Keys
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
            value={publicKeyPem}
            readOnly
          />
          <textarea
            placeholder="Private Key"
            className="input input-bordered w-full lg:h-[150px]"
            value={privateKeyPem}
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

        <div className="flex items-center justify-center mt-4">
          {publicKeyPem && (
            <button
              onClick={() => downloadFile("publicKey.pem", publicKeyPem)}
              className="border-2 rounded-lg px-2 py-2 bg-blue-500 hover:bg-slate-300 text-white hover:text-black font-bold mx-2"
            >
              Download Public Key
            </button>
          )}
          {privateKeyPem && (
            <button
              onClick={() => downloadFile("privateKey.pem", privateKeyPem)}
              className="border-2 rounded-lg px-2 py-2 bg-red-500 hover:bg-slate-300 text-white hover:text-black font-bold mx-2"
            >
              Download Private Key
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default KeyGenerate;
