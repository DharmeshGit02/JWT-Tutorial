import axios from "axios"
import { useState, useRef } from "react"
import { Container, Paper, Typography, TextField, Stack, Button, Link } from '@mui/material'
import { FaShopify } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import Alert from '@mui/material/Alert'
import "../App.css"

function Signin() {
    const alertBox = useRef()
    const navigate = useNavigate()
    const [getFormData, setFormData] = useState({
        email: "",
        password: ""
    })
    const handleFormData = (event) => {
        setFormData(() => ({
            ...getFormData,
            [event.target.name]: event.target.value
        }))
    }
    const submitSigninForm = async (event) => {
        event.preventDefault()
        alertBox.current.classList.remove("alertbox-animate")
        try {
            const res = await axios.post("/auth/signin", getFormData)
            if (res.status === 200 && res.data.message === "success") {
                console.log(res.data.message)
                navigate("/")
            }
        } catch (error) {
            alertBox.current.classList.add("alertbox-animate")
            console.log(error)
        }
    }
    return (
        <Container sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            width: "100%",
            height: "100vh"
        }}>
            <Alert ref={alertBox} sx={{position:"absolute", opacity:0}} severity="warning" variant="filled">We are facing server issues.</Alert>
            <Paper
                elevation={2}
                sx={{
                    backgroundColor: "rgb(250, 250, 250)",
                    padding: "1.5%",
                    borderRadius: 2
                }}>
                <Stack mt="1">
                    <Typography variant="h3" textAlign={"center"} color={"royalblue"}><FaShopify /></Typography>
                    <Typography variant="h6" textAlign={"center"}>Shoppy</Typography>
                </Stack>
                <form method="post" onChange={handleFormData} onSubmit={submitSigninForm}>
                    <Stack mt={5} gap={2}>
                        <TextField id="email" label="email" variant="outlined" name="email" />
                        <TextField id="password" label="password" variant="outlined" name="password" type='password' />
                        <Button variant="contained" sx={{
                            width: "fit-content",
                            marginTop: 2,
                            alignSelf: "center"
                        }} type="submit">Sign In</Button>
                        <Typography variant="h6" color="gray" maxWidth={"100%"} fontSize={16} textAlign={"center"} sx={{ cursor: "pointer" }}>don't have an account
                            <Link href="/signup"> sign up </Link> here
                        </Typography>
                    </Stack>
                </form>
            </Paper>
        </Container>
    )
}

export default Signin