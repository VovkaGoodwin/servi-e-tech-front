import React from 'react'
import {useParams} from "react-router-dom";

export const PortDetailsPage: React.FC = () => {

  const params = useParams();

  console.log('port params', params);

  return (<h1>Port Details Page</h1>)
}