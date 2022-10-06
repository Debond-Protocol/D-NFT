pragma solidity 0.8.17;

interface IPseudoRandom {
    function pickRandomNumber() external view returns (uint index);
}