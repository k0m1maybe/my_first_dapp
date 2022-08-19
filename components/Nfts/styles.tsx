import styled from "styled-components";

export const NFTFilterContainer = styled.div`
    display: flex;
`

export const NFTDashboardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`

export const NFTContainer = styled.div`
    display: inline;
    height: 300px;
    width: 300px;
    align-items: center;
    justify-content: left;
    overflow: hidden;
`

export const NFTImageContainer = styled.div`
    display: flex;
    height: 300px;
    width: 300px;
    align-items: center;
    justify-content: center;
    z-index:98;
`

export const NFTTextContainer = styled.div`
    position: absolute;
    background-color: #111111;
    height: 300px;
    width: 280px;
    padding: 5px;
    align-items: center;
    color: white;
    text-align: justify;
    text-align-last: right;
    z-index:99;
    opacity: 0;

    &:hover{
        background-color: #111111;
        transition: ease-in-out 0.2s;
        transform: opacity;
        transform: translateX(20px);
        opacity: 90%;
    }
`

export const NameContainer = styled.h3`
`

export const DiscriptionContainer = styled.div`
    word-break: break-all;  
`