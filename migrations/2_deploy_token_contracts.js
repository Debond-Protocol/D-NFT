const DBITTest = artifacts.require("DBITTest");
const MysteryBoxTest = artifacts.require("MysteryBoxTest");

module.exports = function (deployer, networks, accounts) {

    const [governanceAddress, bankAddress, airdropAddress, exchangeAddress] = accounts;


  deployer.deploy(DBITTest, governanceAddress, bankAddress, airdropAddress, exchangeAddress);
  deployer.deploy(MysteryBoxTest, governanceAddress, bankAddress, airdropAddress, exchangeAddress);
};
