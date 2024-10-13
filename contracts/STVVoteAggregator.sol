// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./STVVoteCounting.sol";

contract STVVoteAggregator is STVVoteCounting {
    string[] public winners;

    constructor(string[] memory candidateNames) STVVoteCounting(candidateNames) {}

    function countVotes() public override {
        // Implement STV counting logic here
        // Add logic to determine winners based on voteCount
        emit VotesCounted(winners);
    }

    function getWinners() public view returns (string[] memory) {
        return winners;
    }
}