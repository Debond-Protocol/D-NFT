const MysteryBoxTest = artifacts.require("MysteryBoxTest");
const DNFTERC721 = artifacts.require("DNFTERC721");


module.exports = async function (deployer, networks, accounts) {

  await deployer.deploy(MysteryBoxTest);
  await deployer.deploy(DNFTERC721);
};
