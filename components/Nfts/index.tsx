import React, { FC, useEffect, useState } from 'react';
import { useMoralisWeb3Api } from 'react-moralis';
import Moralis from 'moralis';
import { NFTImage, NFTFilter, NFT } from './elements';
import { NFTDashboardContainer } from './styles';
// import { NFTDashboard } from './elements';

type NFTProps = {
  user: Moralis.User<Moralis.Attributes>;
}

const Index: FC<NFTProps> = ({ user }) => {

  const address = user.get("ethAddress");

  const Web3Api = useMoralisWeb3Api();
  let chainName: 'eth' | 'polygon' | 'mumbai' | 'rinkeby' = 'rinkeby';
  let addressName = address
  const options = {
    chain: chainName,
    address: "0x81A435096772424E18404532d82A7f35bb91c5F9" //"0x7c0Fb55E28979fd30168D0E7b94A525C063dBaed"
  };

  const [nftspolygon, setNftspolygon] = useState([['', '', '']]);
  const [nftseth, setNftseth] = useState([['', '', '']]);
  const [nftsmumbai, setNftsmumbai] = useState([['', '', '']]);
  const [nftsrinkeby, setNftsrinkeby] = useState([['', '', '']]);

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
        // const params = { theUrl: url }
        // const nft = await Moralis.Cloud.run("fetchJSON", params);
        const k = key;
        let url: string = e.metadata!;
        if (url != null) {
          const metadata = JSON.parse(url!.replaceAll(" //", "//"))
          return [metadata.image, metadata.name, metadata.description]
        }
        return [null]
      })!);
    setNftspolygon(roughURLs)
    const rough2URLs = await Promise.all(
      (ethNFTs.result)?.map(async (e, key) => {
        const k = key;
        let url: string = e.metadata!;
        if (url != null) {
          const metadata = JSON.parse(url!.replaceAll(" //", "//"))
          return [metadata.image, metadata.name, metadata.description]
        }
        return [null]
      })!);
    setNftseth(rough2URLs)
    const rough3URLs = await Promise.all(
      (mumbaiNFTs.result)?.map(async (e, key) => {
        const k = key;
        let url: string = e.metadata!;
        if (url != null) {
          const metadata = JSON.parse(url!.replaceAll(" //", "//"))
          return [metadata.image, metadata.name, metadata.description]
        }
        return [null]
      })!);
    setNftsmumbai(rough3URLs)
    const rough4URLs = await Promise.all(
      (rinkebyNFTs.result)?.map(async (e, key) => {
        const k = key;
        let url: string = e.metadata!;
        if (url != null) {
          const metadata = JSON.parse(url!.replaceAll(" //", "//"))
          return [metadata.image, metadata.name, metadata.description]
        }
        return [null]
      })!);
    setNftsrinkeby(rough4URLs)
  }

  const [chain, setChain] = useState('polygon')

  return (<>
    <p>NFTs</p>
    <NFTFilter setChain={setChain} />
    <p>NFTs on {chain}</p>
    <br />
    <NFTDashboardContainer>
      {(chain === "all" || chain === "polygon") && nftspolygon!.map((e, key) => {
        if (e !== null) {
          if (e[0]?.startsWith('ipfs://')) {
            return <NFT key={key} image={"https://ipfs.io/ipfs/" + e[0].substring(7)} name={e[1]} description={e[2]}></NFT>
          }
          return (
            <NFT key={key} image={e[0]} name={e[1]} description={e[2]} />
          )
        }
      })}
      {(chain === "all" || chain === "mumbai") && nftsmumbai!.map((e, key) => {
        if (e !== null) {
          if (e[0]?.startsWith('ipfs://')) {
            return <NFT key={key} image={"https://ipfs.io/ipfs/" + e[0].substring(7)} name={e[1]} description={e[2]}></NFT>
          }
          return (
            <NFT key={key} image={e[0]} name={e[1]} description={e[2]} />
          )
        }
      })}
      {(chain === "all" || chain === "ethereum") && nftseth!.map((e, key) => {
        if (e !== null) {
          if (e[0]?.startsWith('ipfs://')) {
            return <NFT key={key} image={"https://ipfs.io/ipfs/" + e[0].substring(7)} name={e[1]} description={e[2]}></NFT>
          }
          return (
            <NFT key={key} image={e[0]} name={e[1]} description={e[2]} />
          )
        }
      })}
      {(chain === "all" || chain === "rinkeby") && nftsrinkeby!.map((e, key) => {
        if (e !== null) {
          if (e[0]?.startsWith('ipfs://')) {
            return <NFT key={key} image={"https://ipfs.io/ipfs/" + e[0].substring(7)} name={e[1]} description={e[2]} ></NFT>
          }
          return (
            <NFT key={key} image={e[0]} name={e[1]} description={e[2]} />
          )
        }
      })}
    </NFTDashboardContainer>
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