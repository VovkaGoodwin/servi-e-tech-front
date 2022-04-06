import React from 'react'
import {useLocation} from "react-router-dom";

export const SwitchDetailsPage: React.FC = () => {
  const { state } = useLocation();
  console.log(state);
  return (<h1>Switch Details Page</h1>)
}