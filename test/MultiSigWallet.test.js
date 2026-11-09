import assert from "node:assert/strict";
import { describe, it, beforeEach } from "node:test";
import { network } from "hardhat";

describe("MultiSigWallet (Bonus)", function () {
  let token;
  let multiSig;
  let owner1;
  let owner2;
  let owner3;
  let nonOwner;
  let receiver;
  let ethers;

  beforeEach(async function () {
    ({ ethers } = await network.getOrCreate());
    [owner1, owner2, owner3, nonOwner, receiver] = await ethers.getSigners();

    // 1. Deploy NB42 token in simulated local network
    const TokenFactory = await ethers.getContractFactory("Nbarbosa42");
    token = await TokenFactory.deploy();
    await token.waitForDeployment();

    // 2. Deploy MultiSigWallet with 3 owners and 2 required confirmations
    const MultiSigFactory = await ethers.getContractFactory("MultiSigWallet");
    const owners = [owner1.address, owner2.address, owner3.address];
    multiSig = await MultiSigFactory.deploy(owners, 2, await token.getAddress());
    await multiSig.waitForDeployment();

    // 3. Fund MultiSigWallet with 1000 NB42 tokens for testing
    const fundAmount = ethers.parseEther("1000");
    await token.transfer(await multiSig.getAddress(), fundAmount);
  });

  describe("Deployment", function () {
    it("Should set the correct parameters", async function () {
      assert.equal(await multiSig.numConfirmationsRequired(), 2n);
      assert.equal(await multiSig.isOwner(owner1.address), true);
      assert.equal(await multiSig.isOwner(owner2.address), true);
      assert.equal(await multiSig.isOwner(owner3.address), true);
      assert.equal(await multiSig.isOwner(nonOwner.address), false);
    });

    it("Should hold the initial funded tokens", async function () {
      const balance = await token.balanceOf(await multiSig.getAddress());
      assert.equal(balance, ethers.parseEther("1000"));
    });
  });

  describe("Transaction Workflow", function () {
    it("Should reject transaction proposals from non-owners", async function () {
      await assert.rejects(
        async () => {
          await multiSig.connect(nonOwner).submitTransaction(receiver.address, ethers.parseEther("100"));
        },
        /Not an owner/i
      );
    });

    it("Should fail execution with only 1 confirmation", async function () {
      const amount = ethers.parseEther("100");

      // Owner 1 proposes the transaction (txIndex = 0)
      await multiSig.connect(owner1).submitTransaction(receiver.address, amount);

      // Owner 1 signs
      await multiSig.connect(owner1).confirmTransaction(0);

      // Attempt to execute before meeting threshold (1/2) -> must revert
      await assert.rejects(
        async () => {
          await multiSig.connect(owner1).executeTransaction(0);
        },
        /Not enough confirmations/i
      );
    });

    it("Should execute transfer once 2 owners confirm", async function () {
      const amount = ethers.parseEther("100");

      // 1. Owner 1 proposes
      await multiSig.connect(owner1).submitTransaction(receiver.address, amount);

      // 2. Owner 1 confirms
      await multiSig.connect(owner1).confirmTransaction(0);

      // 3. Owner 2 confirms (threshold 2 reached)
      await multiSig.connect(owner2).confirmTransaction(0);

      // 4. Execute transaction
      await multiSig.connect(owner1).executeTransaction(0);

      // Receiver must have received the 100 tokens
      const receiverBalance = await token.balanceOf(receiver.address);
      assert.equal(receiverBalance, amount);

      // Wallet balance must decrease to 900 tokens
      const multiSigBalance = await token.balanceOf(await multiSig.getAddress());
      assert.equal(multiSigBalance, ethers.parseEther("900"));
    });
  });
});
