import { IonAvatar, IonBackButton, IonButtons, IonChip, IonContent, IonHeader, IonImg, IonItem, IonMenuButton, IonPage, IonText, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDataContext } from './context/UserContext';

const Notifications: React.FC = () => {
    const[showTost]=useIonToast();
    const[notice,setNotice]=useState<any>([]);
    const[noticeMsg,setNoticeMsg]=useState<any>();
    const[sender,setSender]=useState<any>();
    const[day,setDay]=useState<any>();
    const[subject,setSubject]=useState<any>();
    const {studid} = useDataContext();
    const {id,stid}=useParams<any>();
    const getNotifications= async () => {
        const data = new FormData();
        data.append("id",id);
        data.append("sid", stid);
        try {
           const path='http://localhost/server/code.php?action=noticeDetails';
          const response = await axios.post(path,data)
          console.log("response"+response.data);
             setNoticeMsg(response.data.message);
             setSender(response.data.sender);
             setDay(response.data.day);
             setSubject(response.data.subject);
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
    })
   /* FirebaseMessaging.getInstance().token.addOnCompleteListener(OnCompleteListener { task ->
        if (!task.isSuccessful) {
            Log.w(TAG, "Fetching FCM registration token failed", task.exception)
            return@OnCompleteListener
        }
    
        // Get new FCM registration token
        val token = task.result
    
        // Log and toast
        val msg = getString(R.string.msg_token_fmt, token)
        Log.d(TAG, msg)
        Toast.makeText(baseContext, msg, Toast.LENGTH_SHORT).show()
    })
    */
    return (
        <IonPage>
             <IonHeader>
                <IonToolbar color={'secondary'}>
                <IonButtons slot='start'>
                        <IonMenuButton></IonMenuButton>
                        <IonBackButton defaultHref=''></IonBackButton>
                    </IonButtons>
                    <IonTitle color={'light'}>Notifications</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                   
                  

                      <div>   
                
                 <IonChip style={{backgroundColor:"#f7edcf"}}>Sent on: {day}</IonChip>
  
                 <IonChip class='ion-color-gray ion-margin-bottom ion-margin-top ion-padding-top ion-padding-bottom'style={{width:"80%",display:"block",backgroundColor:"#c3d5e6"}}>
                    <b style={{color:"#198754"} }>{subject} </b><br/>
                    {noticeMsg}
                    <p>Sent by:{sender}</p>
                    </IonChip>
                </div>
                    
            


            </IonContent>
        </IonPage>
    );
};

export default Notifications;