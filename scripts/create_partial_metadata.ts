import fs from "fs";
import path from "path";

const fredroCount = 10;
const stickyCount = 12;
const onyxCount = 15;
const kuruptCount = 10;
const dazCount = 16;
const doggPoundCount = 15;

function createNotRevealedMetadata(): void {
    const data = [
        {tokenCount: fredroCount, dirname: "FREDRO"},
        {tokenCount: stickyCount, dirname: "STICKY"},
        {tokenCount: onyxCount, dirname: "ONYX"},
        {tokenCount: kuruptCount, dirname: "KURUPT"},
        {tokenCount: dazCount, dirname: "DAZ"},
        {tokenCount: doggPoundCount, dirname: "DOGGPOUND"},
    ]
    data.forEach(d => {
        for(let i = d.tokenCount; i < 556; i++) {
            fs.writeFile(
                path.dirname(__filename) + `/drop_metadata_partial_reveal/${d.dirname}/${i}`,
                JSON.stringify({
                    "image": `https://theculturecards.mypinata.cloud/ipfs/QmT6u7LT1VNtC7M4Ui9ake4waRehwpAh62Mc5VVN4jRnvU`,
                    "name": `The Culture Cards`,
                    "description": "The First mainstream Collectible Trading Cards powered by officially licensed NFT cards",
                    "external_url": "https://theculturecards.io"
                }),
                err => {
                    err ? console.log(err) : ""
                }
            )
        }
    })


}
createNotRevealedMetadata()
// const files = fs.readdirSync(path.dirname(__filename) + "/tcc2_metadata_partial/NORE", 'utf-8')
// const jsonFiles = files
//     .sort((a, b) => {
//         const metadataA = JSON.parse(fs.readFileSync(path.dirname(__filename) + "/tcc2_metadata_partial/NORE/" + a, 'utf-8'))
//         const metadataB = JSON.parse(fs.readFileSync(path.dirname(__filename) + "/tcc2_metadata_partial/NORE/" + b, 'utf-8'))
//         return metadataA.tokenId - metadataB.tokenId
//     })
//     .map(f => {
//     const metadata = JSON.parse(fs.readFileSync(path.dirname(__filename) + "/tcc2_metadata_partial/NORE/" + f, 'utf-8'))
//     return metadata.tokenId  + " | " + metadata.name
// });
// fs.writeFile(path.dirname(__filename) + "/temp.json", JSON.stringify(jsonFiles.sort()), err => {
//     err ? console.log(err) : ""
// })

