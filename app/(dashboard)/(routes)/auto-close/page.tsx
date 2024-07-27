
"use client"
import React, { useEffect } from 'react'

function ClosePage() {

    useEffect(()=>{
        if(window){
            window.close();
        }
    },[])

  return (
    <div>
        This page will close automatically.
    </div>
  )
}

export default ClosePage