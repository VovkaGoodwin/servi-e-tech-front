import React from 'react'
import {Link} from "react-router-dom";

type SwitchLinkProps = {
  ip: string,
  portNumber: string | null
  street: string,
  homeNumber: string
};

export const SwitchLink: React.FC<SwitchLinkProps> = ({ ip, street, homeNumber, portNumber }) => {
  if (portNumber === null) {
    return (
      <Link to={'/switch'} state={{ip, street, homeNumber}}/>
    )
  }

  return (
    <Link to={'/port'} state={{ip, street, homeNumber, portNumber}}/>
  )
}