import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions, IconButton, Rating } from '@mui/material'
import { FaCartShopping } from "react-icons/fa6"

function actualPrice(price, discountPerc) {
    price = Number(price)
    const discount = Number(discountPerc) / 100
    return Math.round(price + price * discount, 2)
}

function ProductCard({ title, desc, price, discount, rating, img }) {
    return (
        <Card sx={{ maxWidth: 320 }}>
            <CardActionArea>
                <CardMedia
                    sx={{ objectFit: "contain" }}
                    component="img"
                    height="140"
                    image={img}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" overflow={"auto"} sx={{ height: 100 }}>
                        {desc}
                    </Typography>
                    <Box>
                        <Rating name="read-only" value={rating} readOnly />
                    </Box>
                </CardContent>
            </CardActionArea>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <CardActions>
                    <Button variant="contained">View</Button>
                    <IconButton onClick={(event) => {
                        event.preventDefault()
                        alert("item added")
                    }}>
                        <FaCartShopping />
                    </IconButton>
                </CardActions>
                <Typography variant='h6' color={"GrayText"} mr={2}>$ {price}&nbsp;&nbsp;<strike style={{ color: 'lightgray' }}>${actualPrice(price, discount)}</strike></Typography>
            </Box>
        </Card>
    )
}

export default ProductCard