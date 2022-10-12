import {
    DNFT0Instance,
    DNFT1Instance,
    DNFT2Instance,
    DNFT3Instance,
    GovernanceInstance,
    DBITTestInstance,
    MysteryBoxTestInstance
} from "../types/truffle-contracts";

const DNFT0 = artifacts.require("DNFT0");
const DNFT1 = artifacts.require("DNFT1");
const DNFT2 = artifacts.require("DNFT2");
const DNFT3 = artifacts.require("DNFT3");
const Governance = artifacts.require("governance");
const DBITTest= artifacts.require("DBITTest");
const MysteryBoxtest = artifacts.require("MysteryBoxTest");


contract('DNFT', async (accounts: string[]) => {
    const [governanceAddress, bankAddress, airdropAddress, exchangeAddress, owner] = accounts;
    let dNFT0Instance: DNFT0Instance
    let dNFT1Instance: DNFT1Instance
    let dNFT2Instance: DNFT2Instance
    let dNFT3Instance: DNFT3Instance
    let mysteryBoxTestInstance : MysteryBoxTestInstance
    let dBITTestInstance : DBITTestInstance
    let governanceInstance : GovernanceInstance

    before('Initialisation', async () => {
        dNFT0Instance = await DNFT0.deployed();
        dNFT1Instance = await DNFT1.deployed();
        dNFT2Instance = await DNFT2.deployed();
        dNFT3Instance = await DNFT3.deployed();
        mysteryBoxTestInstance = await MysteryBoxtest.deployed();
        dBITTestInstance = await DBITTest.deployed();
        governanceInstance = await Governance.deployed();

        await governanceInstance.initialize(DNFT0.address, DNFT1.address, DNFT2.address, DNFT3.address, {from : owner})
        await dBITTestInstance.mintCollateralisedSupply(owner, web3.utils.toWei('2000000000000000000000', 'ether').toString(), {from : bankAddress});
        await mysteryBoxTestInstance.mint(owner, web3.utils.toWei('2000000000000000000', 'ether').toString(), {from : bankAddress});

        const mystBalance = await mysteryBoxTestInstance.balanceOf(owner);
        console.log(mystBalance.toString())

    })

    it('reveal nft', async () => {
        //await mysteryBoxTestInstance.approve(dNFT0Instance.address,web3.utils.toWei('20000000000000000', 'ether').toString() )
        await dNFT0Instance.reveal(1, owner, {from : owner});
    })
});
