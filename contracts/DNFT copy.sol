pragma solidity ^0.8.0;

// SPDX-License-Identifier: apache 2.0
/*
    Copyright 2022 Debond Protocol <info@debond.org>
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./RandomNumber.sol";
import "./PseudoRandom.sol";


//todo : grammaire( _ internal, majuscules etc), commentaires

contract DNFT is ERC721, PseudoRandom{

    address immutable governanceAddress;
    address immutable debondNFTTokenAddress;
    address immutable dgovAddress;

    constructor(address _governanceAddress, address _debondNFTTokenAddress, address _dgovAddress ) ERC721("DBOND", "DBD") PseudoRandom(10){
        governanceAddress = _governanceAddress;
        debondNFTTokenAddress = _debondNFTTokenAddress;
        dgovAddress = _dgovAddress;
    }

    /*modifier onlyGov {
        require(msg.sender == governanceAddress, "Gov: Need rights");
        _;
    }    

    function mint(address to, uint id) external onlyGov {
        _safeMint(to, id);
    }

    function burn(uint id) external {
        require(msg.sender == ownerOf(id));
        _burn(id);
    }

    function reveal(uint amount, address _to) external {
        IERC20(debondNFTTokenAddress).transfer(msg.sender, amount *1000000000000000000); //safeTransfer
        for (uint i; i < amount - 1; i++) {
            //uint randomId = RandomNumber.getRandomNumber();
            //_safeMint(_to, randomId);
        }
    }*/
    uint maxNftNumber;
    uint counter;

    function reveal(uint amount, address _to) external {
        require(counter + amount < maxNftNumber);
        IERC20(debondNFTTokenAddress).transfer(msg.sender, amount *1000000000000000000); //safeTransfer
        for (uint i; i < amount - 1; i++) {
            _safeMint(_to, counter);
            counter ++;
        }

    }

    function forge(uint amount, address _to) external {
        require(counter + amount < maxNftNumber);
        IERC20(dgovAddress).transfer(msg.sender, amount *1000000000000000000); //safeTransfer
        for (uint i; i < amount - 1; i++) {
            _safeMint(_to, counter);
            counter ++;
        }

    }

    function compose (address _to) external {
            
    }







        
}