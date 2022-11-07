const DNFTFactory = artifacts.require("DNFTFactory");
const DNFTBuyer = artifacts.require("DNFTBuyer");
const DNFTERC721 = artifacts.require("DNFTERC721");
const MysteryBoxTest = artifacts.require("MysteryBoxTest");


module.exports = async function (deployer, accounts) {
  await deployer.deploy(DNFTFactory);
  const dnftFactoryInstance = await DNFTFactory.deployed();
  await dnftFactoryInstance.cloneDNFTERC721("D/NFT Tier 0", "D/NFT0", "", "",10000);
  await dnftFactoryInstance.cloneDNFTERC721("D/NFT Tier 1", "D/NFT1", "", "",1000);
  await dnftFactoryInstance.cloneDNFTERC721("D/NFT Tier 2", "D/NFT2", "", "",500);
  await dnftFactoryInstance.cloneDNFTERC721("D/NFT Tier 3", "D/NFT3", "", "",100);

  const tier0Address = await dnftFactoryInstance.clonedContracts(0);
  const tier1Address = await dnftFactoryInstance.clonedContracts(1);
  const tier2Address = await dnftFactoryInstance.clonedContracts(2);
  const tier3Address = await dnftFactoryInstance.clonedContracts(3);

  const mysteryBoxToken = await MysteryBoxTest.deployed();

  await deployer.deploy(DNFTBuyer, mysteryBoxToken.address, tier0Address, tier1Address, tier2Address, tier3Address).then(() => {
    console.log(`DNFTBuyer deployed with tier0Address: ${tier0Address}, tier1Address: ${tier1Address}, tier2Address: ${tier2Address}, tier3Address: ${tier3Address}`)
  })

  const tier0ERC721Instance = await DNFTERC721.at(tier0Address)
  const tier1ERC721Instance = await DNFTERC721.at(tier1Address)
  const tier2ERC721Instance = await DNFTERC721.at(tier2Address)
  const tier3ERC721Instance = await DNFTERC721.at(tier3Address)

  await tier0ERC721Instance.grantRole(await tier0ERC721Instance.MINTER_ROLE(), DNFTBuyer.address)
  await tier1ERC721Instance.grantRole(await tier1ERC721Instance.MINTER_ROLE(), DNFTBuyer.address)
  await tier2ERC721Instance.grantRole(await tier2ERC721Instance.MINTER_ROLE(), DNFTBuyer.address)
  await tier3ERC721Instance.grantRole(await tier3ERC721Instance.MINTER_ROLE(), DNFTBuyer.address)
};