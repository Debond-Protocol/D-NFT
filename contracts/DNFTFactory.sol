// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./DNFTERC721.sol";


contract DNFTFactory is Ownable {


    address public impl;
    address[] public clonedContracts;

    constructor() {
        impl = address(new DNFT());
    }

    function cloneTccERC721(string calldata _name, string calldata _symbol) external onlyOwner   {
        address payable clone = payable(Clones.clone(impl));
        TccERC721(clone).initialize(_name, _symbol, msg.sender);
        clonedContracts.push(clone);
    }
}
