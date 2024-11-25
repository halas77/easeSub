// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Mock is ERC20 {
    constructor() ERC20("USDe", "USDe") {
        uint256 initialBalance = 10000000000000000000000000;
        _mint(msg.sender, initialBalance);
    }
}


// SubscriptionManagerModule#ERC20Mock - 0x549f3AAe56144a639dad73B170effDdfBcCaB1Fb
// SubscriptionManagerModule#SubscriptionManager - 0xa905484b7E7CFFA7D03e79E6Ad99F2dDc4e1048C