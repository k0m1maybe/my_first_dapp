import React, { FC, useEffect, useState } from 'react';
import { useMoralisWeb3Api } from 'react-moralis';
import Moralis from 'moralis';
import { NFTFilter, NFTImage, NFTDashboard } from './elements';

type NFTProps = {
  user: Moralis.User<Moralis.Attributes>;
}

const Index: FC<NFTProps> = ({ user }) => {

  const address= user.get("ethAddress");
  
  const Web3Api = useMoralisWeb3Api();
  let chainName: 'eth' | 'polygon' | 'mumbai'= 'mumbai';

  const options = {
   chain: chainName,
   address: address //'0x7c0Fb55E28979fd30168D0E7b94A525C063dBaed'
};


 
  const [nftsmoralis, setNfts] = useState(['']);
 
  useEffect(() => {
    fetchNFTs();
  }, [])
 
  const fetchNFTs = async () => {
    const polygonNFTs = await Web3Api.account.getNFTs(options);
    const roughURLs = await Promise.all(
      (polygonNFTs.result)?.map(async (e, key) => {
        const k = key;
        const nft = await Moralis.Cloud.run("fetchJSON", { theUrl: e.token_uri });
        return nft.data.image
      })!);
    const fixedURLs = roughURLs.map((s, key) => {
      const k = key;
      if (s.startsWith('ipfs://')) {
        return ("https://ipfs.io/ipfs/" + s.substr(7))
      }
      return s
    })
    setNfts(fixedURLs)
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

  // const [chain, setChain] = useState('polygon')
  // const [marketplace, setMarketplace] = useState('opensea')

  return (<>
    {/* <p>NFTs</p>
    <NFTFilter setChain={setChain} setMarketplace={setMarketplace} />

    <NFTDashboard chain={chain} marketplace={marketplace} address={address} />
    <br />
    <NFTImage image={nftrarible}></NFTImage> */}



    {
      nftsmoralis.map((image, key) => {
        return (
          <NFTImage key={key} image={image}></NFTImage>
        )
      })
    }
  </>)
}


export default Index