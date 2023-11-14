import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setmode } from '../../store'

function Login() {
  const mode = useSelector((state) => state.mode)
  const dispatch = useDispatch(state=>state.mode)
  return (
    <div>
     Login
      
    </div>
  )
}

export default Login