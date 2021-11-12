import React, {Fragment} from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'
import ListIcon from '@material-ui/icons/List'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Popover from '@material-ui/core/Popover'
import Container from '@material-ui/core/Container'

import logoBarra from '../base/images/logo_barra.png'

import {Link} from 'react-router-dom'
import UserMenu from './userMenu'
import MenuItens from './menuItens'
import MenuModulos from './menuModulos'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  container: {
    paddingTop: theme.spacing(1.5),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    display: 'flex',
    
  },
  containerItems: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    marginRight: theme.spacing(2)
  },
  containerItemsLink: {
    padding: theme.spacing(0.3)
  },
  links: {
    textDecoration: 'inherit', 
    color: '#2196F3',
    '&:hover': {
      textDecoration: "underline",
   },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menuUser: {
      marginLeft: 'auto'
  },
  iconList: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    '&:hover': {
      color: "#2196F3",      
   },
  }
}))


const MiniDrawer = () => {
  
    const classes = useStyles()
    const theme = useTheme()
    const [open, setOpen] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [listas, setListas] = React.useState([])

    const handleDrawerOpen = () => {
      setOpen(true)
    }

    const handleDrawerClose = () => {
      setOpen(false)
    }

    const clickExpandMenu = (e, listas) => {

      e.preventDefault()
      
      setListas(listas || [])

      setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
      setAnchorEl(null)
    }

    const openPop = Boolean(anchorEl)
    const id = openPop ? 'simple-popover' : undefined

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        style={{background: 'radial-gradient(ellipse farthest-corner, #393B80 20%, #2E325F 70%)'}}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>

            <Link to="/" style={{textDecoration: 'inherit', color: 'inherit'}}>
              {/* <Typography variant="h6" noWrap>
                InFisio
              </Typography> */}
              <img style={{height: "48px"}} src={logoBarra}/>
            </Link>

             <div className={classes.menuUser}>   
                       
            	  <UserMenu/>  
             </div> 

        </Toolbar>

      </AppBar>
      
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />

        <List>
          {MenuItens.map((item, idx) => (
            <Link key={item.nome} to={item.link} style={{textDecoration: 'inherit', color: 'inherit'}}>
                <Tooltip title={item.nome} placement="right-end">
                  <ListItem button >
                    <ListItemIcon>
                        
                        <span>
                          {item.icone}

                          {/* {item.listas && (
                              <ExpandMore onClick={(e) => {clickExpandMenu(e, item.listas)}} fontSize={'small'} className={classes.iconList}/>
                          )}                           */}
                        </span>

                    </ListItemIcon>
                    <ListItemText primary={item.nome} />

                  </ListItem>
                </Tooltip>

                {item.divider && (
                  <Divider />
                )}

            </Link>
          ))}
        </List>

      </Drawer>

	  <MenuModulos classes={classes}/>

    <Popover
          id={id}
          open={openPop}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
          }}
          transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
          }}
      >
          {renderDetailWindow(listas, classes, handleClose)}
      </Popover>
      
    </div>
  )
}

const renderDetailWindow = (list, classes, handleClose) => {

  return (
      <Fragment>
          
          <Container maxWidth="sm" className={classes.container}>
              <Typography noWrap  color="textSecondary">
                Listas
              </Typography>
          </Container>

          <Container className={classes.containerItems}>
              
              {list.map((item, idx) => (

                <div key={item.nome} className={classes.containerItemsLink}>
                    <Link to={item.path} className={classes.links} onClick={handleClose}>
                        {item.nome}
                    </Link>
                </div>

              ))}
          </Container>

      </Fragment>
  )
}

export default MiniDrawer