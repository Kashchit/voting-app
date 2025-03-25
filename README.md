# Voting DApp

A decentralized voting system built with Solidity, Hardhat, and Ethers.js. This smart contract allows multiple voters to vote for one of four candidates, ensuring each voter can only vote once. The contract also determines and displays the winner based on votes.

## Features
- Supports **four candidates** for voting.
- **Multiple voters** can participate.
- **Prevents double voting** to ensure fairness.
- **Displays the winner** at the end of voting.
- Uses Hardhat for deployment and testing.

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Hardhat](https://hardhat.org/)
- [Git](https://git-scm.com/)
- [MetaMask](https://metamask.io/) (for deploying to testnets)

## Installation
Clone the repository and install dependencies:

```sh
git clone https://github.com/Kashchit/voting-app.git
cd voting-app
npm install
```

## Environment Variables
Create a `.env` file in the root directory and add your private key and RPC URL:

```
PRIVATE_KEY=your_wallet_private_key
ALCHEMY_API_URL=your_alchemy_rpc_url
```

Ensure `.env` is **not** tracked in GitHub:
```sh
echo .env >> .gitignore
```

## Compile the Smart Contract
```sh
npx hardhat compile
```

## Deploy the Contract
For local testing:
```sh
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```
For testnet deployment (e.g., Goerli):
```sh
npx hardhat run scripts/deploy.js --network goerli
```

## Running Tests
Run Hardhat tests to verify functionality:
```sh
npx hardhat test
```

## Interacting with the Contract
After deployment, interact using Hardhat console:
```sh
npx hardhat console --network localhost
```
Example:
```js
const voting = await ethers.getContractAt("Voting", "DEPLOYED_CONTRACT_ADDRESS");
await voting.vote(0); // Vote for candidate 0
const winner = await voting.getWinner();
console.log("Winner:", winner);
```

## Updating and Pushing to GitHub
```sh
git add .
git commit -m "Updated voting contract"
git push origin main
```

## License
This project is licensed under the MIT License.

## Contributing
Feel free to submit pull requests or report issues!

---

### Author
Developed by Kashchit Bikram Thapa 🚀

