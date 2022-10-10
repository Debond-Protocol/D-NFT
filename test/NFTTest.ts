import {
    DNFTInstance,
    DNFT2Instance,
    DNFT3Instance,
    DBITTestInstance,
    MysteryBoxTestInstance
} from "../types/truffle-contracts";

const DNFT = artifacts.require("DNFT");
const DNFT2 = artifacts.require("DNFT2");
const DNFT3 = artifacts.require("DNFT3");
const DBITTest= artifacts.require("DBITTest");
const MysteryBoxtest = artifacts.require("MysteryBoxTest");


contract('DNFT', async (accounts: string[]) => {
    const [governanceAddress, bankAddress, ERC20Address, nft2Address] = accounts;
    let dNFTInstance: DNFTInstance
    let dNFT2Instance: DNFT2Instance
    let dNFT3Instance: DNFT3Instance
    let mysteryBoxTestInstance : MysteryBoxTestInstance
    let dBITTestInstance : DBITTestInstance

    before('Initialisation', async () => {
        dNFTInstance = await DNFT.deployed();
        dNFT2Instance = await DNFT2.deployed();
        dNFT3Instance = await DNFT3.deployed();
        mysteryBoxTestInstance = await MysteryBoxtest.deployed();
        dBITTestInstance = await DBITTest.deployed();
    })

    it('should change the bank address (only governance)', async () => {
    })
});
