import React, { FC, useEffect, useState } from 'react';
import { useNFTBalances, useMoralisWeb3Api } from 'react-moralis';
import Moralis from 'moralis';

type NFTProps = {
  user: Moralis.User<Moralis.Attributes>;
}

const index: FC<NFTProps> = ({ user }) => {
  const Web3Api = useMoralisWeb3Api();
  const [nfts, setNfts] = useState(['']);
  useEffect(() => {
    async () => {
      let chainName: 'eth' | 'polygon' = 'eth';
      let addressName: string = user!.get("ethAddress");
      const options = {
        chain: chainName,
        address: '0x7c0Fb55E28979fd30168D0E7b94A525C063dBaed'
      };
      const polygonNFTs = await Web3Api.account.getNFTs(options);
      let r = polygonNFTs.result;
      console.log(r);
      let nftss: string[] = []
      r?.forEach(async (e) => {
        let url: string = e.token_uri!;
        const params = { theUrl: url }
        const nft = await Moralis.Cloud.run("fetchJSON", params);
        nftss.push(nft.data.image);
        console.log(1)
      });
      setNfts(nftss);
    }
  }, [])
  console.log(nfts)
  console.log("xx")
  return (<>
    <p>NFTS</p>
    {
      nfts.map((img, key) => {
        return (<p key={key}>{img}</p>)
      })
    }
    <p>NFTs</p>
  </>)
}


export default index