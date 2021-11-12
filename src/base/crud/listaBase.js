import React, {Fragment, useEffect, useState, useLayoutEffect} from 'react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import AutoRenewIcon from '@material-ui/icons/Autorenew'
import Tooltip from '@material-ui/core/Tooltip'
import {withRouter} from 'react-router-dom'
import { connect } from "react-redux"
import {open} from '../../actions/alertDialogBaseAction'
import PropTypes from 'prop-types'
import ChipInput from 'material-ui-chip-input'
import Search from '@material-ui/icons/Search'
import "moment/locale/pt-br"


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paperGrid: {
        width: '100%',
        height: '100%',
        boxShadow: "0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)",
        marginBottom: theme.spacing(1),
    },
    backButton: {
        marginLeft: theme.spacing(2),
    },
    paperHeaderGrid: {
        display: 'flex',
        width: '100%',
        height: '100%',
        boxShadow: "0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)",
        marginBottom: theme.spacing(1),
    },
    divPaperHeaderGrid: {
        minHeight: "75px", 
        display: "flex", 
        alignItems: "center"
    },
    marginLeft2: {
        marginLeft: theme.spacing(2),
    },
    fab: {     
      right: theme.spacing(3),
      backgroundColor: '#009900'
    },
    inserirNovo: {
        color: '#009900',
        "&:hover": {
            backgroundColor: "#e5ffe5"
        },
    },
    tableRow: {
        "&$selected, &$selected:hover": {
          backgroundColor: "#C3E8F9"
        },
        "&$hover:hover": {
            backgroundColor: "#DDF3FD"
          },
          userSelect: "none"
      },
    selected: {},
    hover: {}
}))


const ListaBase = (props) => {

    const classes = useStyles()
    const [windowSize, setWindowSize] = useState(0)

    useEffect(() => {

        buildColumns()

        listar(rowsPerPage, page + 1)

        return () => {
            
        }        
    }, [])

    useLayoutEffect(() => {
        
        function updateSize(){
          setWindowSize(window.innerWidth)
        }

        window.addEventListener('resize', updateSize)

        updateSize()

        return () => window.removeEventListener('resize', updateSize)

    }, [])

    
    const buildColumns = () => {

        let fields = props.model.fields.filter(item => !item.hidden)

        fields = fields.map((item, idx) => {
            
            let exists = props.columnsFormat.filter(data => data.id === item.id)[0]

            if (exists) {                
                item = {...item, ...exists}
            }

            return item
        })

        setColumns(fields)
    }

    const formatCol = (column, row) => {

        if (column.enum) {
            return formatColEnum(column, row)
        }
    
        if (column.type == "date") {
            return formatColDate(column, row)
        }

        if (column.type == "fk") {
            return row[column.relation][column.id]
        }

        return row[column.id]
    }

    const formatColEnum = (column, row) => {

        let data = column.enum.filter(x => x.id == row[column.id])[0]
    
        if (!data) return row[column.id]
    
        return data.label
    }

    const formatColDate = (column, row) => {

        if (!row[column.id]) return 

        return row[column.id].replace(/\s\d{2}:\d{2}:\d{2,4}$/, '')
        //return moment.utc(row[column.id]).format("DD/MM/YYYY")
    }

    const listar = (qtdePagina, numeroPagina) => {

        let data = props.controller.recuperar(qtdePagina, numeroPagina, filter, (ret) => {
            
            setRows([...ret.data.conteudo.results])
            setTotalRows(parseInt(ret.data.conteudo.total))            
        }, (error) => {

            props.open({
                title: "Ops",
                text: `Não foi possível listar. \n Erro: ${error.response.statusText}`
            })
        })
    }

    const [page, setPage] = React.useState(0)
    const [selectedID, setSelectedID] = React.useState(null)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [rows, setRows] = React.useState([])
    const [totalRows, setTotalRows] = React.useState(0)
    const [columns, setColumns] = React.useState([])
    const [filter, setFilter] = React.useState([])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)

        listar(rowsPerPage, newPage + 1)
    }

    const handleChangeRowsPerPage = event => {
        
        setRowsPerPage(event.target.value)
        setPage(0)
        
        listar(event.target.value, 1)
    }

    const handleRefresh = () => {

        listar(rowsPerPage, page + 1)
    }

    const handleKeyDown = (event, row) => {
        
        if (event.keyCode === 13) {
            props.history.push(`${props.match.url}/cadastro/${row.id}`)
        }
    }

    const handleAddChip = chip => {

        let aux = [...filter]
        aux.push(chip)
        setFilter(aux)
    }

    const handleDeleteChip = (chip, index) => {
        
        let newFilter = filter.filter(e => e !== chip)
        setFilter(newFilter)        
    }

    useEffect(() => {        
        listar(rowsPerPage, page + 1)
    }, [filter])


    return (
        <Fragment>

            <div className={classes.root}>

                <Grid item xs={12} >

                    <Grid container spacing={2}>

                        <Paper className={classes.paperHeaderGrid} variant="elevation">

                            <div className={classes.divPaperHeaderGrid}>

                                <Tooltip title="Voltar" placement="right-end">
                                    <IconButton className={classes.backButton} aria-label="Atualizar" color="primary" onClick={() => props.history.goBack()}>
                                        <ArrowBackIcon />
                                    </IconButton>
                                </Tooltip>

                                <Typography className={classes.marginLeft2} variant="h6">
                                    {props.title}
                                </Typography>
                                
                                <Tooltip title="Atualizar" placement="right-end">
                                    <IconButton className={classes.marginLeft2} aria-label="Atualizar" color="primary" onClick={handleRefresh}>
                                        <AutoRenewIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Inserir novo" placement="right-end">
                                    <IconButton className={classes.inserirNovo} aria-label="Inserir novo" color="secondary" onClick={() => props.history.push(`${props.match.url}/cadastro/0`)}>
                                        <AddCircleOutlineIcon />
                                    </IconButton>
                                </Tooltip>

                                <Fragment>
                                    {props.renderActions}
                                </Fragment>

                                {windowSize > 800 && (
                                    <Fragment>
                                    <Search style={{marginLeft: "25px"}}/>
                                    <ChipInput
                                      value={filter}    
                                      fullWidth={true}  
                                      fullWidthInput={true}
                                      style={{minWidth: "400px"}}    
                                      placeholder={props.filterPlaceholder}
                                      onAdd={(chip) => handleAddChip(chip)}
                                      onDelete={(chip, index) => handleDeleteChip(chip, index)}
                                    />
                                    </Fragment>
                                )}

                                {/* <Tooltip title="Inserir novo" placement="left-end">
                                    <Fab aria-label="add" className={classes.fab} color="secondary" onClick={() => props.history.push(`${props.match.url}/cadastro/0`)}>
                                        <AddIcon />
                                    </Fab>
                                </Tooltip> */}
                            </div>

                        </Paper>

                        <Paper className={classes.paperGrid} variant="elevation">
                            <TableContainer >
                                <Table stickyHeader aria-label="sticky table">

                                {/* <colgroup>
                                    <col width="5%" />
                                    <col width="10%" />
                                </colgroup> */}

                                <TableHead>                                    
                                    <TableRow >

                                        <TableCell
                                            key={"editaction"}
                                            align={"left"}
                                            style={{ width: 5 }}
                                            >

                                        </TableCell>

                                        {columns.map((column, idx) => (
                                            <TableCell
                                            key={column.id}
                                            align={"left"}
                                            style={{ minWidth: column.minWidth }}
                                            >
                                            {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {rows.map(row => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id} 
                                                onDoubleClick={() => props.history.push(`${props.match.url}/cadastro/${row.id}`)} 
                                                onKeyDown={(event) => {handleKeyDown(event, row)}}
                                                onClick={() => {
                                                    setSelectedID(row.id) 
                                                    if (props.selectedRow) {
                                                        props.selectedRow(row)
                                                    }
                                                }} 
                                                selected={selectedID === row.id} 
                                                classes={{ selected: classes.selected, hover: classes.hover }} 
                                                className={classes.tableRow}
                                                >

                                            <TableCell
                                                key={"editaction"}
                                                align={"left"}
                                                >
                                                <Tooltip title="Editar" placement="right-end">
                                                    <IconButton size="small" aria-label="Editar" color="secondary" onClick={() => props.history.push(`${props.match.url}/cadastro/${row.id}`)}>
                                                        <EditIcon fontSize="small"/>
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>

                                            {columns.map(column => {
                                            
                                                return (
                                                <TableCell key={`${column.id}`} align={"left"}>
                                                    {formatCol(column, row)}
                                                </TableCell>
                                                );
                                            })}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 50]}
                                component="div"
                                count={totalRows}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                labelRowsPerPage={"Linhas por página"}
                            />
                            </Paper>
                    </Grid>

                </Grid>
            </div>
        </Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        open: (data) => { dispatch(open(data)) }
    }
}

ListaBase.propTypes = {
    model: PropTypes.any.isRequired,
    controller: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    columnsFormat: PropTypes.any.isRequired,
    filterPlaceholder: PropTypes.string.isRequired,
}

export default withRouter(connect(null, mapDispatchToProps)(ListaBase))