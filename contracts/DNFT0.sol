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
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./RandomNumber.sol";
import "./interfaces/IDNFT.sol";


//todo : grammaire( _ internal, majuscules etc), commentaires

contract DNFT0 is ERC721{

    address immutable governanceAddress;
    address debondNFTTokenAddress;
    address dgovAddress;
    address dnft2;

    constructor(address _debondNFTTokenAddress, address _dgovAddress, address _governanceAddress)  ERC721("DBOND", "DBD") {
        debondNFTTokenAddress = _debondNFTTokenAddress;
        dgovAddress = _dgovAddress;
        governanceAddress = _governanceAddress;
    }

    modifier onlyGov {
        require(msg.sender == governanceAddress, "Gov: Need rights");
        _;
    } 

    function mint(address to) external onlyGov {
        _safeMint(to, counter);
        counter++;
    }

    function burn(uint id) external {
        require(msg.sender == ownerOf(id) || msg.sender == governanceAddress);
        _burn(id);
    }

    

    uint maxNftNumber = 10000;
    uint counter;

    

    function reveal(uint amount, address _to) external {
        require(counter + amount < maxNftNumber);
        IERC20(debondNFTTokenAddress).transferFrom(msg.sender, address(this), amount);//safeTransfer
        for (uint i; i < amount; i++) {
            _safeMint(_to, counter);
            counter ++;
        }

    }

    function forge(uint amount, address _to) external {
        require(counter + amount < maxNftNumber);
        (bool res) = IERC20(dgovAddress).transferFrom(msg.sender, address(this), amount); //safeTransfer
        require(res);
        for (uint i; i < amount; i++) {
            _safeMint(_to, counter);
            counter ++;
        }

    }        
}
