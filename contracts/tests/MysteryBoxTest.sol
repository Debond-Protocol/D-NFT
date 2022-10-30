pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MysteryBoxTest is ERC20 {

    constructor() ERC20("MysteryBoxTest", "MTB") {}

    function mint(address _to, uint amount) external {
        _mint(_to, amount);
    }

    function decimals() public pure override returns (uint8) {
        return 0;
    }
}
