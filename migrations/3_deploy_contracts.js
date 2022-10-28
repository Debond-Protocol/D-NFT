const DNFTFactory = artifacts.require("TccERC721Factory");
const DNFTGovernance = artifacts.require("TccBuyer");
const DNFTERC721 = artifacts.require("TccERC721");

module.exports = async function (deployer, accounts) {
  await deployer.deploy(DNFTFactory);
  const tccERC721FactoryInstance = await DNFTFactory.deployed();
  await tccERC721FactoryInstance.cloneTccERC721("NOREAGA", "N.O.R.E");
  await tccERC721FactoryInstance.cloneTccERC721("DJ EFN", "EFN");
  await tccERC721FactoryInstance.cloneTccERC721("DRINK CHAMPS", "DC");

  const noreAddress = await tccERC721FactoryInstance.clonedContracts(0);
  const efnAddress = await tccERC721FactoryInstance.clonedContracts(1);
  const dcAddress = await tccERC721FactoryInstance.clonedContracts(2);

  await deployer.deploy(DNFTGovernance, noreAddress, efnAddress, dcAddress).then(() => {
    console.log(`TccBuyer deployed with NoreAddress: ${noreAddress}, EfnAddress: ${efnAddress}, DrinkChampsAddress: ${dcAddress}`)
  })

  const noreERC721Instance = await DNFTERC721.at(noreAddress)
  const efnERC721Instance = await DNFTERC721.at(efnAddress)
  const dcERC721Instance = await DNFTERC721.at(dcAddress)

  await noreERC721Instance.grantRole(await noreERC721Instance.MINTER_ROLE(), DNFTGovernance.address)
  await efnERC721Instance.grantRole(await efnERC721Instance.MINTER_ROLE(), DNFTGovernance.address)
  await dcERC721Instance.grantRole(await dcERC721Instance.MINTER_ROLE(), DNFTGovernance.address)
};

// TCC BUYER PROD: 0xd796a8754D7bc88EF6258E48d1D0Fc2Af0e533c7
