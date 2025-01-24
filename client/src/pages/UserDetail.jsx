import { useState, useContext } from "react"
import { Link } from "react-router"
import GlobalContext from "../context/GlobalContext"
export default function UserDetail() {

    const { user } = useContext(GlobalContext)
    const { id } = user
    return (
        <>
            <span>user detail</span>
            <Link className="btn btn-danger" to={'properties'} >insert properties</Link>
        </>


    )
}