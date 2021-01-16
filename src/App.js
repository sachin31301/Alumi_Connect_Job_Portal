import React, {useEffect,useState} from "react";
import { Box,ThemeProvider,CircularProgress, Grid,Button} from "@material-ui/core";
import Header from "./Components/Header/"
import theme from "./theme/theme"
import SearchBar from "./Components/SearchBar/SearchBar"
import JobCard from "./Components/JobCard/JobCard"
import JobModel from "./Components/JobCard/JobModel"
import JobData from "./dummyData"
import {firestore,app} from "./FireBase/config"
import {Close as CloseIcon} from  "@material-ui/icons";
import ViewJobModal from "./Components/JobCard/ViewJobModal"
import TopHeader from "./Components/Header/TopHeader"

export default () => {
  const [Jobs,setJobs]=React.useState([])
  const [loading,setloading]= useState(true)
  const [displaymodal,setdisplaymodal]= useState(false)
  const [customSearch,setCustomSearch]=useState(false);
  const [viewJob,setViewJob]= useState({})


  const fetchjobs=async ()=>{
    setCustomSearch(false);
    setloading(true);
    const req= await firestore.collection('Jobs').orderBy('postedOn','desc').get(); 
    const tempJobs=req.docs.map((job)=>({...job.data(), id: job.id,postedOn:job.data().postedOn.toDate()}));
    setJobs(tempJobs);
    setloading(false);
  }

  const fetchJobsCustom= async (jobSearch)=>{
    setloading(true);
    setCustomSearch(true);
    const req= await firestore.collection('Jobs').orderBy('postedOn','desc')
    .where("type","==",jobSearch.type)
    .where("branch","==",jobSearch.branch)
    .get(); 
    const tempJobs=req.docs.map((job)=>({...job.data(), id: job.id,postedOn:job.data().postedOn.toDate()}));
    setJobs(tempJobs);
    setloading(false);
  }

  const postJob= async jobdetails=> {
    await firestore.collection('Jobs').add({
      ...jobdetails,
      postedOn : app.firestore.FieldValue.serverTimestamp()
      
    }
    ); fetchjobs();
  }

  useEffect(()=>{
    fetchjobs();
  },[])
  return (
    <ThemeProvider theme={theme}>
      <TopHeader/>
      <Header openJobModel={()=>setdisplaymodal(true)}/>
      <JobModel closeJobModel={()=>setdisplaymodal(false)} displaymodal={displaymodal} postJob={postJob}/>
      <ViewJobModal job={viewJob} closeModal={()=>setViewJob({})}/>
      <Box mb={3}>
      <Grid container justify="center" >
        <Grid item xs={10}>
          <SearchBar fetchJobsCustom={fetchJobsCustom}/>
          {loading ?(
            <Box display="flex" justifyContent="center"><CircularProgress/></Box>
          ):
          (
          <>{customSearch&&(
          <Box my={2} display="flex" justifyContent="flex-end">
            <Button onClick={fetchjobs}>
              <CloseIcon size={20}/>
              Custom Search
            </Button>
          </Box>)}
           { Jobs.map((Job)=> <JobCard open={()=>setViewJob(Job)} key={Job.id} {...Job}/>)}
            
            </>
            )}
         
          
        </Grid>
      </Grid>
      </Box>
     
    </ThemeProvider>
  )
};
