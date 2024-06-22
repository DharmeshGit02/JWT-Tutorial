import { Box, Grid, List, Accordion, AccordionSummary, AccordionDetails, ListItemButton, ListItemText } from '@mui/material'
import { FaChevronDown } from "react-icons/fa"
import ProductCard from '../components/ProductCard'
import Prouducts from "../utils/Products.json"
import Navbar from '../components/Navbar'
import "../App.css"
import {useState, useEffect} from "react"
import axios from 'axios'


function Homepage() {
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
        <Box component="div" sx={{
            position: "relative",
            widht: "100vw",
            height: "100vh"
        }}>
            {/* document.cookie.split(";")[1].split("=")[1] === "true" */}
            <Navbar isAuthenticated={isAuthenticated} setisAuthenticated={setisAuthenticated}/>
            <div className="Navbar-placeholder"></div>
            <Grid container spacing={1} sx={{ position: "relative", width: "100%" }}>
                <Grid item xs={3} position={"sticky"}>
                    <List>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<FaChevronDown />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Accordion 1
                            </AccordionSummary>
                            <AccordionDetails>
                                <List>
                                    <ListItemButton component="li">
                                        <ListItemText primary="Spam" />
                                    </ListItemButton>
                                    <ListItemButton component="li">
                                        <ListItemText primary="Spam" />
                                    </ListItemButton>
                                    <ListItemButton component="li">
                                        <ListItemText primary="Spam" />
                                    </ListItemButton>
                                </List>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<FaChevronDown />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Accordion 1
                            </AccordionSummary>
                            <AccordionDetails>
                                <List>
                                    <ListItemButton component="li">
                                        <ListItemText primary="Spam" />
                                    </ListItemButton>
                                    <ListItemButton component="li">
                                        <ListItemText primary="Spam" />
                                    </ListItemButton>
                                    <ListItemButton component="li">
                                        <ListItemText primary="Spam" />
                                    </ListItemButton>
                                </List>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<FaChevronDown />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Accordion 1
                            </AccordionSummary>
                            <AccordionDetails>
                                <List>
                                    <ListItemButton component="li">
                                        <ListItemText primary="Spam" />
                                    </ListItemButton>
                                    <ListItemButton component="li">
                                        <ListItemText primary="Spam" />
                                    </ListItemButton>
                                    <ListItemButton component="li">
                                        <ListItemText primary="Spam" />
                                    </ListItemButton>
                                </List>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<FaChevronDown />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Accordion 1
                            </AccordionSummary>
                            <AccordionDetails>
                                <List>
                                    <ListItemButton component="li">
                                        <ListItemText primary="Spam" />
                                    </ListItemButton>
                                    <ListItemButton component="li">
                                        <ListItemText primary="Spam" />
                                    </ListItemButton>
                                    <ListItemButton component="li">
                                        <ListItemText primary="Spam" />
                                    </ListItemButton>
                                </List>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<FaChevronDown />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Accordion 1
                            </AccordionSummary>
                            <AccordionDetails>
                                <List>
                                    <ListItemButton component="li">
                                        <ListItemText primary="Spam" />
                                    </ListItemButton>
                                    <ListItemButton component="li">
                                        <ListItemText primary="Spam" />
                                    </ListItemButton>
                                    <ListItemButton component="li">
                                        <ListItemText primary="Spam" />
                                    </ListItemButton>
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    </List>
                </Grid>
                <Grid item xs={9} sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "1rem"
                }}>
                    {
                        Prouducts.map((product) => (<ProductCard
                            title={product.name}
                            desc={product.description}
                            img={product.image}
                        />))
                    }
                </Grid>
            </Grid>
        </Box>
    )
}

export default Homepage