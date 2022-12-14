pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@debond-protocol/debond-token-contracts/DBIT.sol";




contract MysteryBoxTest is ERC20 {

    constructor(
        address governanceAddress,
        address bankAddress,
        address airdropAddress,
        address exchangeAddress
    ) ERC20("MysteryBoxTest", "MTB") {}

    function mint(address _to, uint amount) external {
        _mint(_to, amount);
    }
}
