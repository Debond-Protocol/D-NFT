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

import "@openzeppelin/contracts/access/Ownable.sol";

contract DNFTBuyer is Ownable {

    enum TIER {TIER0, TIER1, TIER2, TIER3}
    mapping(TIER => address) tiers;
    address mysteryBoxToken;
    bool public onPause = true;

    constructor(address _mysteryBoxToken, address _dnft0, address _dnft1, address _dnft2, address _dnft3 ) external {
        mysteryBoxToken = _mysteryBoxToken;
        tiers[TIER0] = _dnft0;
        tiers[TIER1] = _dnft1;
        tiers[TIER2] = _dnft2;
        tiers[TIER3] = _dnft3;
    }

    modifier notPaused() {
        require(!onPause, "DNFTGovernance Error: cannot process on Pause");
        _;
    }

    function setPauseOn() public onlyOwner {
        require(onPause == false, "Pause Already on ");
        onPause = true;
    }

    function setPauseOff() public onlyOwner {
        require(onPause == true, "Pause Already off");
        onPause = false;
    }


    function compose (address _to, uint[] memory ids, uint typeToBurn) external {
        require(ids.length == 10);
        for (uint i; i < ids.length; i++) {
            IDNFT(tier[typeToBurn]).burn(ids[i]);
        }
        IDNFT(tier[typeToBurn +1]).mint(_to);
    }

    function stake(uint[] memory ids, uint typeToStack) external {
        
    }

    function claim(uint amount, address _to) external {
        require(counter + amount < maxNftNumber);
        IERC20(debondNFTTokenAddress).transferFrom(msg.sender, address(this), amount* (1 ether));//safeTransfer
        for (uint i; i < amount; i++) {
            _safeMint(_to, counter);
            counter ++;
        }

    }

    function forge(uint amount, address _to) external {
        require(counter + amount < maxNftNumber);
        (bool res) = IERC20(dgovAddress).transferFrom(msg.sender, address(this), amount* (1 ether)); //safeTransfer
        require(res);
        for (uint i; i < amount; i++) {
            _safeMint(_to, counter);
            counter ++;
        }

    }








}