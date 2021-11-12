import React, {Fragment} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const useStyles = makeStyles(theme => ({
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    check: {
        marginTop: theme.spacing(5),
        marginLeft: theme.spacing(5),
    }
  }))

const Welcome = (props) => {

    const classes = useStyles()

    return (

        <Fragment>
            <Typography variant="h6" className={classes.instructions}>
                Termos de uso de software
            </Typography>

            <Typography className={classes.instructions}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
            unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
            dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            </Typography>

            <FormGroup row className={classes.check}>
                <FormControlLabel
                    control={
                    <Checkbox
                        id="policyChecked"
                        checked={props.policyChecked}
                        onChange={props.policyChanged}
                        color="primary"
                    />
                    }
                    label="Aceito os termos"
                />
            </FormGroup>
        </Fragment>
    )
}

export default Welcome