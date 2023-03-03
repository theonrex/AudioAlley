# Audio Alley


` Audio Alley is a web application that allows music artists to showcase and sell their songs as non-fungible tokens (NFTs) to a global audience. Users can buy and sell NFTs using FANTOM (FTM), and artists can earn revenue from their creations. `

### Features
- [x] Users can browse and search for NFT songs by title or artist.
- [x] Artists can mint and list NFT songs on the marketplace.
- [x] Users can purchase NFT songs using cryptocurrency and add them to their collection.
- [x] Artists can earn revenue from the sale of their NFT songs.
- [x] Convert NFT song prices to USD using Coingecko API.
- [x] Responsive and clean UI
- [x] Integration with the FTM testnet



### Getting Started
Prerequisites
Before you get started, make sure you have the following requirements installed on your machine:

- Node.js
- npm
### Installation
Clone the repository::
Copy code
   ```sh
git clone https://github.com/theonrex/AudioAlley 

```

### Navigate to the project directory:

```sh
cd frontend

```
 ## Install the dependencies:
Copy code
```sh
npm install

```
Create a file called .env in the root of the project and add the following environment variables:
Copy code
```sh
NEXT_PUBLIC_PROJECT_ID=YOUR_INFURA_API_KEY
NEXT_PUBLIC_PROJECT_SECRET=YOUR_INFURA_SECRETE_KEY

```

Start the development server:
Copy code
```sh
npm run dev

```
The website should now be running at http://localhost:3000.

### Navigate to the smart contract project directory:

```sh
cd blockchain

```
 ## Install the dependencies:
Copy code
```sh
npm install

```
Create a file called .env in the root of the project and add the following environment variables:
Copy code
```sh
PRIVATE_KEY = YOUR_PRIVATE_KEY
ETHERSCAN_API_KEY=YOUR_API_KEY

```

Compile the smart contract
Copy code
```sh
npx hardhat compile

```

Deployment
To deploy theon-x to a production environment, follow these steps:

Build the production version of the website:
```sh
npx hardhat run scripts/deploy.js --network ftmtestnet


```

## Built With
* [Next.js -](https://nextjs.org/)  A framework for building server-rendered React applications
* [Tailwind -](https://tailwindcss.com/) Tailwind CSS and SCSS for styling
* [CoinGecko API -](https://www.coingecko.com/api/documentations/v3) A cryptocurrency price API
* [Hardhat -](https://hardhat.org/) Hardhat for the backend and smart contract development
* [ Ethere.js -](https://github.com/ethers-io/ethers.js/) Ethers.js for connecting the frontend to the smart contracts
* [ IPFS  -](https://github.com/ipfs/ipfs) A File System (IPFS) is a distributed file storage protocol that allows computers all over the globe to store and serve files as part of a giant peer-to-peer network.





