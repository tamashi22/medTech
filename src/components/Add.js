import React from 'react'
import { AddnewUser } from '../constance/css__const'
import ad from "../images/add.png"
function Add() {
  return (
    <AddnewUser
            sx={{
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            <img src={ad}></img>
          </AddnewUser>
  )
}

export default Add