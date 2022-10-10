const DNFT = artifacts.require("DNFT");
const DNFT2 = artifacts.require("DNFT2");
const DNFT3 = artifacts.require("DNFT3");



module.exports = async function (deployer, networks, accounts) {

  const [governanceAddress, bankAddress, airdropAddress, exchangeAddress, owner, DBIT, Mystery] = accounts;

  const dbit = await DBIT.deployed();
  const myst = await Mystery.deployed();
  await deployer.deploy(DNFT, owner, dbit.address, myst.address);
  await deployer.deploy(DNFT2, owner);
  await deployer.deploy(DNFT3, owner);
};
