
import { network } from "hardhat";

async function main() {
  const { ethers } = await network.getOrCreate();
  const walletAddress = "0x19B961a531e421f096148b35C700dB21ae427558";
  const tokenAddress = "0xDA57D6DE7830428C144f054aFDf26e25814A319c";

  // 1. Solde ETH (Sepolia)
  const ethBalance = await ethers.provider.getBalance(walletAddress);

  // 2. Solde Token NB42
  const token = await ethers.getContractAt("Nbarbosa42", tokenAddress);
  const tokenBalance = await token.balanceOf(walletAddress);
  const symbol = await token.symbol();

  console.log("==========================================");
  console.log("Compte        :", walletAddress);
  console.log("Solde SepETH  :", ethers.formatEther(ethBalance), "ETH");
  console.log("Solde Tokens  :", ethers.formatEther(tokenBalance), symbol);
  console.log("==========================================");
}

main().catch(console.error);