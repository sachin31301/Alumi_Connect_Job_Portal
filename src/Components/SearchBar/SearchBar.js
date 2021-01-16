import { Select } from '@material-ui/core'
import React,{useState} from 'react'
import {Button,MenuItem,makeStyles,CircularProgress} from "@material-ui/core";
import Box from '@material-ui/core/Box';

const useStyles= makeStyles({
    wrapper :{
        background:"#fff",
        display: "flex",
        boxShadow:"0px 1px 5px rgba(0,0,0,0.1)",
        borderRadius:"5px",
        "& > *":{
            flex:"1",
            height:"45px",
            margin:"8px",
        },

    },
}
    
)

const SearchBar=(props)=> {
    const [loading,setloading]=useState(false);
    const[jobSearch,setJobSearch]=useState({type:"Full time",branch:"Computer Science"})
    const classes= useStyles();

    const handlechange=e=>{
        e.persist();
       setJobSearch(oldState=>({...oldState, [e.target.name]:e.target.value})) 
    }

   const search= async ()=>{
        setloading(true);
        
       
        await props.fetchJobsCustom(jobSearch);
         
         
        setloading(false);
    }
    
  
    return (
       <Box p={2} mb={2} mt={-5}  className={classes.wrapper} >
          <Select onChange={handlechange} value={jobSearch.type} name="type" disableUnderline variant="filled" >
              <MenuItem value="Full time">Full time</MenuItem>
              <MenuItem value="Internship">Internship</MenuItem>
          </Select>
          <Select onChange={handlechange} value={jobSearch.branch} name="branch" disableUnderline variant="filled"  >
              <MenuItem value="Computer Science">Computer Science</MenuItem>
              <MenuItem value="Mechanical">Mechanical</MenuItem>
              <MenuItem value="Electrical">Electrical</MenuItem>
              <MenuItem value="Civil">Civil</MenuItem>
              <MenuItem value="General">General</MenuItem>
          </Select> 
          <Button variant="contained" disabled={loading} onClick={search} color="primary" disableElevation>{loading ? <CircularProgress color="secondary" size={22}/> : "Search"}</Button>   
          </Box>
    )
}

export default SearchBar
