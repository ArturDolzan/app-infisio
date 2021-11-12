import React, {Fragment} from 'react'
import {Route, Redirect} from 'react-router-dom'

import CalendarInfisio from './calendar/calendar'


const Agenda = ({match}) => {

    return (
        <Fragment>
            
            <div style={{height: (window.screen.height - 300) + "px"}}>
                <Route exact path={`${match.url}/`} component={CalendarInfisio}/>
            </div>

        </Fragment>
    )
}

export default Agenda