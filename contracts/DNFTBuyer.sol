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

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IDNFT.sol";


contract DNFTBuyer is Ownable {

    enum TIER {TIER0, TIER1, TIER2, TIER3}
    mapping(TIER => address) tiers;
    address mysteryBoxToken;
    bool public onPause = true;
    uint256 constant TIER1_COMPOSE = 10;
    uint256 constant TIER2_COMPOSE = 5;
    uint256 constant TIER3_COMPOSE = 2;
    uint256 BUY_PRICE = 25 * 10**16;

    constructor(address _mysteryBoxToken, address _dnft0, address _dnft1, address _dnft2, address _dnft3 ) {
        mysteryBoxToken = _mysteryBoxToken;
        tiers[TIER.TIER0] = _dnft0;
        tiers[TIER.TIER1] = _dnft1;
        tiers[TIER.TIER2] = _dnft2;
        tiers[TIER.TIER3] = _dnft3;
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


    function composeTier1(address _to, uint[] calldata tokenIds) external notPaused {
        require(tokenIds.length == TIER1_COMPOSE);
        require(IDNFT(tiers[TIER.TIER0]).isOwnerOf(msg.sender, tokenIds), "caller not owner of token ids given");
        _processCompose(_to, tokenIds, TIER.TIER0, TIER.TIER1);
    }

    function composeTier2(address _to, uint[] calldata tokenIds) external notPaused {
        require(tokenIds.length == TIER2_COMPOSE);
        require(IDNFT(tiers[TIER.TIER1]).isOwnerOf(msg.sender, tokenIds), "caller not owner of token ids given");
        _processCompose(_to, tokenIds, TIER.TIER1, TIER.TIER2);
    }

    function composeTier3(address _to, uint[] calldata tokenIds) external notPaused {
        require(tokenIds.length == TIER3_COMPOSE);
        require(IDNFT(tiers[TIER.TIER2]).isOwnerOf(msg.sender, tokenIds), "caller not owner of token ids given");
        _processCompose(_to, tokenIds, TIER.TIER2, TIER.TIER3);
    }

    function claim(address _to, uint quantity) external notPaused {
        IDNFT(tiers[TIER.TIER0]).mint(_to, quantity);
        IERC20(mysteryBoxToken).transferFrom(_to, address(this), quantity);
    }

    function buy(address _to, uint quantity) external payable notPaused {
        require(msg.value == BUY_PRICE * quantity, "DNFTBuyer: not the right amount of ETH sent to buy");
        IDNFT(tiers[TIER.TIER0]).mint(_to, quantity);
    }

    function withdrawToOwner() external onlyOwner {
        uint256 _amount = address(this).balance;
        require(_amount > 0, "No ETH to Withdraw");
        payable(_msgSender()).transfer(_amount);
    }

    function _processCompose(address _to, uint[] calldata ids, TIER tierLevelToBurn, TIER tierLevelToMint) internal {
        IDNFT(tiers[tierLevelToBurn]).burn(ids);
        IDNFT(tiers[tierLevelToMint]).mint(_to, 1);
    }








}