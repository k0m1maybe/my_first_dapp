import React, {FC} from 'react'
import Moralis from "moralis";

type HProps = {
    user: Moralis.User<Moralis.Attributes>;
    logout: () => Promise<void>;
    isLoggingOut: boolean;
}

const index: FC<HProps> = ({user, logout, isLoggingOut}) => {
  return (
    <>
        <p>Dashboard</p>
        <p>{user.getUsername()}</p>
        <button onClick={logout} disabled={isLoggingOut}>Logout</button>
    </>
  )
}

export default index