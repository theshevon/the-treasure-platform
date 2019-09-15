import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './Item.css';

export class Item extends Component {

    render() {

        const { item } = this.props;

        return (

            <Card className="card">
				<Card.Title className="class-title">{item.name}</Card.Title>
                <Card.Img className="card-img-top" variant="top" src={item.img_src} />
                <Card.Body className="card-body">
                  {/* <Card.Title>{item.name}</Card.Title> */}
                  <Card.Text className="card-text">
                    {item.desc.length > 25 ? item.desc + "..." : item.desc}
                  </Card.Text>
                  <Button className="btn" variant="light">more info</Button>
                </Card.Body>
            </Card>

            // <Card className={classes.card}>
            //     <CardActionArea>
            //         <CardMedia
            //         className={classes.media}
            //         image={item.img_src}
            //         title="item image"
            //         />
            //         <CardContent>
            //             <Typography gutterBottom variant="h5" component="h2">
            //                 {item.name}
            //             </Typography>
            //             <Typography variant="body2" color="textSecondary" component="p" className={classes.text}>
            //                 {item.desc.length > 50 ? item.desc + "..." : item.desc}
            //             </Typography>
            //         </CardContent>
            //     </CardActionArea>
            //     <CardActions className={classes.actions}>
            //         <Button
            //           size="small"
            //           color="primary"
            //           component={ Link }
            //           to={ "/items/" + item.id}>
            //         View
            //         </Button>
            //     </CardActions>
            // </Card>
        )
    }
}

export default Item;

