import React, {Fragment} from 'react'
import CheckIcon from '@material-ui/icons/Check'
import { green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
}))

const Final = () => {

    const classes = useStyles()

    return (
        <Fragment>
            <div className={classes.root}>
                <CheckIcon style={{ fontSize: 150, color: green[500] }}/>
                <Typography >
                    Dados iniciais coletados com sucesso. Demais informações podem ser configuradas durante a utilização do serviço
                </Typography>
            </div>
        </Fragment>
    )
}

export default Final