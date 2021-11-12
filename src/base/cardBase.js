import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  }
})

const CardBase = (props) => {

  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardContent>
        {props.content}
      </CardContent>
      <CardActions>
        {props.action}
      </CardActions>
    </Card>
  )
}

export default CardBase