import React from 'react'
import HomeIcon from '@material-ui/icons/Home'
import EventIcon from '@material-ui/icons/Event'
import LocalHopitalIcon from '@material-ui/icons/LocalHospital'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import SettingsIcon from '@material-ui/icons/Settings'

const MenuItens = [
    {
        icone: <HomeIcon />,
        nome: 'Home',
        link: '/home',
        divider: false
    },
    {
        icone: <EventIcon />,
        nome: 'Agenda',
        link: '/agenda',
        divider: false
    },
    {
        icone: <LocalHopitalIcon />,
        nome: 'Clínica',
        link: '/clinica',
        divider: true
    },    
    // {
    //     icone: <AttachMoneyIcon />,
    //     nome: 'Faturamento',
    //     link: '/faturamento',
    //     divider: true
    // },
    {
        icone: <SettingsIcon />,
        nome: 'Configurações',
        link: '/configuracoes',
        divider: false
    }
]

export default MenuItens