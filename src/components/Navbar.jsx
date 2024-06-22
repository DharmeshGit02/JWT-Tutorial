import { Box, AppBar, Typography, Stack, IconButton, Divider, Avatar, Tooltip, Button } from '@mui/material'
import { FaShopify } from "react-icons/fa"
import { FaCartShopping } from "react-icons/fa6"
import { IoIosLogOut } from "react-icons/io"
import Cookies from "js-cookie"
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar({ isAuthenticated, setisAuthenticated }) {
    const navigate = useNavigate()
    const handleLogout = (event) => {
        event.preventDefault()
        Cookies.remove("jwt")
        setisAuthenticated(false)
    }
    useEffect(() => {
        navigate("/")
    }, [isAuthenticated])
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
                    <Tooltip title="Cart">
                        <IconButton aria-label="cart">
                            <FaCartShopping />
                        </IconButton>
                    </Tooltip>
                    {
                        isAuthenticated ? (
                            <Tooltip title="logout">
                                <IconButton aria-label='logout' onClick={handleLogout}>
                                    <IoIosLogOut />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Stack direction="row" alignItems={"center"} gap={1} m={1}>
                                <Button variant='outlined' href='/signin'>Sign in</Button>
                                <Button variant='outlined' href='/signup'>Sign up</Button>
                            </Stack>
                        )
                    }
                    <Avatar alt='Guest'></Avatar>
                </Stack>
            </Box>
            <Box sx={{ backgroundColor: "#EFEFEF" }}>
                <Stack direction={"row"} color={"gray"} spacing={1} ml={1} padding={1}>
                    <Button variant="outlined">Product</Button>
                    <Divider orientation="vertical" flexItem sx={{ backgroundColor: "lightgray" }} />
                    <Button variant="outlined">Product</Button>
                    <Divider orientation="vertical" flexItem sx={{ backgroundColor: "lightgray" }} />
                    <Button variant="outlined">Product</Button>
                    <Divider orientation="vertical" flexItem sx={{ backgroundColor: "lightgray" }} />
                    <Button variant="outlined">Product</Button>
                    <Divider orientation="vertical" flexItem sx={{ backgroundColor: "lightgray" }} />
                    <Button variant="outlined">Product</Button>
                </Stack>
            </Box>
        </AppBar>
    )
}

export default Navbar