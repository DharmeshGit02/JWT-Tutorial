import { Container, Paper, Typography, TextField, Stack, Button, Link, List, ListItem, ListItemIcon } from '@mui/material'
import { VscCaseSensitive } from "react-icons/vsc"
import { Bs123 } from "react-icons/bs"
import { RxWidth } from "react-icons/rx"
import { useState } from 'react'
import { FaShopify } from "react-icons/fa"
import axios from 'axios'
import validate from "../utils/FormValidator"

function Signup() {
    const [getFormData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })
    const handleFormData = (event) => {
        setFormData(() => ({
            ...getFormData,
            [event.target.name]: event.target.value
        }))
    }
    const submitSignupForm = async (event) => {
        event.preventDefault()
        const result = validate(getFormData)
        if (!result.status) alert(result.message)
        else {
            try {
                const res = await axios.post("http://localhost:2002/auth/signup", getFormData)
                console.log(res)
                alert(res.data.message)
            } catch (error) {
                console.log(error)
                alert(error.response.data.message)
            }
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
                    padding: "1% 1.5% 1% 1.5%",
                    borderRadius: 2
                }}>
                <form method="post" onChange={handleFormData} onSubmit={submitSignupForm}>
                    <Stack mt={1}>
                        <Typography variant='h3' textAlign={"center"} color={"royalblue"}><FaShopify /></Typography>
                        <Typography variant="h6" textAlign={"center"}>Shoppy</Typography>
                    </Stack>
                    <Stack mt={5} gap={2}>
                        <TextField id="email" label="email" variant="outlined" name="email" />
                        <TextField id="password" label="password" variant="outlined" name="password" type='password' />
                        <TextField id="confirm-password" label="confirm password" variant="outlined" name="confirmPassword" type='password' />
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <VscCaseSensitive />
                                </ListItemIcon>
                                <Typography color="grey" variant='h6' fontSize={16}>Atleast upper & lower case letters</Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <Bs123 />
                                </ListItemIcon>
                                <Typography color="grey" variant='h6' fontSize={16}>Atleast one digit</Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <RxWidth />
                                </ListItemIcon>
                                <Typography color="grey" variant='h6' fontSize={16}>minimum 6 characters length</Typography>
                            </ListItem>
                        </List>
                        <Button variant="contained" sx={{
                            width: "fit-content",
                            marginTop: 2,
                            alignSelf:"center"
                        }} type='submit'>Sign Up</Button>
                        <Typography variant="h6" color="gray" maxWidth={"100%"} fontSize={16} textAlign={"center"} sx={{ cursor: "pointer" }}>already have an account
                            <Link href="/"> sign in </Link>
                        </Typography>
                    </Stack>
                </form>
            </Paper>
        </Container>
    )
}

export default Signup