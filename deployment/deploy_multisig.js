import { network } from "hardhat";

async function main() {
  const { ethers } = await network.getOrCreate();

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");

  if (balance === 0n) {
    throw new Error("Insufficient funds: get some testnet ETH from a faucet first.");
  }

  const tokenAddress = "0xDA57D6DE7830428C144f054aFDf26e25814A319c";
  const numConfirmationsRequired = 2;

  // Adresses converties en minuscules pour eviter les rejets de checksum
  const owners = [
    deployer.address,
    "0x2b9284f45f1b8544e38e6e582845c48ba4a4164b".toLowerCase(),
    "0x70997970c51812dc3a010c7d01b50e0d17dc79c8".toLowerCase()
  ];

  console.log("Owners:", owners);
  console.log("Required confirmations:", numConfirmationsRequired);
  console.log("Token address:", tokenAddress);

  const MultiSigFactory = await ethers.getContractFactory("MultiSigWallet");

  console.log("Broadcasting deployment transaction...");
  const multiSig = await MultiSigFactory.deploy(
    owners,
    numConfirmationsRequired,
    tokenAddress
  );

  await multiSig.waitForDeployment();

  const multiSigAddress = await multiSig.getAddress();
  console.log("MultiSigWallet deployed to:", multiSigAddress);
  console.log("Etherscan URL: https://sepolia.etherscan.io/address/" + multiSigAddress);
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});
