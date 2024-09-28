import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import DisplayMessage from './displayMessage'


const ProtectedRoute = ({children}) => {
  const user = useSelector((state) => state.auth.user)
  if(!user){
    return <DisplayMessage message="Please log in first to access the cart." redirectPath="/login" />;
  }

  return children
}

export default ProtectedRoute