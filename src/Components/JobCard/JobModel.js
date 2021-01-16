import React, {useState} from 'react'
import {Box,Grid,FilledInput,Button,Select,IconButton,MenuItem,Dialog,DialogContent,DialogTitle,DialogActions,makeStyles, Typography, CircularProgress} from '@material-ui/core';
import {Close as CloseIcon} from  "@material-ui/icons";
const useStyles=makeStyles((theme)=>({
    skillChip:{
        margin:theme.spacing(0.5),
        padding:theme.spacing(0.75),
        borderRadius:"5px",
        fontWeight:600,
        fontSize:"14.5px",
        border:`1px solid ${theme.palette.secondary.main}`,
        color:theme.palette.secondary.main,
        cursor:"pointer",
        
        "&:hover" :{
            backgroundColor:theme.palette.secondary.main,
            color:"#fff",
        }
        

    },
    included:{
        backgroundColor:theme.palette.secondary.main,
        color:"#fff",
    },
}))

const initState={
    
    description:"",
    branch:"Computer Science",
    title: "",
    type: "Full time",
    
    companyName: "",
    companyUrl: "",
    skills: [],
    link: "",
    }

function JobModel(props) {
    const[loading,setloading]=useState(false);
    const[jobdetails,setjobdetails]= useState(initState);

    const handlechange=e=>{
        e.persist();
       setjobdetails(oldState=>({...oldState, [e.target.name]:e.target.value})) 
    }

    const closeModel=()=>{
        setjobdetails(initState);
        setloading(false);
        props.closeJobModel();
    }

    const addRemoveSkill=(skill)=>{
        return(
            jobdetails.skills.includes(skill) ?
            setjobdetails((oldState)=>({...oldState, skills: oldState.skills.filter((s)=>s!==skill),}))
            :
            setjobdetails((oldState)=>({...oldState, skills: oldState.skills.concat(skill),}))

        )
    }

    const handleSubmit= async ()=>{
        for(const field in jobdetails){
            
            if(typeof jobdetails[field]==="string"&&  !jobdetails[field])
            return console.log("not validated");
        }
        
        if(!jobdetails.skills.length) return console.log("validated");
        setloading(true);
        await props.postJob(jobdetails);
        closeModel();
    }

    const skills=["SolidWorks","Machine Learning","Project Management","AutoCad","Production","VLSI DESIGN","Web development","Data Analytics"];
    const classes=useStyles();
    return (
        <div>
            <Dialog fullWidth open={props.displaymodal}>
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        Post Job
                        <IconButton onClick={closeModel}>
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing ={2}>
                        <Grid item xs={6}>
                            <FilledInput 
                            onChange={handlechange}
                            name="title"
                            value={jobdetails.title}
                            autoComplete="off"
                             placeholder="Job Title" disableUnderline fullWidth/>
                        </Grid>
                        <Grid item xs={6}>
                          <Select
                           onChange={handlechange}
                           name="type"
                           value={jobdetails.type}
                           disableUnderline
                            fullWidth variant="filled"
                             >
                           <MenuItem value="Full time">Full time</MenuItem>
                            <MenuItem value="Internship">Internship</MenuItem>
                          </Select>
                        </Grid> 
                        <Grid item xs={6}>
                            <FilledInput
                             onChange={handlechange}
                            name="companyName"
                            value={jobdetails.companyName}

                             autoComplete="off"
                              placeholder="Company Name"
                               disableUnderline fullWidth/>
                        </Grid>
                        <Grid item xs={6}>
                            <FilledInput 
                             onChange={handlechange}
                            name="companyUrl"
                            value={jobdetails.companyUrl}
                            autoComplete="off"
                             placeholder="Company Url"
                              disableUnderline fullWidth/>
                        </Grid>
                        <Grid item xs={6}>
                         <Select 
                          onChange={handlechange}
                           name="branch"
                           value={jobdetails.branch}
                         disableUnderline
                          fullWidth variant="filled"  
                          >
                             <MenuItem value="Computer Science">Computer Science</MenuItem>
                            <MenuItem value="Mechanical">Mechanical</MenuItem>
                            <MenuItem value="Electrical">Electrical</MenuItem>
                             <MenuItem value="Civil">Civil</MenuItem>
                            <MenuItem value="General">General</MenuItem>
                         </Select> 
                        </Grid>
                        <Grid item xs={6}>
                        <FilledInput 
                         onChange={handlechange}
                         name="link"
                         value={jobdetails.link} autoComplete="off" placeholder="Job link" disableUnderline fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                        <FilledInput  
                         onChange={handlechange}
                         name="description"
                         value={jobdetails.description} autoComplete="off" placeholder="Job description" disableUnderline fullWidth multiline rows={4}/>
                        </Grid>
                    </Grid>
                    <Box mt={2}>
                        <Typography>Skills</Typography>
                        <Box display="flex">
                            {skills.map((skill)=>(
                                <Box onClick={()=> addRemoveSkill(skill)} className= {`${classes.skillChip} ${jobdetails.skills.includes(skill)&& classes.included}`} key={skill}>{skill}</Box>
                            )).slice(0,4)}

                        </Box>
                        <Box display="flex">
                            {skills.map((skill)=>(
                                <Box  onClick={()=> addRemoveSkill(skill)} className={`${classes.skillChip} ${jobdetails.skills.includes(skill)&& classes.included}`} key={skill}>{skill}</Box>
                            )).slice(4,skills.length)}

                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Box alignItems="center" color="red" width="100%" justifyContent="space-between" display="flex">
                    <Typography>*Required Fields</Typography>
                    <Button disabled={loading} onClick={handleSubmit} variant="contained" disableElevation color="primary">{loading ? <CircularProgress color="secondary" size={22}/> : "Post Job"}</Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default JobModel
