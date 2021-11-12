import React, {Fragment, useEffect, useState} from 'react'
import {Doughnut} from 'react-chartjs-2'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import handleError from '../../base/errorHelper/errorHelper'
import {open} from '../../actions/alertDialogBaseAction'
import {openSnackBase} from '../../actions/snackBaseAction'
import { connect, useSelector } from "react-redux"

import SessoesController from '../../controller/clinica/sessoes/sessoesController' 

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        paddingBottom: theme.spacing(2),
    },
    rootPaper: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    containerNaoHaDados: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(4),
    }
}))

const corAgendada = "#51adcf"
const corConcluida = "#28df99"
const corCancelada = "#ff414d"

const HomeGrafico = (props) => {

    const classes = useStyles()
    const auth = useSelector(state => state.auth)

    const [retrieved, setRetrieved] = useState(false)    
    const [dados, setDados] = useState({
        labels: [
            'Agendado',
            'Concluído',
            'Cancelado'
        ],
        datasets: [{
            data: [0, 0, 0],
            backgroundColor: [
                corAgendada,
                corConcluida,
                corCancelada
            ],
            hoverBackgroundColor: [
                corAgendada,
                corConcluida,
                corCancelada
            ]
        }]
    })

    useEffect(() => {

        recuperarDados()

        return () => {
        }        
    }, [])

    const recuperarDados = () => {

        new SessoesController().recuperarDadosGraficoResumoSessoes({idagente: auth.idagente})
        .then(ret => {

            let data = {...dados}

            data.datasets[0].data[0] = ret.data.conteudo.qtdeAgendado
            data.datasets[0].data[1] = ret.data.conteudo.qtdeConcluido
            data.datasets[0].data[2] = ret.data.conteudo.qtdeCancelado

            setDados({...data})
            setRetrieved(true)
        })
        .catch(error => {

            props.open({
                title: "Ops",
                text: `Não foi possível recuperar dados do gráfico. \n\n Motivo: ${handleError(error)}`
            })
        }) 
    }

    return (
        <Fragment>
            <Paper className={classes.rootPaper} elevation={1} >
                
                <div className={classes.container}>
                    {window.innerWidth < 400 ? 
                        <Typography variant="subtitle2" color="textSecondary">
                            {`Resumo de suas sessões hoje`}
                        </Typography>
                    :
                        <Typography variant="h6" color="textSecondary">
                            {`Resumo de suas sessões hoje`}
                        </Typography>
                    }
                    
                </div>

                {(dados.datasets[0].data[0] === 0 && dados.datasets[0].data[1] === 0 && dados.datasets[0].data[2] === 0) ? 
                    <div className={classes.containerNaoHaDados}>
                        <Typography variant="subtitle1" color="textSecondary">
                            {`Nenhuma sessão para hoje`}
                        </Typography>
                    </div>
                :
                <div>
                    
                    {retrieved && (
                        <Doughnut data={dados} />
                    )}
                </div>
                }
            </Paper>    
        </Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        openSnackBase: (text) => { dispatch(openSnackBase(text)) },
        open: (data) => { dispatch(open(data)) },
    }
}

export default connect(null, mapDispatchToProps)(HomeGrafico)