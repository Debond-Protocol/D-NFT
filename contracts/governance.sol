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




contract governance{

    
    address dnft0;
    address dnft1;
    address dnft2;
    address dnft3;
    //address immutable owner;
    address immutable debondNFTTokenAddress;
    address immutable owner;

    mapping(uint=> address) tier;

    constructor(address _debondNFTTokenAddress, address _owner)  {
        debondNFTTokenAddress = _debondNFTTokenAddress;
        owner = _owner;
        

    }
    function initialize(address _dnft0, address _dnft1, address _dnft2, address _dnft3 ) external {
        require(msg.sender == owner);
        dnft0 = _dnft0;
        dnft1 = _dnft1;
        dnft2 = _dnft2;
        dnft3 = _dnft3;
        tier[0] = _dnft0; 
        tier[1] = _dnft1; 
        tier[2] = _dnft2; 
        tier[3] = _dnft3; 
    }


    function compose (address _to, uint[] memory ids, uint typeToBurn) external {
        require(ids.length == 10);
        for (uint i; i < ids.length - 1; i++) {
            IDNFT(tier[typeToBurn]).burn(ids[i]);
        }
        IDNFT(tier[typeToBurn +1]).mint(_to);
    }

    function stake(uint[] memory ids, uint typeToStack) external {
        
    }







        
}