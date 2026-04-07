import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({children,authentication=true}) {
    const authStatus=useSelector((state)=>state.auth.status)
    const [loder,setLoder]=useState(true)
    const navigate=useNavigate()
    useEffect(()=>{
        
        if (authentication && authStatus !==authentication) {
            navigate('/login')
            
        }else if (!authentication && authStatus !== authentication) {
            navigate('/')
            
        }
        setLoder(false)
    },[navigate,authStatus,authentication])
  return loder ? <h1>Loding....</h1>:<>{children}</>
}

export default Protected
