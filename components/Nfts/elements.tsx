import { FC } from "react";
import Image from "next/image";
import { NFTImageContainer } from "./styles";

type NFTIProps = {
    image: string;
}

export const NFTImage: FC<NFTIProps> = ({ image }) => {
    return <NFTImageContainer>
        <Image src={image} width={"100px"} height={"100px"} alt="" />
    </NFTImageContainer>
};