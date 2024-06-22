import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

function ProductCard({title, desc, img}) {
    return (
        <Card sx={{ maxWidth: 345 }}>
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
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button variant="contained">View</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard