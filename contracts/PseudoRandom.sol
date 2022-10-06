pragma solidity 0.8.17;

import "./interfaces/IPseudoRandom.sol" ;
contract PseudoRandom is IPseudoRandom {

uint NftNumber;

constructor(uint _NftNumber)  {
        NftNumber = _NftNumber;
    }


    function random() private view returns (uint) {
            //counter++;
            return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, NftNumber)));
    }

    function pickRandomNumber() public view returns (uint index) {
        index = random() % 100;
    }
}