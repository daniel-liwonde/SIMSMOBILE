import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonMenuButton, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSkeletonText, IonText, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { bookOutline, ellipsisVertical, timeOutline, trashOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import UserData from './hooks/UserData';
import SemHook from './hooks/SemHook';
import hat from '../assets/hat.png'
import logo from '../assets/logo.png';
import { useDataContext } from './context/UserContext';
import axios from 'axios';

const Cgrades: React.FC = () => {
    const[data,setData]=useState<any>([]);
    const[showTost]=useIonToast();
    const[noData,setNoData] = useState<any>(null);
    const {id,uid,regNo}=UserData();
    const{csem,cYear}=SemHook();
    const {studid,username } = useDataContext();
    const[loading,setLoading] = useState<boolean>(true)
    const handleCresults = async (sID:any) => {
      try {
             const data = new FormData()
             data.append('id',sID);
       
          const response = await axios.post('http://localhost/server/code.php?action=getCurentResults', data);
          if (response.data.success===true) {
            // User found, you can navigate to another page or set some state in your Ionic component
            setData(response.data.gradeData)
              console.log(response.data)
          } else {
            // User not found or other error
            showTost(
              {
                message: response.data.message,
                duration: 3000,
                color: 'danger'
              }
              );
          }
        } catch (error:any) {
          showTost(
            {
              message:  error,
              duration: 3000,
              color: 'danger'
            }
            );
        }
      };

      useEffect(() => {
          handleCresults(studid);
      },[])

      const doRefresh = async(event:any) => {
            handleCresults(studid);
       event.target.complete();
       setLoading(false);
        }
    return (
        <IonPage>
        <IonHeader>
        <IonToolbar color={'secondary'}>
            <IonButtons>
                    <IonMenuButton></IonMenuButton>
                </IonButtons>
                
                <IonTitle>Current Results</IonTitle>
              
            </IonToolbar>
           
        </IonHeader>
        <IonContent color={'light'}>
        
        <IonRefresher slot='fixed'  onIonRefresh={(ev)=>doRefresh(ev)}>
                    <IonRefresherContent />
                </IonRefresher>
            <div className='contentwrapper'>
                <IonChip class='ion-margin-bottom ion-margin-top' style={{width:"80%",marginLeft:"6%", paddingLeft:"18%"}}>Results for {cYear-1}, {csem===1?'July-Dec':'Jan-June'}</IonChip>
            
                <div style={{paddingLeft:'3%',paddingRight:'3%'}}>
                

                   { data===null ? <IonText color={'danger'}>{noData}</IonText> :
                   <>
                   
                   <IonGrid class='ion-no-padding'>
                   <IonRow class="custom-row">
        <IonCol size='5' class="custom-col"> Course Name</IonCol>
        <IonCol size='1.4' class="custom-col">Cw1</IonCol>
        <IonCol size='1.4' class="custom-col">Cw2</IonCol>
        <IonCol size='1.4' class="custom-col">Ex</IonCol>
        <IonCol size='1.4'class="custom-col">Eos</IonCol>
        <IonCol size='1.4'class="custom-col">Gr.</IonCol>
        </IonRow>
                   
                    { data.map((course:any, index:any)=>(
                        <IonRow key={index}>
                                
            <IonCol size='5' class="custom-col">{course.subject_title}</IonCol>
            <IonCol size='1.4' class="custom-col"> {course.assign_1}</IonCol>
            <IonCol size='1.4' class="custom-col"> {course.assign_2}</IonCol>
            <IonCol size='1.4'class="custom-col">{course.EOS}</IonCol>
            <IonCol size='1.4'class="custom-col">{course.fgrade}</IonCol>
            <IonCol  size='1.4'class="custom-col">{course.comment}</IonCol>
                            </IonRow>
                        
                                

                    ))}
                    </IonGrid>
                    </>
}
                </div>
                </div>
        </IonContent>
    </IonPage>
);
};

export default Cgrades;