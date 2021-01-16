import React from 'react'
import {Box,Grid,Typography,Button,makeStyles} from "@material-ui/core";



export default (props)=> {
  
    return (
        
        <Box p={8}  bgcolor="secondary.main" color="white">
            
          <Grid container justify="center">
              <Grid item xs={10}>
                  <Box justifyContent="space-between" display="flex">
                 <Typography  variant="h6">Open Opportunities</Typography> 
                 <Button onClick={props.openJobModel}   variant="contained" color="primary" disableElevation>Post a Job</Button>
                 </Box>
                 
              </Grid>
          </Grid> 
        </Box>
        
    )
}


