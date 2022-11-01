import * as fs from "fs";
import * as path from "path";
import {PathLike} from "fs";


interface NftCollection {
    name: string,
    dirName: string,
    description: string,
    totalSupply: number,
}

class Tier0 implements NftCollection {
    name = "D/NFT Tier 0";
    dirName = "TIER0";
    description = "Tier 0 D/NFT is the 1st level of the Debond Nft ecosystem"
    totalSupply = 10000;
}

class Tier1 implements NftCollection {
    name = "D/NFT Tier 1";
    dirName = "TIER1";
    description = "Tier 1 D/NFT is the 2nd level of the Debond Nft ecosystem"
    totalSupply = 10000;
}

class Tier2 implements NftCollection {
    name = "D/NFT Tier 2";
    dirName = "TIER2";
    description = "Tier 2 D/NFT is the 3rd level of the Debond Nft ecosystem"
    totalSupply = 10000;
}

class Tier3 implements NftCollection {
    name = "D/NFT Tier 3";
    dirName = "TIER3";
    description = "Tier 3 D/NFT is the 4th level of the Debond Nft ecosystem"
    totalSupply = 10000;
}


function createMetadataFiles(): void {
    const dir = path.dirname(__filename) + "/drop_metadata"
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    generateRandomMetadatas(dir)
}


function generateRandomMetadatas(mainDir: PathLike) {
    const tier0 = new Tier0();
    const tier1 = new Tier1();
    const tier2 = new Tier2();
    const tier3 = new Tier3();

    const tier0Dir = mainDir + "/" + tier0.dirName
    const tier1Dir = mainDir + "/" + tier1.dirName
    const tier2Dir = mainDir + "/" + tier2.dirName
    const tier3Dir = mainDir + "/" + tier3.dirName
    if (!fs.existsSync(tier0Dir)){
        fs.mkdirSync(tier0Dir);
    }
    if (!fs.existsSync(tier1Dir)){
        fs.mkdirSync(tier1Dir);
    }
    if (!fs.existsSync(tier2Dir)){
        fs.mkdirSync(tier2Dir);
    }
    if (!fs.existsSync(tier3Dir)){
        fs.mkdirSync(tier3Dir);
    }

    generateNftMetadatas(tier0, tier0Dir)
    generateNftMetadatas(tier1, tier1Dir)
    generateNftMetadatas(tier2, tier2Dir)
    generateNftMetadatas(tier3, tier3Dir)
}

function generateNftMetadatas(nftCollection: NftCollection, dir: PathLike) {
    writeMetadata(0, nftCollection, EditionType.DIAMOND, dir)
    let randomIds = [];
    while(randomIds.length < nftCollection.totalSupply - 1){
        let r = Math.floor(Math.random() * (nftCollection.totalSupply - 1)) + 1
        if(randomIds.indexOf(r) === -1) {
            randomIds.push(r);
        }
    }
    if (hasDuplicates(randomIds)) {
        throw Error
    }
    randomIds.forEach(((id) => {
        if(nftCollection.silverEdition.tokenCounter <= SILVER.totalSupply) {
            writeMetadata(id, nftCollection, EditionType.SILVER, dir)
            nftCollection.silverEdition.tokenCounter++
        } else if(nftCollection.goldEdition.tokenCounter <= GOLD.totalSupply) {
            writeMetadata(id, nftCollection, EditionType.GOLD, dir)
            nftCollection.goldEdition.tokenCounter++
        } else if(nftCollection.blackEdition.tokenCounter <= BLACK.totalSupply) {
            writeMetadata(id, nftCollection, EditionType.BLACK, dir)
            nftCollection.blackEdition.tokenCounter++
        }
    }))
}

function writeMetadata(id: number, nftCollection: NftCollection, dir: PathLike) {
    fs.writeFile(
        dir + `/${id}`,
        generateData(id, nftCollection),
        err => {
            err ? console.log(err) : ""
        }
    )
}

function generateData(
    id: number,
    nftCollection: NftCollection
): string {
    let nftEdition;
    return JSON.stringify({
        "image": `https://ipfs.io/ipfs/${nftEdition.imageCID}`,
        "name": `${nftCollection.name} ${nftEdition.name} ${nftEdition.tokenCounter}/${nftEdition.totalSupply}`,
        "description": nftCollection.description,
        "animation_url": `https://ipfs.io/ipfs/${nftEdition.animationCID}`,
        "external_url": "https://theculturecards.io",
        "attributes": [
            {
                "trait_type": "Total Score",
                "value": (nftCollection.totalScore + nftEdition.value).toString(),
            },
            {
                "trait_type": "Edition",
                "value": nftEdition.name,
            },
            {
                "trait_type": "Average Score",
                "value": nftCollection.averageScore,
                "max_value": 100
            },
            {
                "display_type": "boost_number",
                "trait_type": nftCollection.status,
                "value": nftCollection.statusValue
            },
            {
                "display_type": "boost_number",
                "trait_type": nftEdition.name,
                "value": nftEdition.value
            }
        ],
        "tokenId": id
    })
}


function createNotRevealedMetadata(): void {
    fs.writeFile(
        path.dirname(__filename) + "/metadata_not_revealed.json",
        JSON.stringify({
            "image": `https://theculturecards.mypinata.cloud/ipfs/QmT6u7LT1VNtC7M4Ui9ake4waRehwpAh62Mc5VVN4jRnvU`,
            "name": `The Culture Cards`,
            "description": "The First mainstream Hip Hop fantasy game and Metaverse powered by officially licensed NFT cards",
            "external_url": "https://theculturecards.io"
        }),
        err => {
            err ? console.log(err) : ""
        }
    )
}

// createNotRevealedMetadata()
createMetadataFiles()


function hasDuplicates(randomIds: number[]) {
    while(randomIds.length < 556){
        let r = Math.floor(Math.random() * 556) + 1
        if(randomIds.indexOf(r) === -1) {
            randomIds.push(r);
        }
    }
    return (new Set(randomIds)).size !== randomIds.length;
}
// console.log(hasDuplicates())
