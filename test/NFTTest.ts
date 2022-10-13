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
        await dBITTestInstance.mintCollateralisedSupply(owner, web3.utils.toWei('1000', 'ether').toString(), {from : bankAddress});
        await mysteryBoxTestInstance.mint(owner, web3.utils.toWei('2000', 'ether').toString(), {from : bankAddress});

        const dbit = await dBITTestInstance.balanceOf(owner);
        console.log(dbit.toString())

    })

    it('reveal and forge nft', async () => {
        await mysteryBoxTestInstance.approve(dNFT0Instance.address, web3.utils.toWei('1000', 'ether').toString(), {from : owner});
        await dNFT0Instance.reveal('30', owner, {from : owner});

        const balance = await (dNFT0Instance.balanceOf(owner));
        expect((balance.toString())).to.equal('30')

        await dBITTestInstance.approve(dNFT0Instance.address, web3.utils.toWei('2000', 'ether').toString(), {from : owner});
        await dNFT0Instance.forge('50', owner, {from : owner});

        const balanceBis = await (dNFT0Instance.balanceOf(owner));
        expect((balanceBis.toString())).to.equal('80')

        const dbitAfter = await dBITTestInstance.balanceOf(owner);
        expect(dbitAfter.toString()).to.equal(web3.utils.toWei('950', 'ether').toString())

        const mystAfter = await mysteryBoxTestInstance.balanceOf(owner);
        expect(mystAfter.toString()).to.equal(web3.utils.toWei('1970', 'ether').toString())
    })

    it('compose nft', async () => {
        await governanceInstance.compose(owner, [0,1,2,3,4,5,6,7,8,9],0);
        const balance1 = await dNFT1Instance.balanceOf(owner);
        expect(balance1.toString()).to.equal('1');

        const balance0 = await dNFT0Instance.balanceOf(owner);
        expect(balance0.toString()).to.equal('70');
    })
});
