import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/Header'

function DoctorProfile() {
  const { id } = useParams();

  console.log(id)

  return (
    <div className='wrapper3'>
        <Header>
            
        </Header>
    </div>
  )
}

export default DoctorProfile