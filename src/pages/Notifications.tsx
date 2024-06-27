import { IonAvatar, IonButtons, IonChip, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonMenuButton, IonPage, IonText, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import axios from 'axios';
import { notificationsCircle } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDataContext } from './context/UserContext';

const Notifications: React.FC = () => {
    const[showTost]=useIonToast();
    const[notice,setNotice]=useState<any>([]);
    const {studid} = useDataContext();
    const[noticeMsg,setNoticeMsg]=useState<any>([]);
    const getNotifications= async () => {
        try {
           const path='http://localhost/server/code.php?action=notifications';
          const response = await axios.get(path)
              if(response.data.success===true)  
                {
                    console.log(response.data)
                setNoticeMsg(response.data.message)
                setNotice(response.data.notice);
                } 
                else{
                    console.log(response.data)
                  setNoticeMsg(response.data.message)
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
        getNotifications();
    },[]);

    return (
        <IonPage>
             <IonHeader>
                <IonToolbar color={'secondary'}>
                <IonButtons slot='start'>
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle color={'light'}>Notifications</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                   <div>
                   <IonChip class='ion-margin-bottom ion-margin-top' style={{width:"80%",marginLeft:"6%", paddingLeft:"18%"}}>{noticeMsg}</IonChip>
                
                   </div>
                  

                   { notice.map((note:any, index:any)=>(       
                <div key={note.notice_id}>
                 
  
                 <IonItem routerLink={`/app/notice_details/${note.notice_id}/${studid}`} >
                    <IonIcon icon={notificationsCircle} color={'success'}></IonIcon>
                 {note.subject} 
                 </IonItem>
                   
                    
                </div>
                    
            

        ))}
            </IonContent>
        </IonPage>
    );
};

export default Notifications;