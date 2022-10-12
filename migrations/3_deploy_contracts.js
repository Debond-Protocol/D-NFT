const DNFT0 = artifacts.require("DNFT0");
const DNFT1 = artifacts.require("DNFT1");
const DNFT2 = artifacts.require("DNFT2");
const DNFT3 = artifacts.require("DNFT3");
const Governance = artifacts.require("governance");
const DBITTest = artifacts.require("DBITTest");
const MysteryBoxTest = artifacts.require("MysteryBoxTest");




module.exports = async function (deployer, networks, accounts) {

  const [governanceAddress, bankAddress, airdropAddress, exchangeAddress, owner] = accounts;

  const dbit = await DBITTest.deployed();
  const myst = await MysteryBoxTest.deployed();
  await deployer.deploy(Governance, myst.address, owner)

  const gov = await Governance.deployed();
  await deployer.deploy(DNFT0, myst.address, dbit.address, gov.address);
  await deployer.deploy(DNFT1, gov.address);
  await deployer.deploy(DNFT2, gov.address);
  await deployer.deploy(DNFT3, gov.address);
};
