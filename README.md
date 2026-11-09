*This project has been created as part of the 42 curriculum by nbarbosa.*

# 🪙 Tokenizer — NB42 & MultiSigWallet

An ERC-20 compliant smart contract and an M-of-N Multi-Signature Vault deployed and verified on the **Ethereum Sepolia Testnet**, built with **Hardhat**, **Solidity 0.8.28**, and **OpenZeppelin Contracts**.

---

## ⚡ Quick Access — Evaluation Dashboard

### 1. Mandatory Part: ERC-20 Token (`Nbarbosa42`)
| Resource | Direct Link | Purpose during Evaluation |
| :--- | :--- | :--- |
| **Verified Source Code** | [Etherscan — #code](https://sepolia.etherscan.io/address/0xDA57D6DE7830428C144f054aFDf26e25814A319c#code) | Show the green verification badge and Solidity source code |
| **Read Contract (Free)** | [Etherscan — #readContract](https://sepolia.etherscan.io/address/0xDA57D6DE7830428C144f054aFDf26e25814A319c#readContract) | Query `totalSupply`, `balanceOf`, `symbol`, `decimals` |
| **Write Contract (Tx)** | [Etherscan — #writeContract](https://sepolia.etherscan.io/address/0xDA57D6DE7830428C144f054aFDf26e25814A319c#writeContract) | Execute `transfer` or `approve` via Web3 / MetaMask |
| **Token Tracker** | [Etherscan — Token NB42](https://sepolia.etherscan.io/token/0xDA57D6DE7830428C144f054aFDf26e25814A319c) | Check holders list and token transfer history |
| **Deployer Wallet** | [Etherscan — Deployer](https://sepolia.etherscan.io/address/0x19B961a531e421f096148b35C700dB21ae427558) | View deployment transaction and gas fee history |
| **Backup Explorers** | [Blockscout](https://eth-sepolia.blockscout.com/address/0xDA57D6DE7830428C144f054aFDf26e25814A319c#code) / [Sourcify](https://sourcify.dev/server/repo-ui/11155111/0xDA57D6DE7830428C144f054aFDf26e25814A319c) | Alternative decentralized contract verification |

### 2. Bonus Part: Multi-Signature Wallet (`MultiSigWallet`)
| Resource | Direct Link | Purpose during Evaluation |
| :--- | :--- | :--- |
| **Verified Source Code** | [Etherscan — #code](https://sepolia.etherscan.io/address/0x4b4A10a2fe0a2816C708A2Fa0fA4F061a9E0ddd0#code) | View verified MultiSig contract with constructor arguments |
| **Sourcify Verification** | [Sourcify — MultiSig](https://sourcify.dev/server/repo-ui/11155111/0x4b4A10a2fe0a2816C708A2Fa0fA4F061a9E0ddd0) | Exact Match verification metadata on Sourcify |
| **Read Contract** | [Etherscan — #readContract](https://sepolia.etherscan.io/address/0x4b4A10a2fe0a2816C708A2Fa0fA4F061a9E0ddd0#readContract) | Query `numConfirmationsRequired`, `isOwner`, `token` address |

### 📋 Values to Copy-Paste during Evaluation
- **NB42 Token Address:**
  `0xDA57D6DE7830428C144f054aFDf26e25814A319c`
- **MultiSigWallet Address:**
  `0x4b4A10a2fe0a2816C708A2Fa0fA4F061a9E0ddd0`
- **Deployer / Owner Address:**
  `0x19B961a531e421f096148b35C700dB21ae427558`
- **Amount `42 NB42` in raw Wei (18 decimals):**
  `42000000000000000000`
- **Amount `1,000,000 NB42` in raw Wei (Total Supply):**
  `1000000000000000000000000`

---

## 📌 Smart Contract Specifications

### Token (`Nbarbosa42`)
| Parameter | Value | Details |
| :--- | :--- | :--- |
| **Token Name** | `Nbarbosa42` | Registered on-chain token name |
| **Token Symbol** | `NB42` | Ticker symbol displayed in wallets |
| **Standard** | `ERC-20` | Standard fungible token specification |
| **Decimals** | `18` | Divisibility matching standard ETH (10^18 base units) |
| **Total Supply** | `1,000,000 NB42` | Minted to deployer wallet upon deployment |
| **Network** | `Sepolia Testnet` | Chain ID: `11155111` (Hex: `0xaa36a7`) |
| **Compiler** | `Solidity 0.8.28` | Native arithmetic overflow/underflow protection |

### MultiSig Wallet (`MultiSigWallet`)
| Parameter | Value | Details |
| :--- | :--- | :--- |
| **Contract Type** | M-of-N Multi-Signature Vault | Requires M confirmations before token release |
| **Configured Owners** | 3 accounts | `0x19B961...`, `0x2b9284...`, `0x709979...` |
| **Required Confirmations** | `2` | Minimum signatures needed to execute any transaction |
| **Managed Token** | `NB42` | `0xDA57D6DE7830428C144f054aFDf26e25814A319c` |

---

## 🛠️ Environment & Installation

### 1. Prerequisites
- **Node.js v22+** (required by Hardhat)
- npm

```bash
nvm use 22
node -v
```

### 2. Dependencies
Install project dependencies:
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file at the root of the project:
```env
PRIVATE_KEY="your_wallet_private_key"
ETHERSCAN_API_KEY="your_etherscan_api_key"
```

---

## 🧪 Automated Testing Suite (12 Passing Tests)

The test suite runs with native `node:test` and covers the full lifecycle of both the ERC-20 token and the MultiSig wallet:

```bash
make test
```

### What the test suite validates:
1. **ERC-20 Token (`Nbarbosa42`):**
   - Initial supply assignment and token metadata verification.
   - Standard peer-to-peer transfers and failure on insufficient balance.
   - Standard approvals (`approve`) and delegated transfers (`transferFrom`) within limits.
2. **MultiSig Vault (`MultiSigWallet`):**
   - Correct initial parameters (3 owners, threshold of 2).
   - Rejection of proposals made by non-owners (`Not an owner`).
   - Transaction execution block when threshold is not met (1/2 signatures).
   - Valid execution and token transfer once threshold is satisfied (2/2 signatures).

---

## 🚀 Step-by-Step Defense Guide (Live Demo)

### Step 1: Repository Cleanliness
Ensure no `.env` or sensitive private keys are committed:
```bash
git status
git log -p -1
```

### Step 2: Automated Tests Execution
Run the full test suite in front of the evaluator:
```bash
make test
```
*Expected: 12 passing tests across `MultiSigWallet (Bonus)` and `Nbarbosa42 Token`.*

### Step 3: Verify Contracts On-Chain
Open the verified contract pages on Etherscan:
1. **NB42 Token:** [Etherscan Contract #code](https://sepolia.etherscan.io/address/0xDA57D6DE7830428C144f054aFDf26e25814A319c#code)
   - Show the green checkmark badge `Contract Source Code Verified`.
   - In **Read Contract**, demonstrate `name`, `symbol`, `decimals`, and `balanceOf`.
2. **MultiSigWallet:** [Etherscan MultiSig #code](https://sepolia.etherscan.io/address/0x4b4A10a2fe0a2816C708A2Fa0fA4F061a9E0ddd0#code)
   - Show the green verification badge and decoded constructor arguments.
   - In **Read Contract**, demonstrate `numConfirmationsRequired` (`2`) and verify that the deployer address returns `isOwner = true`.

---

## 🧠 Technical Q&A & Architecture Sheet

- **What is an ERC-20 Token?**  
  A standard technical specification for fungible tokens on Ethereum. It guarantees interoperability across wallets, exchanges, and smart contracts by implementing standardized methods (`totalSupply`, `balanceOf`, `transfer`, `approve`, `transferFrom`, `allowance`) and events (`Transfer`, `Approval`).

- **Why multiply by 10^18 in the constructor?**  
  The EVM does not support floating-point numbers. All balances are stored as unsigned integers (`uint256`). With 18 decimals, 1 token equals 10^18 base units (similar to how 1 ETH equals 10^18 Wei).

- **What is the difference between `transfer` and `transferFrom`?**  
  `transfer(to, amount)` directly sends tokens from the caller (`msg.sender`) to the destination.  
  `transferFrom(from, to, amount)` allows a delegated third party or smart contract to transfer tokens on behalf of the owner, provided the owner has previously authorized it via `approve(spender, amount)`.

- **Why use a Multi-Signature Wallet?**  
  A single private key represents a Single Point of Failure (SPOF). A MultiSig wallet mitigates this risk by requiring M-of-N independent signers to approve a transaction before any funds or tokens can leave the contract.

- **How does the MultiSig workflow operate?**  
  1. An authorized owner calls `submitTransaction` specifying recipient and amount.
  2. Owners review and call `confirmTransaction(txIndex)`.
  3. Once the confirmation count reaches `numConfirmationsRequired`, any owner can call `executeTransaction(txIndex)` to trigger the token transfer.

- **What is contract verification?**  
  Smart contracts exist on-chain solely as compiled EVM bytecode. Verification compiles the source code with matching compiler settings (`Solidity 0.8.28`) and compares the resulting bytecode byte-for-byte against the on-chain deployed bytecode.