pragma solidity 0.8.17;

interface IDNFT {
    function mint(address to) external;

    function burn(uint id) external;
}