import React, { FC, useEffect, useState } from 'react';
import { useMoralisWeb3Api } from 'react-moralis';
import Moralis from 'moralis';
import { NFTImage, NFTFilter } from './elements';
// import { NFTDashboard } from './elements';

type NFTProps = {
  user: Moralis.User<Moralis.Attributes>;
}

const Index: FC<NFTProps> = ({ user }) => {

  const address = user.get("ethAddress");

  const Web3Api = useMoralisWeb3Api();
  let chainName: 'eth' | 'polygon' | 'mumbai' | 'rinkeby' = 'rinkeby';
  let addressName = "0x7c0Fb55E28979fd30168D0E7b94A525C063dBaed";
  const options = {
    chain: chainName,
    address: "0x81A435096772424E18404532d82A7f35bb91c5F9"
  };

  const [nftspolygon, setNftspolygon] = useState(['']);
  const [nftseth, setNftseth] = useState(['']);
  const [nftsmumbai, setNftsmumbai] = useState(['']);
  const [nftsrinkeby, setNftsrinkeby] = useState(['']);

  useEffect(() => {
    fetchNFTs();
  }, [])

  const fetchNFTs = async () => {
    const polygonNFTs = await Web3Api.account.getNFTs({ chain: "polygon", address: addressName });
    const ethNFTs = await Web3Api.account.getNFTs({ chain: "eth", address: addressName });
    const mumbaiNFTs = await Web3Api.account.getNFTs({ chain: "mumbai", address: addressName });
    const rinkebyNFTs = await Web3Api.account.getNFTs({ chain: "rinkeby", address: addressName });
    console.log(polygonNFTs)
    console.log(ethNFTs)
    console.log(mumbaiNFTs)
    console.log(rinkebyNFTs)
    const roughURLs = await Promise.all(
      (polygonNFTs.result)?.map(async (e, key) => {
        const k = key;
        let url: string = e.metadata!;
        // const params = { theUrl: url }
        // const nft = await Moralis.Cloud.run("fetchJSON", params);
        if (url != null) {
          return JSON.parse(url!.replaceAll(" ", "")).image
        }
        return null
      })!);
    console.log(roughURLs)
    setNftspolygon(roughURLs)
    const rough2URLs = await Promise.all(
      (ethNFTs.result)?.map(async (e, key) => {
        const k = key;
        let url: string = e.metadata!;
        if (url != null) {
          return JSON.parse(url!.replaceAll(" ", "")).image
        }
        return null
      })!);
    console.log(rough2URLs)
    setNftseth(rough2URLs)
    const rough3URLs = await Promise.all(
      (mumbaiNFTs.result)?.map(async (e, key) => {
        const k = key;
        let url: string = e.metadata!;
        if (url != null) {
          return JSON.parse(url!.replaceAll(" ", "")).image
        }
        return null
      })!);
    console.log(rough3URLs)
    setNftsmumbai(rough3URLs)
    const rough4URLs = await Promise.all(
      (rinkebyNFTs.result)?.map(async (e, key) => {
        const k = key;
        let url: string = e.metadata!;
        if (url != null) {
          return JSON.parse(url!.replaceAll(" ", "")).image
        }
        return null
      })!);
    console.log(rough4URLs)
    setNftsrinkeby(rough4URLs)
    // const fixedURLs = roughURLs.map((s, key) => {
    //   const k = key;
    //   if (s.startsWith('ipfs://')) {
    //     return ("https://ipfs.io/ipfs/" + s.substr(7))
    //   }
    //   return s
    // })
    // setNfts(fixedURLs)
  }


  // const [nftrarible, setNftrarible] = useState("");

  // useEffect(() => { fetchNFTraribles() }, [])

  // const fetchNFTraribles = async () => {
  //   const nft = await Moralis.Cloud.run("fetchJSON", { theUrl: "https://api.rarible.org/v0.1/items/byOwner?owner=ETHEREUM:0x64fe09840b92ee36baa76a7b261c52f08a4ffec9" });
  //   const nft2 = nft.data.items[30].meta.content[0].url
  //   const nftlist = nft.data.items
  //   console.log(nftlist)
  //   console.log(nft2)
  //   setNftrarible(nft2)
  // }

  const [chain, setChain] = useState('polygon')

  return (<>
    {/* 
        <NFTDashboard chain={chain} marketplace={marketplace} address={address} />
    <NFTImage image={nftrarible}></NFTImage> */}
    <p>NFTs</p>
    <NFTFilter setChain={setChain} />
    <p>NFTs on {chain}</p>
    <br />
    {(chain === "all" || chain === "polygon") && nftspolygon!.map((e, key) => {
      if (e !== null) {
        if (e.startsWith('ipfs://')) {
          return <NFTImage image={"https://ipfs.io/ipfs/" + e.substring(7)}></NFTImage>
        }
        return (
          <NFTImage image={e}></NFTImage>
        )
      }
    })}
    {(chain === "all" || chain === "mumbai") && nftsmumbai!.map((e, key) => {
      if (e !== null) {
        if (e.startsWith('ipfs://')) {
          return <NFTImage image={"https://ipfs.io/ipfs/" + e.substring(7)}></NFTImage>
        }
        return (
          <NFTImage image={e}></NFTImage>
        )
      }
    })}
    {(chain === "all" || chain === "ethereum") && nftseth!.map((e, key) => {
      if (e !== null) {
        if (e.startsWith('ipfs://')) {
          return <NFTImage image={"https://ipfs.io/ipfs/" + e.substring(7)}></NFTImage>
        }
        return (
          <NFTImage image={e}></NFTImage>
        )
      }
    })}
    {(chain === "all" || chain === "rinkeby") && nftsrinkeby!.map((e, key) => {
      if (e !== null) {
        if (e.startsWith('ipfs://')) {
          return <NFTImage image={"https://ipfs.io/ipfs/" + e.substring(7)}></NFTImage>
        }
        return (
          <NFTImage image={e}></NFTImage>
        )
      }
    })}

    {/* {
      nftsmoralis.map((image, key) => {
        return (
          <NFTImage key={key} image={image}></NFTImage>
        )
      })
    } */}
  </>)
}


export default Index