// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

contract test {
    uint count = 1;

    function inremment() public {
        count++;
    }
    function getCount() public view returns(uint256){
        return count;
    }
}
