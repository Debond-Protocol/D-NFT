import {
    DNFTBuyerInstance,
    DNFTERC721Instance,
    MysteryBoxTestInstance
} from "../types/truffle-contracts";

const DNFTFactory = artifacts.require("DNFTFactory");
const DNFTBuyer = artifacts.require("DNFTBuyer");
const DNFTERC721 = artifacts.require("DNFTERC721");
const MysteryBoxtest = artifacts.require("MysteryBoxTest");


contract('DNFT', async (accounts: string[]) => {

    const [owner, claimer, buyer] = accounts;
    let dnftBuyerInstance: DNFTBuyerInstance;
    let tier0ERC721Instance: DNFTERC721Instance;
    let tier1ERC721Instance: DNFTERC721Instance;
    let tier2ERC721Instance: DNFTERC721Instance;
    let tier3ERC721Instance: DNFTERC721Instance;
    let mysteryBoxTokenInstance: MysteryBoxTestInstance


    before('Initialisation', async () => {
        const dnftFactoryInstance = await DNFTFactory.deployed();
        const tier0Address = await dnftFactoryInstance.clonedContracts(0);
        const tier1Address = await dnftFactoryInstance.clonedContracts(1);
        // // const tier2Address = await dnftFactoryInstance.clonedContracts(2);
        // const tier3Address = await dnftFactoryInstance.clonedContracts(3);

        tier0ERC721Instance = await DNFTERC721.at(tier0Address)
        tier1ERC721Instance = await DNFTERC721.at(tier1Address)
        // tier2ERC721Instance = await DNFTERC721.at(tier2Address)
        // tier3ERC721Instance = await DNFTERC721.at(tier3Address)

        dnftBuyerInstance = await DNFTBuyer.deployed();
        await dnftBuyerInstance.setPauseOff();

        mysteryBoxTokenInstance = await MysteryBoxtest.deployed();
        await mysteryBoxTokenInstance.mint(claimer, 3);
    })

    it('Mystery Box ERC20 Token Holder Should be able to claim a Tier 0 DNFT', async () => {
        await mysteryBoxTokenInstance.approve(dnftBuyerInstance.address, 2, {from: claimer});
        await dnftBuyerInstance.claim(claimer, 2, {from: claimer})

        const claimerDNFT0Balance = (await tier0ERC721Instance.balanceOf(claimer)).toNumber();
        const tier0MysteryBoxBalance = (await mysteryBoxTokenInstance.balanceOf(dnftBuyerInstance.address)).toNumber()

        assert.isTrue(claimerDNFT0Balance == tier0MysteryBoxBalance);
    })

    it('Buyer Should be able to purchase DNFT TIER0 with ETH value Price', async () => {
        // await dnftBuyerInstance.buy(buyer, 2, {from: buyer, value: web3.utils.toWei('0.05', 'ether')})
        const buyerDNFT0Balance = (await tier0ERC721Instance.balanceOf(buyer)).toNumber();

        assert.isTrue(buyerDNFT0Balance == 2);
    })

    it('Holder of DNFT Tier0 Should be able to compose a DNFT Tier1', async () => {
        // await dnftBuyerInstance.buy(buyer, 8, {from: buyer, value: web3.utils.toWei('0.2', 'ether')})
        const tokenIds = [2,3,4,5,6,7,8,9,10,11];
        await dnftBuyerInstance.composeTier1(buyer, tokenIds, {from: buyer})
        const buyerDNFT0Balance = (await tier0ERC721Instance.balanceOf(buyer)).toNumber();
        const buyerDNFT1Balance = (await tier1ERC721Instance.balanceOf(buyer)).toNumber();

        assert.isTrue(buyerDNFT0Balance == 0);
        assert.isTrue(buyerDNFT1Balance == 1);
    })
});
