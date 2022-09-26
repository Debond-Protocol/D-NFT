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

    error Deadline(uint deadline, uint blockTimeStamp);
    error PairNotAllowed();
    error RateNotHighEnough(uint currentRate, uint minRate);
    error INSUFFICIENT_AMOUNT(uint amount);
    error INSUFFICIENT_LIQUIDITY(uint liquidity);
    error WrongTokenAddress(address tokenAddress);

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";



//todo : grammaire( _ internal, majuscules etc), commentaires

contract Bank is BankRouter, GovernanceOwnable, ILiquidityRedeemable {

    using DebondMath for uint256;

    address public bankDataAddress;
    address public bondManagerAddress;
    address public debondBondAddress;
    enum PurchaseMethod {Buying, Staking}



    constructor(
        address _governanceAddress,
        address _APMAddress,
        address _bankBondManagerAddress,
        address _bankDataAddress,
        address _DBITAddress,
        address _DGOVAddress,
        address _USDCAddress,
        address _WETHAddress,
        address _oracleAddress,
        address _debondBondAddress
    ) GovernanceOwnable(_governanceAddress) BankRouter(_APMAddress, _DBITAddress, _DGOVAddress, _USDCAddress, _WETHAddress, _oracleAddress) {
        bondManagerAddress = _bankBondManagerAddress;
        bankDataAddress = _bankDataAddress;
        debondBondAddress = _debondBondAddress;
    }

}