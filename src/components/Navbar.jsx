import { Box, AppBar, Typography, Stack, IconButton, Divider, Avatar, Tooltip, Button } from '@mui/material'
import { FaShopify } from "react-icons/fa"
import { FaCartShopping } from "react-icons/fa6"
import { IoIosLogOut } from "react-icons/io"
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import CategoriesDrawer from './CategoriesDrawer'


function Navbar({ isAuthenticated, setisAuthenticated, page }) {
    const navigate = useNavigate()
    const [categories, setCategories] = useState(null)
    const navigateToCart = (event) => {
        event.preventDefault()
        if (!isAuthenticated) alert("Sign in or sign up first")
        else navigate("/cart")
    }
    const handleLogout = (event) => {
        event.preventDefault()
        Cookies.remove("jwt")
        setisAuthenticated(false)
        if (page === "cart") navigate("/")
    }
    async function getAllCategories() {
        const res = await axios.get('products/categories/get-categories')
        setCategories(res.data)
    }
    useEffect(() => {
        getAllCategories()
    }, [])

    return (
        <AppBar sx={{ backgroundColor: "#f8f9f5", display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                <Box sx={{
                    marginLeft: 1,
                    display: "flex",
                    width: "fit-content",
                    alignItems: "center",
                    fontSize: 32,
                    padding: 1,
                    color: "royalblue",
                }}>
                    <FaShopify />
                    <Typography>Shoppy</Typography>
                </Box>
                <Stack direction="row" alignItems={"center"} mr={2}>
                    {
                        page == "mainpage" ? (
                            <Box>
                                <Divider />
                                <Stack direction={"row"} color={"gray"} spacing={1} ml={1} padding={1} sx={{ overflowY: "auto" }}>
                                    <CategoriesDrawer categories={categories} />
                                </Stack>
                            </Box>
                        ) : ""
                    }
                    {
                        page === "mainpage" ? (
                            <Tooltip title="Cart">
                                <IconButton aria-label="cart" onClick={navigateToCart}>
                                    <FaCartShopping />
                                </IconButton>
                            </Tooltip>
                        ) : ""
                    }
                    {
                        isAuthenticated ? (
                            <Tooltip title="logout">
                                <IconButton aria-label='logout' onClick={handleLogout}>
                                    <IoIosLogOut />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            page === "mainpage" ? (
                                <Stack direction="row" alignItems={"center"} gap={1} m={1}>
                                    <Button variant='outlined' href='/signin'>Sign in</Button>
                                    <Button variant='outlined' href='/signup'>Sign up</Button>
                                </Stack>
                            ) : ""
                        )
                    }
                    <Avatar alt='Guest'></Avatar>
                </Stack>
            </Box>
        </AppBar>
    )
}

export default Navbar