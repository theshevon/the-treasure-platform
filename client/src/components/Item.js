import React, { Component } from 'react'
import withStyles from "@material-ui/core/styles/withStyles";

// MUI imports
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        display: "flex",
        marginBottom: 20
    },
    image: {
        minWidth: 200
    },
    content:{
        padding: 25
    }
}
export class Item extends Component {
    render() {
        const { classes, item : { name, description } } = this.props;
        return (
            <Card className= { classes.card }>
                <CardMedia
                    image={"https://www.picclickimg.com/d/w1600/pict/123378169351_/rare-ORIGINAL-BEN-10-OMNITRIX-WATCH-FX-lights.jpg"}
                    title="item image"
                    className= { classes.image }/>
                <CardContent class= { classes.content }>
                    <Typography variant="h5">{ name }</Typography>
                    <Typography variant="body1">{ description }</Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Item);
