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
import "./interfaces/IDNFT.sol";

contract DNFT2 is ERC721, IDNFT{

    address  dnft1;
    address  dnft3;
    address immutable governanceAddress;

    constructor(address _governanceAddress) ERC721("Debond NFT2", "DNFT2") {
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
        require(msg.sender == ownerOf(id));
        _burn(id);
    }

    uint maxNftNumber;
    uint counter;
}