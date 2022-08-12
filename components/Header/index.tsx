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
        <p>Dashboard</p>
        <p>Username: {user.getUsername()}</p>
        <button onClick={logout} disabled={isLoggingOut}>Logout</button>
    </>
  )
}

export default Index