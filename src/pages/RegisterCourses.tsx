import { IonAvatar, IonButton, IonButtons, IonCard,  IonPopover,IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonMenuButton, IonModal, IonPage, IonRow, IonSearchbar, IonText, IonTitle, IonToolbar, useIonAlert, useIonToast } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import DeviceHook from './hooks/DeviceHook';
import { add, addCircleOutline, book, calendar, closeOutline, ellipsisVertical, home, person, searchOutline, time } from 'ionicons/icons';
import UserData from './hooks/UserData';
import hat from '../assets/hat.png'
import './Menu.css'
import './regsearch.css'
import SemHook from './hooks/SemHook';
import { useDataContext } from './context/UserContext';
import axios from 'axios';
const RegisterCourses: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const[noData,setNoData] = useState<any>(null);
    const[showTost]=useIonToast();
    //const{csem,cYear}=SemHook();
    const {studid,username} = useDataContext(); 
    const[selectedCourse,setSelectedCourse] = useState<any>(null);
    const modal=useRef<HTMLIonModalElement>(null);
    const{id,sem,uid}=UserData();
   
    
    const fetchData = async () => {
        try{
        const path= 'http://localhost/server/code.php?action=getCourses';
         const response=await axios.get(path);
        if(response.data.success===true)
            {
setData(response.data.aCourses);
console.log(response.data);
            }
            else
            {
                console.log(response.data);
                console.log(response.data.message);

            }
    }
    catch(err){
        console.log("error has ocourred"+err);
    }
     };
     const handleAddCorse = async (subjectID:any, studentID:any,username:any) => {
        const formData = new FormData();
        formData.append('subId',subjectID);
        formData.append('studId', studentID);
        formData.append('username', username);
          try {
            const path= 'http://localhost/server/code.php?action=addCourse'
            const response = await axios.post(path, formData)
            if(response.data.success===true) {
                showTost({
                    message:response.data.message,
                    duration:3000,
                    color:'success',
                    buttons:[
                       {text: 'OK', role: 'Dismiss',}
                    ]
        
                })
            }
            else {
                console.log(response.data)
                showTost({
                    message:response.data.message,
                    duration:3000,
                    color:'danger',
                    buttons:[
                       {text: 'OK', role: 'Dismiss',}
                    ]
        
                })
            }    
        } catch (error:any) {
            showTost({
                message:'Operatin failed:' + error,
                duration:3000,
                color:'danger',
                buttons:[
                   {text: 'OK', role: 'Dismiss',}
                ]
    
            }) 
        }
    }
    useEffect(() =>{
        fetchData();
    },[])
    const[search,setSearch] = useState<string>('');
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'secondary'}>
                <IonButtons slot='start'>
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle color={'light'}>Register Courses</IonTitle>
                    <IonButtons slot='end'>
                        <IonButton id="menu-triger"><IonIcon slot='icon-only' icon={ellipsisVertical}></IonIcon></IonButton>
                        <IonPopover trigger="menu-triger" triggerAction="click">
                         <IonContent class="ion-padding">Report a Bug</IonContent>
                         <IonContent class="ion-padding">About tecgenius</IonContent>
                      </IonPopover>
                    </IonButtons>
                </IonToolbar>
                <IonToolbar color={'secondary'}>
              
  <input className='ssinput' type="search" required onChange={(e)=>setSearch(e.target.value)}  placeholder='Search course...'/>
  <IonIcon icon={searchOutline}  color={'medium'} style={{marginLeft:'1.3%',fontWeight:'bold',fontSize:'1.3em'}}></IonIcon>
 
            </IonToolbar>
            </IonHeader>
            <IonContent>
           
            <div className='contentwrapper'>
                    
                      
        
                               
                          {data.filter((course)=>{
                            return  search.toLowerCase()==='' ? course : course.subject_title.toLowerCase().includes(search) 
                          }).map((course) =>(
                            <IonItem key={course.subject_id} onClick={()=>setSelectedCourse(course)} lines='none' className='course'  button>
                                
                                <IonAvatar class='ion-margin-end'>
                                    <img src={hat} />
                                </IonAvatar>
                                    <IonLabel className='ion-text-wrap'>
                                {course.subject_title} 
                                </IonLabel>

                               
                            
                         </IonItem>
                       
                          ))
                          }
                    
                    <IonModal ref={modal} isOpen={selectedCourse!==null} onIonModalDidDismiss={()=>setSelectedCourse(null)}
                    breakpoints={[0,0.7,0.8]} initialBreakpoint={0.6}>
                        
                        <IonHeader>
        <IonToolbar color={'success'}>
            <IonButtons slot='end'>
                <IonButton onClick={()=>modal.current?.dismiss()}><IonIcon slot='icon-only' icon={closeOutline} color={'light'}></IonIcon></IonButton>
            </IonButtons>
            <IonTitle color={'light'} >ADD SUBJECT</IonTitle>
        </IonToolbar>
        <IonToolbar>
          Add this course? <IonIcon slot='end' onClick={()=>{handleAddCorse(selectedCourse.subject_id,studid, username);
                        modal.current?.dismiss()
                    }} 
                        color={'success'} icon={addCircleOutline} size={'large'}><IonText color={'light'}></IonText></IonIcon>
        </IonToolbar>
    </IonHeader>
                    <IonContent class='ion-padding'>
                    <IonItem>
                            <IonLabel>
                        <IonIcon icon={book} color={'success'} slot='start'></IonIcon>{' '}  {selectedCourse?.subject_code} {selectedCourse?.subject_title} 
                        </IonLabel>
                       
                        </IonItem>
                        <IonItem>
                            <IonLabel>

                        <IonIcon icon={person}  color={'success'}  slot='start'></IonIcon>{' '}Lecturer:   {selectedCourse?.lastname}  {selectedCourse?.firstname}
                        </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>
                        <IonIcon icon={calendar}  color={'success'}  slot='start'></IonIcon>{' '}Offered Year:  {selectedCourse?.offered_year}
                        </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>
                        <IonIcon icon={time}  color={'success'}  slot='start'></IonIcon>{' '}Offered semester:{sem} 
                        </IonLabel>
                        </IonItem>
                        
                        <IonItem> 
                        <IonLabel>
                        <IonIcon icon={home}  color={'success'}  slot='start'></IonIcon> {' '}Department:{selectedCourse?.prog}
                        </IonLabel>
                        </IonItem>
                
                    </IonContent>
                    </IonModal>
                   </div>
            </IonContent>
        </IonPage>
    );
};

export default RegisterCourses;