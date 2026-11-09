
# Colors
GREEN   = \033[0;32m
BLUE    = \033[0;34m
YELLOW  = \033[0;33m
RED     = \033[0;31m
RESET   = \033[0m

.PHONY: all help install compile test balance clean fclean re

all: compile

help:
	@echo "$(BLUE)=== Tokenizer Evaluation Commands ===$(RESET)"
	@echo "  $(GREEN)make compile$(RESET)   - Compile Solidity smart contracts"
	@echo "  $(GREEN)make test$(RESET)      - Run the unit test suite"
	@echo "  $(GREEN)make balance$(RESET)   - Query SepETH and NB42 balances via RPC"
	@echo "  $(GREEN)make clean$(RESET)     - Remove cache and Hardhat build artifacts"
	@echo "  $(GREEN)make fclean$(RESET)    - Full clean including temporary flattened files"
	@echo "  $(GREEN)make install$(RESET)   - Install npm project dependencies"

install:
	@echo "$(YELLOW)Installing npm dependencies...$(RESET)"
	npm install

compile:
	@echo "$(YELLOW)Compiling smart contracts...$(RESET)"
	npx hardhat compile

test:
	@echo "$(YELLOW)Running unit tests...$(RESET)"
	npx hardhat test

balance:
	@echo "$(YELLOW)Querying on-chain balances (Sepolia)...$(RESET)"
	npx hardhat run check_balance.js --network sepolia

clean:
	@echo "$(RED)Removing cache and build artifacts...$(RESET)"
	npx hardhat clean
	rm -rf cache artifacts

fclean: clean
	@echo "$(RED)Removing all temporary files...$(RESET)"
	rm -f code/*_flat.sol

re: fclean all
deploy-multisig:
	@echo "$(YELLOW)Deploying MultiSigWallet to Sepolia...$(RESET)"
	npx hardhat run deployment/deploy_multisig.js --network sepolia
