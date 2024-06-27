import axios from "axios"
import { useState, useRef } from "react"
import { Container, Paper, Typography, TextField, Stack, Button, Link, Alert } from '@mui/material'
import { FaShopify } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import "../App.css"

function Signin() {
    const navigate = useNavigate()
    const [userFeedback, setUserFeedback] = useState({status:false, message:"", type:""})
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
        try {
            const res = await axios.post("/auth/signin", getFormData)
            if (res.status === 200 && res.data.message === "success") {
                console.log(res.data.message)
                setUserFeedback({
                    status:false,
                    message:"",
                    type:""
                })
                navigate("/")
            }
            else {
                setUserFeedback({
                    status:true,
                    message:"Invalid Credentials",
                    type:"warning"
                })
            }
        } catch (error) {
            setUserFeedback({
                status:true,
                message:"Facing Server Issues..",
                type:"error"
            })
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
                        {userFeedback ? <Alert severity={userFeedback.type}>{userFeedback.message}</Alert> : ""}
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