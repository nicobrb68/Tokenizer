import { network } from "hardhat";

/**
 * @notice Deployment script for Nbarbosa42 token on Ethereum Sepolia.
 */
async function main() {
  // Connect to the network selected via the CLI (--network sepolia)
  const { ethers } = await network.getOrCreate();

  const [deployer] = await ethers.getSigners();
  console.log("----------------------------------------------------");
  console.log("Deploying contract with account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");
  console.log("----------------------------------------------------");

  if (balance === 0n) {
    throw new Error("Insufficient funds: get some testnet ETH from a faucet first.");
  }

  const TokenFactory = await ethers.getContractFactory("Nbarbosa42");

  console.log("Broadcasting deployment transaction...");
  const token = await TokenFactory.deploy();

  await token.waitForDeployment();

  const tokenAddress = await token.getAddress();
  console.log("====================================================");
  console.log("SUCCESS! Token deployed to address:", tokenAddress);
  console.log("View on Etherscan: https://sepolia.etherscan.io/address/" + tokenAddress);
  console.log("====================================================");
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});