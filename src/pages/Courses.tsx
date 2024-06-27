import { IonAccordion, IonAccordionGroup, IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonChip, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRefresher, IonRefresherContent, IonSkeletonText, IonText, IonTitle, IonToolbar, useIonAlert, useIonToast } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import DeviceHook from './hooks/DeviceHook';
import SemHook from './hooks/SemHook';
import UserData from './hooks/UserData';
import { Preferences } from '@capacitor/preferences';
import hat from '../assets/hat.png'
import { add, book, bookOutline, closeOutline, remove, trainOutline, trash, trashBinOutline, trashOutline } from 'ionicons/icons';
import { useDataContext } from './context/UserContext';
import axios from 'axios';
const Courses: React.FC = () => {
    const[showAlert]=useIonAlert();
    const[showTost]=useIonToast();
    const[loading,setLoading] = useState<boolean>(true)
    const{csem,cYear}=SemHook();
    const {studid,username } = useDataContext();
    const[courseData,setCourseData]=useState<any>([]);

    const getRegisteredCourses = async (studid:any) => {
        try {
           const formData=new FormData();
           formData.append("studentId", studid);
           const path='http://localhost/server/code.php?action=myCourses';
          const response = await axios.post(path, formData)
          console.log(response.data);
              if(response.data.success===true)  
                {
                setCourseData(response.data.rCourses)
                } 
                else{
                    showTost(
                        {
                            message: response.data.message,
                            duration: 3000,
                            color: 'danger'
                        });
                }
          }
        catch (error:any) {
            console.log(error);
            showTost(
                {
                    message: error,
                    duration: 3000,
                    color: 'danger'
                }
                );
      }
     
      }
    useEffect(() => {
        getRegisteredCourses(studid);
        setLoading(false);
        
    },[])
    
       
    const doRefresh = async(event:any) => {
        getRegisteredCourses(studid);
       event.target.complete();
       setLoading(false);
    }
    const doDelete = async(subId:any,stID:any,coYear:any,coSem:any,subCODE:any,uid:any) => {
        try {
            const data= new FormData()
            data.append("id",stID)
            data.append("subId",subId)
            data.append("year",coYear)
            data.append("sem",coSem)
            data.append("username",uid) 
            data.append("ccode",subCODE) 
            const response = await axios.post('http://localhost/server/code.php?action=deleteCourse', data);
           
            if (response.data.success===true) {
                console.log(response.data);
              getRegisteredCourses(studid);
              showTost({
                  message: response.data.message,
                  duration: 3000,
                  color: 'success'
                 }
                 );
                
            } else {
                console.log(response.data.message);
              showTost({
                  message: "Failed to delete course",
                  duration: 3000,
                  color: 'danger'
                 }
                 )
            }
          } catch (error:any) {
          showTost({
                  message: error.message,
                  duration: 3000,
                  color: 'danger'
                 }
                 )
          }
        };
        
const handleDelete=(name:any,coId:any, stID:any,coYear:any,coSem:any,subCODE:any)=>{
    showAlert({
        message:`You are sure you want to delete  ${name}?`,
        header: 'Confirm Delete',
        buttons: [
            {text:'Cancel', role: 'Cancel'},
            {text:'Delete',
            handler:()=>doDelete(coId, stID,coYear, coSem, subCODE,username)
        },
         ],
    });
}
    return (
        <IonPage>
            <IonHeader>
            <IonToolbar color={'secondary'}>
                <IonButtons slot='start'>
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle>My Courses</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            <IonRefresher slot='fixed'  onIonRefresh={(ev)=>doRefresh(ev)}>
                    <IonRefresherContent />
                </IonRefresher>
       
                <div className='contentwrapper'>
                   
                
                
                        <IonChip  style={{width:'90%',marginLeft:"7%"}}>Your Courses in {' '}{cYear}, {csem===1?'Jan-June':'July-Dec'}</IonChip>
        
                    

                   
                   { loading && (
                               [...Array(6)].map((_, index)=>(
                                <IonCard key={index}>
                                                <IonCardContent>
                                                <IonIcon icon={bookOutline} color={'success'}slot='start'></IonIcon> <IonText><IonSkeletonText animated  style={{width:'150px'}} /></IonText> <IonText slot='end'><IonSkeletonText /></IonText>
                                                    <p><IonSkeletonText /></p>
                                                    <p><IonSkeletonText /></p>
                                                    </IonCardContent>
                                                               </IonCard>
                               ))
                            )
                               }
                                <IonAccordionGroup  style={{padding:"4%",backgroundColor:"#fff"}}>
                        { courseData.map((course:any, index:any)=>(
                            <IonAccordion key={index} value={index} color={'light'}>
                                <IonItem slot="header" color={'light'} >
                                <IonAvatar class='ion-float-left'>
                                    <IonImg src={hat}></IonImg>
                                </IonAvatar> 
                                <IonLabel className='ion-text-wrap'>{course.subject_title}</IonLabel> <IonIcon icon={trashOutline} color={'danger'} slot='end'
                                onClick={()=>handleDelete(course.subject_title,course.subject_id, studid,course.year,course.semester,course.subject_code)}></IonIcon>
                               </IonItem>
                               <div className="ion-padding" slot="content" style={{padding:"0",marginLeft:"12%"}}>
                                    <IonChip>Lecturer:{course.lastname} {course.firstname}</IonChip><IonChip>Cell:{course.pno}</IonChip>
                                    </div>
                                    </IonAccordion>

                        ))}
                        </IonAccordionGroup>
                  </div>
            </IonContent>
            <IonFab horizontal='end' vertical='bottom' slot='fixed'>
        <IonFabButton id='card-modal' color={'success'} routerLink='/app/settings/addCourses'> <IonIcon  icon={add} color={'light'}></IonIcon></IonFabButton>
    </IonFab>
        </IonPage>
    );
};

export default Courses;