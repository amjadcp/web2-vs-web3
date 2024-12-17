## Smart Contract Deployment Guide

### Prerequisites
- Account in MetaMask
- Arbitrum Sepolia network configured in MetaMask
- Sufficient test tokens for deployment
- Remix IDE (https://remix.ethereum.org)
- Infura API KEY (https://www.infura.io/)
- Arbiscan (https://sepolia.arbiscan.io)

### Account Creation in MetaMask

1. **Download MetaMask**
- Visit metamask.io
- Click "Download" for your browser
- Add MetaMask browser extension

2. **Create New Wallet**
- Open MetaMask extension
- Select "Create a Wallet"
- Choose "No Thanks" for analytics (optional)
- Create a strong password

3. **Secure Your Secret Recovery Phrase**
- **Important**: MetaMask will display a 12-word Secret Recovery Phrase
- Write down the phrase exactly as shown
- Store in a **secure, offline location**
- **Never share this phrase with anyone**

#### Security Recommendations
- Save backup in multiple secure locations
- Use a password manager for additional protection
- Avoid digital screenshots of recovery phrase
- Verify each word during backup process

#### Adding Additional Accounts
- Click account selector in MetaMask
- Choose "Add Account"
- Name your new account
- New account will share same Secret Recovery Phrase

#### Wallet Address
- Find your wallet address by clicking current address
- Address starts with "0x..."
- Unique for each account you create

**Warning**: Losing your Secret Recovery Phrase means permanent loss of wallet access.

### Arbitrum Sepolia Network Configuration in MetaMask

1. **Configuration**
- Visit https://chainid.network/
- Search for "Arbitrum Sepolia"
- Use "Add to MetaMask" button for automatic configuration

2. **Obtaining Testnet ETH**
- Use Google Sepolia faucets (https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- Request test tokens for development and testing
- Verify token receipt in MetaMask wallet
- Transfer test tokens from Sepolia to Arbitrum Sepolia (https://bridge.arbitrum.io)

- **Important Notes**:
- Testnet is for development purposes only
- Do not send real cryptocurrency to testnet addresses
- Always keep your recovery phrase secure


### Smart Contract Deployment Steps

**1. Open Remix IDE**
- Navigate to remix.ethereum.org
- Create a new file with `.sol` extension for your voting contract
- Paste code from `voting.sol` to the file created in the Remix IDE

**2. Compile Smart Contract**
- Select the "Solidity Compiler" tab
- Choose appropriate Solidity compiler version
- Click "Compile" to verify your contract

**3. Deploy Contract**
- Switch to "Deploy & Run Transactions" tab
- Select "Injected Provider - MetMask" environment
- Ensure Arbitrum Sepolia network is selected in MetaMask
- Click "Deploy" and confirm MetaMask transaction

**4. Interact with Contract**
- Expand deployed contract in Remix
- Test contract functions like vote, register candidates

### Express Server Setup

1. **Clone the Repository**
```bash
git clone https://github.com/amjadcp/web2-vs-web3.git
cd web2-vs-web3/web3
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Configuration**
- Create a `.env` file in the root directory
- Add necessary environment variables:
```
MONGO_URI=mongodb://[username:password@]host[:port][,...hostN[:port]][/[database][?parameter_list]]
INFURA_URL=https://arbitrum-sepolia.infura.io/v3/<YOUR-API-KEY>
DEMO_CONTRACT=hash_value_of_contract
SIGNER_PRIVATE_KEY=your_metamask_private_key
```

4. **Run the Server**

*Development Mode*
```bash
npm run dev
```

*Production Mode*
```bash
npm start
```

### Import DB Collection Schema
1. Create a collection `candidates` in the mongodb
2. Import the collection schema using `web3-votting.candidates.json`


### Troubleshooting
- Ensure MetaMask is connected to Arbitrum Sepolia network
- Verify sufficient test tokens for gas fees
- Check Solidity compiler compatibility