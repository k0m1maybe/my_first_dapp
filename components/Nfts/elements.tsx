import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { NFTImageContainer, NFTFilterContainer, NFTContainer, NFTTextContainer, NameContainer, DiscriptionContainer } from "./styles";
import Moralis from 'moralis';


type NFTIProps = {
    image: string;
}

export const NFTImage: FC<NFTIProps> = ({ image }) => {
    return <NFTImageContainer>
        <Image loader={() => image} src="/.jpg" width={"300px"} height={"300px"} alt="" />
    </NFTImageContainer>

};

type NFTFProps = {
    setChain: React.Dispatch<React.SetStateAction<string>>;
}

export const NFTFilter: FC<NFTFProps> = ({ setChain }) => {
    return <NFTFilterContainer>
        <select defaultValue={"polygon"} onChange={(e) => { setChain(e.target.value) }} name={"chain"} id={"chain"}>
            <option value={"polygon"}>Poly</option>
            <option value={"ethereum"}>ETH</option>
            <option value={"mumbai"}>Mumbai</option>
            <option value={"rinkeby"}>Rinkeby</option>
            <option value={"all"}>All</option>
        </select>
    </NFTFilterContainer>
}

// type NFTDBProps = {
//     chain: string;
//     marketplace: string
//     address: string
// }

// export const NFTDashboard: FC<NFTDBProps> = ({ chain, marketplace, address }) => {
//     //import openseaNFTs
//     const [opeaseaEthereumNFTs, setOpenseaEthereumNFTs] = useState<string[]>([])
//     const [opeaseaPolygonNFTs, setOpenseaPolygonNFTs] = useState<string[]>([])

//     //import raribleNFTs
//     const [raribleEthereumNFTs, setRaribleEthereumNFTs] = useState<string[]>([])
//     const [rariblePolygonNFTs, setRariblePolygonNFTs] = useState<string[]>([])

//     const [nftrarible, setNftrarible] = useState("");

//     useEffect(() => { fetchNFTraribles() }, [])

//     const fetchNFTraribles = async () => {
//         const rariblenfts = await Moralis.Cloud.run("fetchJSON", { theUrl: "https://api.rarible.org/v0.1/items/byOwner?owner=ETHEREUM:" + "0x64fe09840b92ee36baa76a7b261c52f08a4ffec9" });
//         const nftlist = rariblenfts.data.items
//         nftlist.forEach((e: any, key: any) => {
//             const k = key
//             if (e.blockchain = "ETHEREUM") {
//                 if (e.meta != undefined) {
//                     setRaribleEthereumNFTs((l) => [...l, e.meta.content[0].url])
//                 }
//             }
//             if (e.blockchain = "POLYGON") {
//                 if (e.meta != undefined) {
//                     setRariblePolygonNFTs((l) => [...l, e.meta.content[0].url])
//                 }
//             }

//         })
//         console.log(raribleEthereumNFTs)
//         console.log(rariblePolygonNFTs)
//     }

//     //make showing NFTs' list
//     // if (chain != "polygon") {
//     //     if (marketplace != "opensea") nfts = nfts.concat(raribleEthereumNFTs)
//     //     if (marketplace != "rarible") nfts = nfts.concat(opeaseaEthereumNFTs)
//     // }
//     // if (chain != "ethereum") {
//     //     if (marketplace != "opensea") nfts = nfts.concat(rariblePolygonNFTs)
//     //     if (marketplace != "rarible") nfts = nfts.concat(opeaseaPolygonNFTs)
//     // }

//     return <>
//         <p>{chain}</p>
//         <p>{marketplace}</p>
//         {
//             (marketplace != "opensea")&&(chain != "polygon")&&raribleEthereumNFTs.map((e, key) => {
//                 return (
//                     <NFTImage key={key} image={e}></NFTImage>
//                 )
//             })
//         }
//         {
//             (marketplace != "opensea")&&(chain != "ethereum")&&rariblePolygonNFTs.map((e, key) => {
//                 return (
//                     <NFTImage key={key} image={e}></NFTImage>
//                 )
//             })
//         }
//     </>
// }

type NFTProps = {
    image: string;
    name: string;
    description: string
}

export const NFT: FC<NFTProps> = ({ image, name, description }) => {
    return <NFTContainer>
        <NFTText name={name} description={description} />
        <NFTImage image={image} />
    </NFTContainer>
}

type NFTTProps = {
    name: string;
    description: string
}

export const NFTText: FC<NFTTProps> = ({ name, description }) => {
    return <NFTTextContainer>
        <NameContainer>{name}</NameContainer>
        <br />
        <DiscriptionContainer>{description}</DiscriptionContainer>
    </NFTTextContainer>;
};