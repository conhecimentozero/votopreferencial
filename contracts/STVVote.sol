// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./STVVoteStorage.sol";
import "./STVVoteAggregator.sol";

contract STVVote is STVVoteAggregator {
    constructor(string[] memory candidateNames) STVVoteAggregator(candidateNames) {}

    function vote(uint[] memory preferences) public override {
        recordVote(preferences);
    }

    function countVotes() public override {
        super.countVotes();
    }

    function getWinners() public view override returns (string[] memory) {
        return winners;
    }
}