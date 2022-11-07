// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./DNFTERC721.sol";


contract DNFTFactory is Ownable {


    address public impl;
    address[] public clonedContracts;

    constructor() {
        impl = address(new DNFTERC721());
    }

    function cloneDNFTERC721(
        string calldata _name,
        string calldata _symbol,
        string calldata _notRevealedURI,
        string calldata _baseURI,
        uint _totalSupply
    ) external onlyOwner   {
        address payable clone = payable(Clones.clone(impl));
        DNFTERC721(clone).initialize(_name, _symbol, _notRevealedURI, _baseURI, _totalSupply, msg.sender);
        clonedContracts.push(clone);
    }
}
