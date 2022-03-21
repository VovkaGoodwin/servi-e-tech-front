import React, {useContext} from 'react'
import {AuthContext} from "../context/AuthContext";

export const SearchPage: React.FC = () => {

  const { authenticatedUser: user } = useContext(AuthContext);
  console.log(user);

  return (<h1>Search Page</h1>)
}