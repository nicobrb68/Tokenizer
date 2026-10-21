*This project has been created as part of the 42 curriculum by nbarbosa.*

# 🪙 Tokenizer — NB42 (ERC-20 Token)

An ERC-20 compliant smart contract deployed and verified on the **Ethereum Sepolia Testnet**, built with **Hardhat**, **Solidity 0.8.28**, and **OpenZeppelin Contracts**.

---

## ⚡ Quick Access — Evaluation Dashboard

### 🔗 Direct Explorer Links
| Resource | Direct Link | Purpose during Evaluation |
| :--- | :--- | :--- |
| **Verified Source Code** | [Etherscan — #code](https://sepolia.etherscan.io/address/0xDA57D6DE7830428C144f054aFDf26e25814A319c#code) | Show the green verification badge and Solidity source code |
| **Read Contract (Free)** | [Etherscan — #readContract](https://sepolia.etherscan.io/address/0xDA57D6DE7830428C144f054aFDf26e25814A319c#readContract) | Query `totalSupply`, `balanceOf`, `symbol`, `decimals` |
| **Write Contract (Tx)** | [Etherscan — #writeContract](https://sepolia.etherscan.io/address/0xDA57D6DE7830428C144f054aFDf26e25814A319c#writeContract) | Execute `transfer` or `approve` via Web3 / MetaMask |
| **Token Tracker** | [Etherscan — Token NB42](https://sepolia.etherscan.io/token/0xDA57D6DE7830428C144f054aFDf26e25814A319c) | Check holders list and token transfer history |
| **Deployer Wallet** | [Etherscan — Deployer](https://sepolia.etherscan.io/address/0x19B961a531e421f096148b35C700dB21ae427558) | View deployment transaction and gas fee history |
| **Backup Explorers** | [Blockscout](https://eth-sepolia.blockscout.com/address/0xDA57D6DE7830428C144f054aFDf26e25814A319c#code) / [Sourcify](https://sourcify.dev/server/repo-ui/11155111/0xDA57D6DE7830428C144f054aFDf26e25814A319c) | Alternative decentralized contract verification |

### 📋 Values to Copy-Paste during Evaluation
* **Contract Address:**
  `0xDA57D6DE7830428C144f054aFDf26e25814A319c`
* **Deployer / Owner Address:**
  `0x19B961a531e421f096148b35C700dB21ae427558`
* **Amount `42 NB42` in raw Wei (18 decimals):**
  `42000000000000000000`
* **Amount `1,000,000 NB42` in raw Wei (Total Supply):**
  `1000000000000000000000000`

---

## 📌 Smart Contract Specifications

| Parameter | Value | Details |
| :--- | :--- | :--- |
| **Token Name** | `Nbarbosa42` | Registered on-chain token name |
| **Token Symbol** | `NB42` | Ticker symbol displayed in wallets |
| **Standard** | `ERC-20` | Standard fungible token specification |
| **Decimals** | `18` | Divisibility matching standard ETH ($10^{18}$ base units) |
| **Total Supply** | `1,000,000 NB42` | Minted to deployer wallet upon deployment |
| **Network** | `Sepolia Testnet` | Chain ID: `11155111` (Hex: `0xaa36a7`) |
| **Compiler** | `Solidity 0.8.28` | Native arithmetic overflow/underflow protection |

---

## 🛠️ Environment & Installation

### 1. Prerequisites
- **Node.js v22+** (required by Hardhat)
- npm

To ensure the correct Node version is active:
```bash
nvm use 22
node -v
```

### 2. Dependencies
Install project packages:
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file at the root of the project:
```env
PRIVATE_KEY="your_wallet_private_key"
ETHERSCAN_API_KEY="your_etherscan_api_key"
```
*(Note: The Sepolia public RPC endpoint is already hardcoded in `hardhat.config.js`).*

---

## 🚀 Step-by-Step Defense Guide (Live Demo)

### Step 1: Check Compilation
Confirm that the contract compiles cleanly without warnings:
```bash
npx hardhat compile
```

### Step 2: Query On-Chain Balance via CLI
Run the local balance check script to verify SepoliaETH and NB42 balances directly via RPC:
```bash
npx hardhat run check_balance.js --network sepolia
```
Expected output:
- **Compte:** `0x19B961a531e421f096148b35C700dB21ae427558`
- **Solde SepETH:** `~0.35 ETH`
- **Solde Tokens:** `1000000.0 NB42`

### Step 3: MetaMask Display & Verification
1. Open MetaMask and ensure the active network is set to **Sepolia**.
2. Confirm that **NB42** appears under the Assets list with a balance of **1.00M NB42**.

If the token does not show up automatically, run this snippet in the browser console (`F12`) to trigger MetaMask auto-import:
```javascript
await window.ethereum.request({
  method: 'wallet_watchAsset',
  params: {
    type: 'ERC20',
    options: {
      address: '0xDA57D6DE7830428C144f054aFDf26e25814A319c',
      symbol: 'NB42',
      decimals: 18
    }
  }
});
```

### Step 4: Token Transfer Demonstration
1. In MetaMask, click **NB42** > **Send**.
2. Enter the evaluator's public address (or a secondary test account).
3. Transfer a test amount (e.g., `42 NB42`).
4. Confirm the transaction in MetaMask and open the transaction hash on [Sepolia Etherscan](https://sepolia.etherscan.io/token/0xDA57D6DE7830428C144f054aFDf26e25814A319c) to show the Transfer event.

---

## 🧠 Technical Q&A & Architecture Sheet

- **What is an ERC-20 Token?**  
  A standard technical specification for fungible tokens on Ethereum. It guarantees interoperability across wallets, exchanges, and smart contracts by implementing standard functions (`totalSupply`, `balanceOf`, `transfer`, `approve`, `transferFrom`, `allowance`) and events (`Transfer`, `Approval`).

- **Why multiply by $10^{18}$ in the constructor?**  
  The EVM does not handle floating-point decimals. All balances are represented as unsigned integers (`uint256`). With 18 decimals, 1 token equals $10^{18}$ minimal units (similar to how 1 ETH equals $10^{18}$ Wei).

- **Why use OpenZeppelin?**  
  OpenZeppelin provides peer-reviewed, industry-standard smart contract implementations that mitigate known vulnerabilities such as reentrancy attacks, integer issues, and improper allowance handling.

- **What happens if the deployment script is run again?**  
  Blockchains are immutable. Running the script again creates a distinct, brand-new smart contract at a new address and consumes network gas fees. The existing contract (`0xDA57D...`) remains active and unchanged on-chain.

- **What is contract verification?**  
  Smart contracts are stored on-chain as compiled EVM bytecode. Verification submits the human-readable Solidity source code and compiler metadata to an explorer (Etherscan, Sourcify, Blockscout), which recompiles it to confirm that the generated bytecode matches the on-chain bytecode byte-for-byte.

- **What is the difference between `transfer` and `transferFrom`?**  
  `transfer(to, amount)` directly sends tokens from the sender (`msg.sender`) to the recipient.  
  `transferFrom(from, to, amount)` allows a delegated third party or contract to spend tokens on behalf of the owner, provided the owner previously approved the spender via `approve(spender, amount)`.