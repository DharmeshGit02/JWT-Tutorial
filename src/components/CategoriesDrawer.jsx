import { Box, Drawer, Button, List, ListItem, ListItemButton, ListItemText, IconButton, Tooltip, Divider } from '@mui/material'
import { BiSolidCategoryAlt } from "react-icons/bi"
import { useState } from 'react'


function CategoriesDrawer({ categories }) {
    const [open, setOpen] = useState(false)

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen)
    }
    return (
        <>
            <Tooltip title="Categories">
                <IconButton onClick={toggleDrawer(true)}>
                    <BiSolidCategoryAlt />
                </IconButton>
            </Tooltip>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                    <List>
                        {
                            categories ? categories.map((category, index) => (
                                <>
                                    <ListItem key={index} disablePadding>
                                        <ListItemButton>
                                            <ListItemText primary={category} />
                                        </ListItemButton>
                                    </ListItem>
                                    {index != categories.length - 1 ? <Divider /> : ""}
                                </>
                            )) : ""
                        }
                    </List>
                </Box>
            </Drawer>
        </>
    )
}

export default CategoriesDrawer