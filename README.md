This is a web application that allows you to securely send and receive encrypted messages using public-key cryptography. This ensures that only the intended recipient can read the messages.

## How it Works

![alt text](https://i.ibb.co/gF5zSSJ/Structure.png)

### Login or Register

Users can either log in to an existing account or register for a new one.

### Key Generation

Upon successful login/registration, a key pair (public and private) is generated for the user.

### Message Encryption

The sender composes a message and encrypts it using the recipient's public key. Only the recipient's private key can decrypt this message.

### Message Decryption

The receiver receives the encrypted message along with the sender's public key. They can then decrypt the message using their private key.

## Getting Started

1. **Visit the NSC Encryption-Decryption web app at [nsc-encryption-decryption.web.app](http://nsc-encryption-decryption.web.app/)**
2. **Login or Register for an Account**

   - If you don't have an account, register for a new one.
   - If you already have an account, log in using your credentials.

3. **Generate Your Key Pair**

   - After logging in or registering, a key pair (public and private keys) will be generated for you automatically.

4. **Exchange Public Keys with Your Recipient**

   - Share your public key with the person you want to communicate with.
   - Obtain their public key as well.

5. **Start Sending and Receiving Encrypted Messages!**

   - Compose your message and encrypt it using the recipient's public key.
   - Send the encrypted message to the recipient.
   - The recipient can then decrypt the message using their private key.

## Features

- **Secure Communication**: Ensures that only the intended recipient can read the messages.
- **User-Friendly Interface**: Easy-to-use web application.
- **Automatic Key Generation**: Generates key pairs automatically upon login/registration.
- **Public-Key Cryptography**: Utilizes public-key cryptography for secure message exchange.

## Requirements

- An internet connection
- A modern web browser
