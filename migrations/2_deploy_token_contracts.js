const MysteryBoxTest = artifacts.require("MysteryBoxTest");

module.exports = async function (deployer, networks, accounts) {

  await deployer.deploy(MysteryBoxTest);
};
