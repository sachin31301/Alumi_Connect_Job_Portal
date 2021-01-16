import React from 'react'
import {Box,Grid,FilledInput,Button,Select,IconButton,MenuItem,Dialog,DialogContent,DialogTitle,DialogActions,makeStyles, Typography, CircularProgress} from '@material-ui/core';
import {Close as CloseIcon} from  "@material-ui/icons";
import {format}  from "date-fns";

const useStyles= makeStyles((theme)=>({
    info:{
        '& > *' :{
            margin:"4px",
        }
    },
    skillChip:{
        margin:theme.spacing(0.5),
        padding:theme.spacing(0.75),
        borderRadius:"5px",
        fontWeight:600,
        fontSize:"14.5px",
        backgroundColor:theme.palette.secondary.main,
        color:"#fff",
        display:"flex",

    },
})) 
 
function ViewJobModal(props) {
    const classes= useStyles();
    return (
        <div>
        <Dialog open={!!Object.keys(props.job).length} fullWidth>
           <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        {props.job.title} @ {props.job.companyName}
                        <IconButton onClick={props.closeModal}>
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                </DialogTitle> 
                <DialogContent></DialogContent>
                <Box>
                    <Box className={classes.info} display="flex">
                        <Typography variant='body2'>Posted On :</Typography>
                        <Typography variant='body2'>{props.job.postedOn &&format( props.job.postedOn,"dd/MMM/yyyy HH:MM")}</Typography>
                    </Box>
                    <Box className={classes.info} display="flex">
                        <Typography variant='body2'>Job Type :</Typography>
                        <Typography variant='body2'>{props.job.type}</Typography>
                    </Box>
                    <Box className={classes.info} display="flex">
                        <Typography variant='body2'>Branch :</Typography>
                        <Typography variant='body2'>{props.job.branch}</Typography>
                    </Box>
                    <Box className={classes.info} display="flex">
                        <Typography variant='body2'>Description :</Typography>
                        <Typography variant='body2'>{props.job.description}</Typography>
                    </Box>
                    <Box className={classes.info} display="flex">
                        <Typography variant='body2'>Company Name :</Typography>
                        <Typography variant='body2'>{props.job.companyName}</Typography>
                    </Box>
                    <Box className={classes.info} display="flex">
                        <Typography variant='body2'>Company Website :</Typography>
                        <Typography variant='body2'>{props.job.companyUrl}</Typography>
                    </Box>
                    <Box ml={0.5}  >
                        <Typography variant='body2'>Skills :</Typography>
                        <Grid container alignItems="center" >
                        {props.job.skills&& props.job.skills.map(skill=>( <Grid className={classes.skillChip}  key={skill} item>{skill}</Grid>))}
                        </Grid>
                    </Box>
                </Box>
                <DialogActions>
                    <Button variant="outlined" component="a" href={props.job.link} target="_blank">Apply</Button>
                </DialogActions>
            </Dialog>         
        </div>
    )
}

export default ViewJobModal

