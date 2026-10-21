// SPDX-License-Identifier: MIT
pragma solidity >=0.8.20 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MultiSigWallet {
    // 1. Les paramètres du coffre-fort
    address[] public owners;
    mapping(address => bool) public isOwner;
    uint256 public numConfirmationsRequired;
    IERC20 public token; // L'adresse de ton token NB42

    // 2. La structure d'un transfert de tokens
    struct Transaction {
        address to;               // Qui va recevoir les tokens NB42
        uint256 amount;           // Combien de tokens NB42 on envoie
        bool executed;            // Est-ce que le transfert a déjà eu lieu ?
        uint256 numConfirmations; // Combien d'admins ont signé
    }

    Transaction[] public transactions;
    // txIndex => (admin => a_signé ?)
    mapping(uint256 => mapping(address => bool)) public isConfirmed;

    // 3. Sécurité : seul un admin déclaré peut agir
    modifier onlyOwner() {
        require(isOwner[msg.sender], "Not an owner");
        _;
    }

    // 4. Création du coffre-fort
    constructor(
        address[] memory _owners,
        uint256 _numConfirmationsRequired,
        address _tokenAddress
    ) {
        require(_owners.length > 0, "Owners required");
        require(
            _numConfirmationsRequired > 0 && _numConfirmationsRequired <= _owners.length,
            "Invalid number of required confirmations"
        );

        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            require(owner != address(0), "Invalid owner");
            require(!isOwner[owner], "Owner not unique");

            isOwner[owner] = true;
            owners.push(owner);
        }

        numConfirmationsRequired = _numConfirmationsRequired;
        token = IERC20(_tokenAddress); // On lie le contrat à NB42
    }

    // Étape 1 : Un admin propose d'envoyer des tokens
    function submitTransaction(address _to, uint256 _amount) public onlyOwner {
        transactions.push(
            Transaction({
                to: _to,
                amount: _amount,
                executed: false,
                numConfirmations: 0
            })
        );
    }

    // Étape 2 : Un admin valide la demande n° txIndex
    function confirmTransaction(uint256 _txIndex) public onlyOwner {
        require(_txIndex < transactions.length, "Tx does not exist");
        require(!transactions[_txIndex].executed, "Tx already executed");
        require(!isConfirmed[_txIndex][msg.sender], "Tx already confirmed");

        transactions[_txIndex].numConfirmations += 1;
        isConfirmed[_txIndex][msg.sender] = true;
    }

    // Étape 3 : On débloque l'envoi si le quota de signatures est atteint
    function executeTransaction(uint256 _txIndex) public onlyOwner {
        require(_txIndex < transactions.length, "Tx does not exist");
        require(!transactions[_txIndex].executed, "Tx already executed");

        Transaction storage txn = transactions[_txIndex];

        require(
            txn.numConfirmations >= numConfirmationsRequired,
            "Not enough confirmations"
        );

        txn.executed = true;

        // LE VRAI TRANSFERT DE TOKENS NB42 :
        bool success = token.transfer(txn.to, txn.amount);
        require(success, "Token transfer failed");
    }
}