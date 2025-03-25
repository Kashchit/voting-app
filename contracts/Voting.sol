// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "hardhat/console.sol";

contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }

    Candidate[] public candidates;
    mapping(address => bool) public hasVoted;

    constructor(string[] memory _candidateNames) {
        for (uint i = 0; i < _candidateNames.length; i++) {
            candidates.push(Candidate({
                name: _candidateNames[i],
                voteCount: 0
            }));
        }
    }

    function vote(uint candidateIndex) public {
        require(!hasVoted[msg.sender], "You have already voted!");
        require(candidateIndex < candidates.length, "Invalid candidate index!");

        hasVoted[msg.sender] = true;
        candidates[candidateIndex].voteCount++;

        console.log("Voter %s voted for %s", msg.sender, candidates[candidateIndex].name);
    }

    function getWinner() public view returns (string memory) {
        uint maxVotes = 0;
        string memory winnerName = "";
        bool tie = false;

        for (uint i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > maxVotes) {
                maxVotes = candidates[i].voteCount;
                winnerName = candidates[i].name;
                tie = false;
            } else if (candidates[i].voteCount == maxVotes) {
                tie = true;
            }
        }

        if (tie) {
            return "It's a tie!";
        }
        
        return winnerName;
    }

    function getAllVotes() public view returns (Candidate[] memory) {
        return candidates;
    }
}
