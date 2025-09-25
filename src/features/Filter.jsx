import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchData } from "./filterSlice"

export default function Filter(){
    const {data,status} = useSelector(state=>state.filter)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchData())
    },[dispatch])
    return()
}