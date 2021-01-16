import React from 'react'
import {Box,makeStyles, Typography} from '@material-ui/core';
const useStyles=makeStyles({
    heading:{
        fontFamily:"cursive",
        fontStyle:"italic",
        fontSize:"50px",
        marginTop:"10px",
        justifyContent:"center",
        marginLeft:"400px",
        
        
    },
    
    
})

function TopHeader() {
    const classes=useStyles()
    return (
        <div>
            <Box p={2}  bgcolor="secondary.main" color="yellow">
                <Typography className={classes.heading}  variant="h6">Alumni Connect</Typography>
            </Box>
        </div>
    )
}

export default TopHeader
