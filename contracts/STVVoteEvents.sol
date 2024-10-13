// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VoteCountingEvents {
    event VoteCast(address indexed voter, uint[] preferences);
    event VotesCounted(string[] winners);
}