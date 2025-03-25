const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting Contract", function () {
  let Voting, voting, owner, voter1, voter2, voter3, voter4;

  beforeEach(async function () {
    [owner, voter1, voter2, voter3, voter4] = await ethers.getSigners();
    const candidateNames = ["Alice", "Bob", "Charlie", "David"];
    Voting = await ethers.getContractFactory("Voting");
    voting = await Voting.deploy(candidateNames);
    await voting.waitForDeployment();
  });

  it("Should allow voting and prevent double voting", async function () {
    await voting.connect(voter1).vote(0); // Alice
    await voting.connect(voter2).vote(1); // Bob
    await voting.connect(voter3).vote(2); // Charlie
    await voting.connect(voter4).vote(3); // David

    const candidates = await voting.getAllVotes();
    expect(candidates[0].voteCount).to.equal(1);
    expect(candidates[1].voteCount).to.equal(1);
    expect(candidates[2].voteCount).to.equal(1);
    expect(candidates[3].voteCount).to.equal(1);

    await expect(voting.connect(voter1).vote(2)).to.be.revertedWith("You have already voted!");
  });

  it("Should return the correct winner", async function () {
    await voting.connect(voter1).vote(2); // Charlie
    await voting.connect(voter2).vote(2); // Charlie
    await voting.connect(voter3).vote(0); // Alice
    await voting.connect(voter4).vote(1); // Bob

    const winner = await voting.getWinner();
    expect(winner).to.equal("Charlie");
  });
});
