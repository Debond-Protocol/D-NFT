const DBITTest = artifacts.require("DBITTest");
const MysteryBoxTest = artifacts.require("MysteryBoxTest");

module.exports = async function (deployer, networks, accounts) {

    const [governanceAddress, bankAddress, airdropAddress, exchangeAddress] = accounts;


  await deployer.deploy(DBITTest, governanceAddress, bankAddress, airdropAddress, exchangeAddress);
  await deployer.deploy(MysteryBoxTest, governanceAddress, bankAddress, airdropAddress, exchangeAddress);
};
