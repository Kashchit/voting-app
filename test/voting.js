const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting Contract", function () {
    let Voting, voting, owner, voter1, voter2, voter3, voter4;

    beforeEach(async function () {
        // Deploy contract
        Voting = await ethers.getContractFactory("Voting");
        voting = await Voting.deploy(["Alice", "Bob", "Charlie", "David"]);
        await voting.waitForDeployment();

        // Get signers
        [owner, voter1, voter2, voter3, voter4] = await ethers.getSigners();
    });

    it("Should allow voting and prevent double voting", async function () {
        // Each voter votes once
        await voting.connect(voter1).vote(0); // Alice
        console.log(`Voter ${voter1.address} voted for Alice`);

        await voting.connect(voter2).vote(1); // Bob
        console.log(`Voter ${voter2.address} voted for Bob`);

        await voting.connect(voter3).vote(2); // Charlie
        console.log(`Voter ${voter3.address} voted for Charlie`);

        await voting.connect(voter4).vote(3); // David
        console.log(`Voter ${voter4.address} voted for David`);

        // Try double voting (should fail)
        await expect(voting.connect(voter1).vote(2)).to.be.revertedWith("You have already voted");
    });

    it("Should return the correct winner and log it", async function () {
        // Voting with multiple voters
        await voting.connect(voter1).vote(2); // Charlie
        console.log(`Voter ${voter1.address} voted for Charlie`);

        await voting.connect(voter2).vote(2); // Charlie
        console.log(`Voter ${voter2.address} voted for Charlie`);

        await voting.connect(voter3).vote(0); // Alice
        console.log(`Voter ${voter3.address} voted for Alice`);

        await voting.connect(voter4).vote(1); // Bob
        console.log(`Voter ${voter4.address} voted for Bob`);

        const winner = await voting.getWinner();
        console.log("🏆 The winner is:", winner);

        expect(winner).to.equal("Charlie");
    });
});
