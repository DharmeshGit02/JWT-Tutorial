import { Box } from "@mui/material"
import Navbar from "../components/Navbar"
import Prouducts from "../utils/Products.json"
import ProductCard from '../components/ProductCard'
import { useState, useEffect } from "react"
import axios from "axios"

function Cart() {
    const [isAuthenticated, setisAuthenticated] = useState(false)
    async function verifyJwt() {
        const isCookiePresent = document.cookie.includes("jwt")
        if(isCookiePresent) {
            const res = axios.post("/verify-jwt", {token:document.cookie.split("=")[1]})
            return res
        } else {
            setisAuthenticated(false)
            return {"status": 400}
        }
    }
    useEffect(() => {
        async function callFunc() {
            const res = await verifyJwt()
            if(res.status === 200) {
                console.log(res.data)
                setisAuthenticated(true)
            }
        }
        callFunc()
    }, [])
    return (
        <Box sx={{
            position:"relative",
            width:"100vw",
            height:"100vh"
        }}>
            <Navbar isAuthenticated={isAuthenticated}  setisAuthenticated={setisAuthenticated} page={"cart"}/>
            <Box sx={{ position:"relative", top:60, width:"100vw", height:"100vh", backgroundColor:"whitesmoke", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center", alignItems:"center", gap:2}}>
            {
                        Prouducts.map((product) => (<ProductCard
                            title={product.name}
                            desc={product.description}
                            img={product.image}
                        />))
                    }
            </Box>
        </Box>
    )
}

export default Cart