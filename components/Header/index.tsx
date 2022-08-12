import React, {FC} from 'react'
import Moralis from "moralis";

type HProps = {
    user: Moralis.User<Moralis.Attributes>;
    logout: () => Promise<void>;
    isLoggingOut: boolean;
}

const Index: FC<HProps> = ({user, logout, isLoggingOut}) => {
  return (
    <>
        <>Dashboard </>
        <button onClick={logout} disabled={isLoggingOut}>Logout</button>
        <p>Username: {user.getUsername()}</p>
        <p>Adrress: {user.get("ethAddress")}</p>

    </>
  )
}

export default Index