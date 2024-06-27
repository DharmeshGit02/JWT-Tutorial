import { Box, Grid } from '@mui/material'
import ProductCard from '../components/ProductCard'
import Navbar from '../components/Navbar'
import "../App.css"
import { useState, useEffect } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Homepage() {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [isAuthenticated, setisAuthenticated] = useState(false)
    async function verifyJwt() {
        const isCookiePresent = document.cookie.includes("jwt")
        if (isCookiePresent) {
            const res = axios.post("/verify-jwt", { token: document.cookie.split("=")[1] })
            return res
        } else {
            setisAuthenticated(false)
            return { "status": 400 }
        }
    }
    useEffect(() => {
        async function callFunc() {
            const res = await verifyJwt()
            if (res.status === 200) {
                console.log(res.data)
                setisAuthenticated(true)
            }
        }
        async function getProducts() {
            const res = await axios.get('/products/0')
            setProducts(res.data.products)
        }
        
        callFunc()
        getProducts()
    }, [])
    return (
        <Box component="div" sx={{
            position: "relative",
            widht: "100vw",
            height: "100vh"
        }}>
            <Navbar isAuthenticated={isAuthenticated} setisAuthenticated={setisAuthenticated} page={"mainpage"} />
            <Box container spacing={1} sx={{ position: "relative", width: "100%", height: "fit-content", display:"flex", justifyContent:"center", flexWrap:"wrap", alightItems:"center", gap:2 }} mt={14}>
                {
                    products.map((product) => (<ProductCard
                        title={product.name}
                        desc={product.description}
                        rating={product.rating}
                        price={product.price}
                        discount={product.discountPercentage}
                        img={product.thumbnail}
                    />))
                }
            </Box>
        </Box>
    )
}

export default Homepage