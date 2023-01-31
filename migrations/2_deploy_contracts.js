const DNFTBuyer = artifacts.require("DNFTBuyer");
const DNFT0 = artifacts.require("DNFT0");
const DNFT1 = artifacts.require("DNFT1");
const MysteryBoxTest = artifacts.require("MysteryBoxTest");


module.exports = async function (deployer, accounts) {
  await deployer.deploy(DNFT0, "D/NFT Tier 0", "D/NFT0", "", "",1000);
  await deployer.deploy(DNFT1, "D/NFT Tier 1", "D/NFT1", "", "",100);


  // const mysteryBoxToken = await MysteryBoxTest.deployed();
  const tier0 = await DNFT0.deployed();
  const tier1 = await DNFT1.deployed();
  const mysteryBoxToken = await MysteryBoxTest.at("0x22fd5F761D1E49B8b56f86D2Dba5AaF311d800d6");

  await deployer.deploy(DNFTBuyer, mysteryBoxToken.address, tier0.address, tier1.address).then(() => {
    console.log(`DNFTBuyer deployed with tier0Address: ${tier0.address}, tier1Address: ${tier1.address}`)
  })

  await tier0.grantRole(await tier0.MINTER_ROLE(), DNFTBuyer.address)
  await tier1.grantRole(await tier1.MINTER_ROLE(), DNFTBuyer.address)
};
