import React, {Fragment, useState, useEffect} from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import DateInputBase from './input/dateInputBase'
import moment from 'moment'
import 'moment/locale/pt-br'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
    },
    marginLeft1: {
      marginLeft: theme.spacing(1),
    },
    ctnDataInicial: {
        width: '140px',
        marginTop: '5px',
        marginLeft: '8px'
    },
    ctnDataFinal: {
        width: '140px',
        marginTop: '5px',
        marginLeft: '8px'
    }
}))

const FiltroPeriodoBase = (props) => {

    const classes = useStyles()

    const [period, setPeriod] = useState(1)
    const [dataFiltro, setDataFiltro] = useState({
        inicial: props.default ? props.default.inicial : moment().startOf('day').format('DD/MM/YYYY'),
        final: props.default ? props.default.final : moment().endOf('day').format('DD/MM/YYYY')
    })
    const [errorDataText, setErrorDataText] = useState('')
    
    const handleChangePeriod = (event) => {
        setPeriod(event.target.value)
    }

    useEffect(() => {

        // Hoje
        if (period === 1) {

            setDataFiltro({
                ...dataFiltro,
                inicial: moment().startOf('day').format('DD/MM/YYYY'),
                final: moment().endOf('day').format('DD/MM/YYYY')
            })
        }

        // Semana
        if (period === 2) {

            setDataFiltro({
                ...dataFiltro,
                inicial: moment().startOf('week').format('DD/MM/YYYY'),
                final: moment().endOf('week').format('DD/MM/YYYY')
            })
        }

        // Mês
        if (period === 3 || period === 4) {
            
            setDataFiltro({
                ...dataFiltro,
                inicial: moment().startOf('month').format('DD/MM/YYYY'),
                final: moment().endOf('month').format('DD/MM/YYYY')
            })
        }

        return () => { 
        }        
    }, [period])

    useEffect(() => {
        
        if(!moment(dataFiltro.inicial, 'DD/MM/YYYY HH:mm').isValid()) return

        if(!moment(dataFiltro.final, 'DD/MM/YYYY HH:mm').isValid()) return
    
        if(moment(dataFiltro.inicial, 'DD/MM/YYYY').isAfter(moment(dataFiltro.final, 'DD/MM/YYYY'))) return

        console.log(dataFiltro)
        props.onChange(dataFiltro)

        return () => { 
        }        
    }, [dataFiltro.inicial, dataFiltro.final])

    return (
        <Fragment>
            <div className={classes.container}>
               
                <Select
                className={classes.marginLeft1}
                labelId="period"
                id="period-select"
                value={period}
                onChange={handleChangePeriod}
                >
                    <MenuItem value={1}>de hoje</MenuItem>
                    <MenuItem value={2}>dessa semana</MenuItem>
                    <MenuItem value={3}>desse mês</MenuItem>
                    <MenuItem value={4}>por período</MenuItem>
                </Select>

                {period === 4 && (
                    <Fragment>
                        <div className={classes.ctnDataInicial}>
                            
                            <DateInputBase
							id="dataInicial"						
							label="Início"
                            value={dataFiltro.inicial} 
                            inputVariant={"standard"}						
							disableFuture={false}
							onError={(e) => {
                                
                                setErrorDataText(e)
							}}
							onChange={(_, dateString) => {
                               
								setDataFiltro({
                                    ...dataFiltro,
                                    inicial: dateString,
                                })
							}}
							required={false}
							/>
                           
                        </div>

                        <div className={classes.ctnDataFinal}>

                            <DateInputBase
							id="dataFinal"						
							label="Fim"
                            value={dataFiltro.final} 
                            inputVariant={"standard"}						
							disableFuture={false}
							onError={(e) => {
                                
                                setErrorDataText(e)
							}}
							onChange={(_, dateString) => {
								setDataFiltro({
                                    ...dataFiltro,
                                    final: dateString,
                                })
							}}
							required={false}
							/>
                          
                        </div>
                    </Fragment>
                )}
            </div>
        </Fragment>
    )
}

export default FiltroPeriodoBase