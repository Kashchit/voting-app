const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting Contract", function () {
    let Voting, voting, owner, addr1, addr2;

    beforeEach(async function () {
        Voting = await ethers.getContractFactory("Voting");
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy the contract and wait for deployment to finish
        voting = await Voting.deploy(["Alice", "Bob"]);
        await voting.waitForDeployment(); 
    });

    it("Should allow users to vote", async function () {
        await voting.connect(addr1).vote(0);
        const candidate = await voting.getCandidates();
        expect(candidate[0].voteCount).to.equal(1);
    });
});
