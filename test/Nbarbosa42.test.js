import assert from "node:assert/strict";
import { describe, it, beforeEach } from "node:test";
import { network } from "hardhat";

describe("Nbarbosa42 Token", function () {
  let token;
  let owner;
  let addr1;
  let addr2;
  let ethers;

  beforeEach(async function () {
    ({ ethers } = await network.getOrCreate()); // connect to local simulated network in Hardhat v3
    [owner, addr1, addr2] = await ethers.getSigners(); // 20 dummy account with 10000 eth
    const TokenFactory = await ethers.getContractFactory("Nbarbosa42"); // take the contract
    token = await TokenFactory.deploy(); //deploy dummy token in fake blockchain to owner account
    await token.waitForDeployment(); // wait for for validation 
  });

  describe("Deployment", function () {
    it("Should assign the total supply to the owner", async function () {
      const ownerBalance = await token.balanceOf(owner.address);
      const totalSupply = await token.totalSupply();
      assert.equal(ownerBalance, totalSupply);
    });

    it("Should have the correct name and symbol", async function () {
      assert.equal(await token.name(), "Nbarbosa42");
      assert.equal(await token.symbol(), "NB42");
    });
  });

  describe("Transfers", function () {
    it("Should transfer tokens between accounts", async function () {
      const amount = ethers.parseEther("50");

      // Transfer 50 tokens from owner to addr1
      await token.transfer(addr1.address, amount);
      const addr1Balance = await token.balanceOf(addr1.address);
      assert.equal(addr1Balance, amount);

      // Transfer 50 tokens from addr1 to addr2
      // .connect(addr1) sets msg.sender to addr1
      await token.connect(addr1).transfer(addr2.address, amount);
      const addr2Balance = await token.balanceOf(addr2.address);
      assert.equal(addr2Balance, amount);

      // addr1 should now have 0 tokens left
      const finalAddr1Balance = await token.balanceOf(addr1.address);
      assert.equal(finalAddr1Balance, 0n);
    });

    it("Should fail when sender does not have enough tokens", async function () {
      const initialOwnerBalance = await token.balanceOf(owner.address);

      // addr1 has 0 tokens, tries to send 1 token to owner
      await assert.rejects(
        async () => {
          await token.connect(addr1).transfer(owner.address, ethers.parseEther("1"));
        },
        /revert/i // Expect the EVM to revert the transaction
      );

      // Owner balance should remain strictly unchanged
      const ownerBalance = await token.balanceOf(owner.address);
      assert.equal(ownerBalance, initialOwnerBalance);
    });
  });

  describe("Allowances", function () {
    it("Should update allowance when approve is called", async function () {
      const amount = ethers.parseEther("100");

      await token.approve(addr1.address, amount);
      const allowance = await token.allowance(owner.address, addr1.address);
      assert.equal(allowance, amount);
    });

    it("Should transfer tokens via transferFrom within allowance limit", async function () {
      const amount = ethers.parseEther("100");

      await token.approve(addr1.address, amount);
      await token.connect(addr1).transferFrom(owner.address, addr2.address, ethers.parseEther("40"));

      const addr2Balance = await token.balanceOf(addr2.address);
      assert.equal(addr2Balance, ethers.parseEther("40"));

      const remainingAllowance = await token.allowance(owner.address, addr1.address);
      assert.equal(remainingAllowance, ethers.parseEther("60"));
    });

    it("Should fail when transferFrom exceeds allowance", async function () {
      const amount = ethers.parseEther("50");

      await token.approve(addr1.address, amount);

      await assert.rejects(
        async () => {
          await token.connect(addr1).transferFrom(owner.address, addr2.address, ethers.parseEther("51"));
        },
        /revert/i
      );
    });
  });
});