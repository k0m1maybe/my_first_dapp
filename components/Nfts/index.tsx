import React, { FC, useEffect, useState } from 'react';
import { useNFTBalances, useMoralisWeb3Api } from 'react-moralis';
import Moralis from 'moralis';
import { NFTImage } from './elements';

type NFTProps = {
  user: Moralis.User<Moralis.Attributes>;
}

const Index: FC<NFTProps> = ({ user }) => {
  const Web3Api = useMoralisWeb3Api();
  let chainName: 'eth' | 'polygon' = 'eth';
  let addressName: string = user!.get("ethAddress");
  const options = {
    chain: chainName,
    address: '0x7c0Fb55E28979fd30168D0E7b94A525C063dBaed'
  };

  const [nfts, setNfts] = useState(['']);

  useEffect(() => {
    fetchNFTs();
  }, [])

  const fetchNFTs = async () => {
    const nftss: string[] = []
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

  return (<>
    <p>NFTs start</p>
    {
      nfts.map((image, key) => {
        return (
            <NFTImage key={key} image={image}></NFTImage>
        )
      })
    }
    <p>NFTs end</p>
  </>)
}


export default Index