import React, {Fragment} from 'react'
import AccessibleIcon from '@material-ui/icons/Accessible'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'
import ListaBase from '../../base/crud/listaBase'
import Pacientes from '../../model/clinica/pacientes/pacientes'
import PacientesController from '../../controller/clinica/pacientes/pacientesController'

import { connect } from "react-redux"
import {open} from '../../actions/alertDialogBaseAction'

const useStyles = makeStyles(theme => ({   	
	anaButton: {
        marginLeft: theme.spacing(1),
        color: "#f0a500",
        "&:hover": {
        backgroundColor: "#f4f4f4"
        }
    },
}))

const ListaPaciente = (props) => {

    const classes = useStyles()

    const columnsFormat = []
    const [selectedRow, setSelectedRow] = React.useState(null)

    const setarSelectedRow = (row) => {
        setSelectedRow(row)
    }

    const renderizarAcoes = () => {

        return (
            <Fragment>

                <Tooltip title="Anamnese" placement="right-end">
                    <IconButton className={classes.anaButton} aria-label="Anamnese" color="secondary" onClick={handleClickAnamnese}>
                        <AccessibleIcon />
                    </IconButton>
                </Tooltip>
              
            </Fragment>
        )
    }

    const handleClickAnamnese = () => {

        if (!selectedRow) {

            props.open({
                title: "Atenção",
                text: `Selecione um registro`
            })

            return
        }     
        
        props.history.push(`${props.match.url}/anamnese/${selectedRow.id}`)
    }

    return (
        <Fragment>

            <ListaBase
                model={new Pacientes()}
                controller={new PacientesController()}
                title={"Pacientes"}
                columnsFormat={columnsFormat}
                filterPlaceholder={"Filtrar por nome, e-mail, etc..."}
                renderActions={renderizarAcoes()}
                selectedRow={setarSelectedRow}
            />

        </Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        open: (data) => { dispatch(open(data)) },
    }
}

export default connect(null, mapDispatchToProps)(ListaPaciente)