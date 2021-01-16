import React from 'react';
import {Typography,Box,Button,Grid,makeStyles} from '@material-ui/core';
import {differenceInMinutes,differenceInDays} from "date-fns";
 
const useStyles=makeStyles((theme)=>(
    {
        wrapper:{
            border: "1px solid #e8e8e8",
            cursor:"pointer",
            transition:"0.3s",

            "&:hover" :{
                boxShadow:"0px,5px,25px rgba(0,0,0,0.1)",
                borderLeft:"6px solid #4d64e4",
            }
        },
        companyName:{
            fontSize:"13.5px",
            backgroundColor:theme.palette.primary.main,
            padding: theme.spacing(0.75),
            borderRadius:"5px",
            fontWeight:600,
            display:"inline-block",
        },
        skillChip:{
            margin:theme.spacing(0.5),
            padding:theme.spacing(0.75),
            borderRadius:"5px",
            fontWeight:600,
            fontSize:"14.5px",
            backgroundColor:theme.palette.secondary.main,
            color:"#fff",

        }
    }
))

export default(props)=> {
   const skills= ["Javascript", "React.js", "Node.js"];
   const classes=useStyles();
    return (
        
        <Box p={2} className={classes.wrapper}>
            <Grid container alignItems="center">
                <Grid item xs>
                    <Typography variant="subtitle1">{props.title}</Typography>
                    <Typography className={classes.companyName} variant="subtitle1">{props.companyName}</Typography>
                </Grid>
                <Grid item container xs>
                   { props.skills.map(skill=>( <Grid className={classes.skillChip} key={skill} item>{skill}</Grid>))}
                </Grid>
                <Grid item container direction="column" alignItems="flex-end" xs>
                    <Grid item>
                    <Typography variant="caption">{(differenceInDays(Date.now() ,props.postedOn)) } days ago|{props.type}|{props.branch}</Typography>
                    </Grid>
                    <Grid item>
                        <Box mt={2}>
                            <Button onClick={props.open} variant="outlined">Check</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box> 
        
    )
}


