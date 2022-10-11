const DNFT0 = artifacts.require("DNFT0");
const DNFT1 = artifacts.require("DNFT1");
const DNFT2 = artifacts.require("DNFT2");
const DNFT3 = artifacts.require("DNFT3");
const Governance = artifacts.require("gouvernance");



module.exports = async function (deployer, networks, accounts) {

  const [governanceAddress, bankAddress, airdropAddress, exchangeAddress, owner, DBIT, Mystery] = accounts;

  const dbit = await DBIT.deployed();
  const myst = await Mystery.deployed();
  const gov = await deployer.deploy(Governance, Mystery.address, owner)
  await deployer.deploy(DNFT0, myst.address, dbit.address, gov.address);
  await deployer.deploy(DNFT1, gov.address);
  await deployer.deploy(DNFT2, gov.address);
  await deployer.deploy(DNFT3, gov.address);
};
