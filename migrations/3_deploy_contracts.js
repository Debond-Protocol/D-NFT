const DNFTFactory = artifacts.require("DNFTFactory");
const DNFTBuyer = artifacts.require("DNFTBuyer");
const DNFTERC721 = artifacts.require("DNFTERC721");
const MysteryBoxTest = artifacts.require("MysteryBoxTest");


module.exports = async function (deployer, accounts) {
  await deployer.deploy(DNFTFactory);
  const dnftFactoryInstance = await DNFTFactory.deployed();
  await dnftFactoryInstance.cloneDNFTERC721("D/NFT Tier 0", "D/NFT0", "", "",1000);
  await dnftFactoryInstance.cloneDNFTERC721("D/NFT Tier 1", "D/NFT1", "", "",100);

  const tier0Address = await dnftFactoryInstance.clonedContracts(0);
  const tier1Address = await dnftFactoryInstance.clonedContracts(1);

  const mysteryBoxToken = await MysteryBoxTest.deployed();
  // const mysteryBoxToken = await MysteryBoxTest.at("0x22fd5F761D1E49B8b56f86D2Dba5AaF311d800d6");

  await deployer.deploy(DNFTBuyer, mysteryBoxToken.address, tier0Address, tier1Address).then(() => {
    console.log(`DNFTBuyer deployed with tier0Address: ${tier0Address}, tier1Address: ${tier1Address}`)
  })

  const tier0ERC721Instance = await DNFTERC721.at(tier0Address)
  const tier1ERC721Instance = await DNFTERC721.at(tier1Address)

  await tier0ERC721Instance.grantRole(await tier0ERC721Instance.MINTER_ROLE(), DNFTBuyer.address)
  await tier1ERC721Instance.grantRole(await tier1ERC721Instance.MINTER_ROLE(), DNFTBuyer.address)
};
