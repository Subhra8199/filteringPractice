import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchData } from "./filterSlice"

export default function Filter(){
    const {data,status} = useSelector(state=>state.filter)
    const dispatch = useDispatch()
    const [query , setQuery] = useState("")
    useEffect(()=>{
        dispatch(fetchData())
    },[dispatch])

    const filteredData = data.filter(item=> item.title?.toLowerCase().includes(query.toLowerCase()))


    return status === "pending" ? <div>Loading...</div>:(
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center", alignItems:"center", marginTop:"50px"}}>
            <input 
                type="text"
                placeholder="Search here !"
                value={query}
                name="query"
                onChange={(e)=>setQuery(e.target.value)}
                style={{marginBottom:"20px", padding:"15px 9px", width:"300px", border:"1px solid grey", borderRadius:"15px"}}
            />
                <div style={{height:"100vh"}}>
                <ul style={{display:"flex", flexDirection:"column",gap:10, justifyContent:"center"}}>
                    {filteredData.map(item=>{
                        return <li key={item.id} style={{listStyle:"none", fontSize:"1rem"}}>{item.title}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}