import React, { useState } from 'react'

const Test = () => {
    const [form, setForm] = useState([
        {value: '', label: '1'},
        {value: '', label: '2'},
        {value: '', label: '3'},
        {value: '', label: '4'},
        {value: '', label: '5'},
        {value: '', label: '6'},
        {value: '', label: '7'},
        {value: '', label: '8'},
        {value: '', label: '9'},
        {value: '', label: '10'},
        {value: '', label: '12'},
        {value: '', label: '13'},
    ])

    const onChangeInput = (e, i) => {
        const { name, value} = e.target;
        console.log(name)
        setForm((prev)=>{
            let arr = JSON.parse(JSON.stringify(prev));
            arr[i][name] = value;
            return arr;
        })
    }

  return (
    <div>
        {
            form.map((item, i)=>(
                <div key={i}>
                    <label htmlFor={item.label}>{item.label}</label>
                    <input type="text" name={item.label} value={item.value} onChange={(e)=>onChangeInput(e, i)}/>
                </div>
            ))
        }
    </div>
  )
}

export default Test