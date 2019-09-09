import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from "react-router-dom/Link";

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  text: {
    textAlign: 'justify'
  },
  actions: {
    justifyContent: 'center',
  }
}

export class Item extends Component {

    render() {

        const { classes, item } = this.props;
        return (
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={item.img_src}
                    title="item image"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {item.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" className={classes.text}>
                            {item.desc.length > 50 ? item.desc + "..." : item.desc}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.actions}>
                    <Button
                      size="small"
                      color="primary"
                      component={ Link }
                      to={ "/items/" + item.id}>
                    View
                    </Button>
                </CardActions>
            </Card>
        )
    }
}

export default withStyles(styles)(Item);

