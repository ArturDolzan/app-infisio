import React, {Fragment} from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

const SkeletonBase = () => {

    return (
        <Fragment>
        
            <Skeleton variant="text" />
            <Skeleton variant="circle" width={40} height={40} />
            <Skeleton variant="rect" width={210} height={118} />
        
        </Fragment>
    )
} 

export default SkeletonBase