// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title Token42 (Nbarbosa42)
 * @notice Implementation of a BEP-20 / ERC-20 token for the 42 Tokenizer project.
 * @dev Inherits from OpenZeppelin's standard ERC20 implementation.
 *      The contract adheres to the BEP-20 standard required by the BNB Chain.
 */
contract Nbarbosa42 is ERC20 {

    /**
     * @notice Initializes the token and mints the initial supply to the deployer.
     * @dev The constructor passes the token name and symbol to the parent ERC20 contract.
     *      - Name: "Nbarbosa42" (satisfies the mandatory 42 naming constraint).
     *      - Symbol: "Nb42" (ticker used on block explorers like BscScan).
     *
     * In the ERC-20 / BEP-20 standard:
     * - `decimals()` defaults to 18, meaning 1 token = 10^18 base units (wei equivalent).
     * - `_mint` is an internal OpenZeppelin function that:
     *     1. Increases the global `_totalSupply` by the specified amount.
     *     2. Credits the deployer's address (`msg.sender`) in the `_balances` mapping.
     *     3. Emits a standard `Transfer` event from the zero address (0x0).
     */
    constructor() ERC20("Nbarbosa42", "Nb42") {
        // Initial supply: 1,000,000 tokens scaled by 10^18 decimals.
        uint256 initialSupply = 1000000 * 10 ** decimals();

        // msg.sender represents the account initiating this deployment transaction.
        _mint(msg.sender, initialSupply);
    }

    /**
     * Note on inherited functions from OpenZeppelin ERC20:
     * ----------------------------------------------------
     * - totalSupply(): Returns the total circulating token supply.
     * - balanceOf(account): Returns the token balance of a specific address.
     * - transfer(recipient, amount): Moves tokens from msg.sender to recipient.
     * - allowance(owner, spender): Returns remaining tokens spender is allowed to withdraw from owner.
     * - approve(spender, amount): Authorizes a spender address to withdraw up to amount.
     * - transferFrom(sender, recipient, amount): Executes transfer on behalf of sender using allowance.
     */
}