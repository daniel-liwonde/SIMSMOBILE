import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonChip, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonMenuButton, IonPage, IonRefresher, IonRefresherContent, IonSkeletonText, IonText, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { bookOutline, ellipsisVertical, trashOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import UserData from './hooks/UserData';
import SemHook from './hooks/SemHook';
import hat from '../assets/hat.png'
import logo from '../assets/logo.png';
import { Http } from '@capacitor-community/http';
import { useDataContext } from './context/UserContext';
import axios from 'axios';

const Carryovers: React.FC = () => {
    const[data,setData]=useState<any>([]);
    const[showTost]=useIonToast();
    const {studid} = useDataContext();
    const{csem,cYear}=SemHook();
    const[loading,setLoading] = useState<boolean>(true)
   // ========================

   const handleCarry = async (id:any) => {
    try {
      const formdata= new FormData();
      formdata.append("ID", id);
      const response = await axios.post('http://localhost/server/code.php?action=getCarryOvers', formdata);
      if (response.data.success) {
        console.log(response.data);
          setData(response.data.carryData);
        }
        else
        {
          showTost(
            {
                message: response.data.message,
                duration: 5000,
                color: 'success',
                position: 'middle'
            }
            );
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
          handleCarry(studid);
        setLoading(false);
      }, []);
      const doRefresh = async(event:any) => {
        handleCarry(studid);
       event.target.complete();
      }
    return (
        <IonPage>
        <IonHeader>
        <IonToolbar color={'secondary'}>
            <IonButtons>
                    <IonMenuButton></IonMenuButton>
                </IonButtons>
                
                <IonTitle>Carryovers</IonTitle>
              
            </IonToolbar>
           
        </IonHeader>
        <IonContent>
        
        <IonRefresher slot='fixed'  onIonRefresh={(ev)=>doRefresh(ev)}>
                    <IonRefresherContent />
                </IonRefresher>
                <div className='contentwrapper' style={{paddingLeft:"10%",marginTop:"10px"}}> 
               
           
                    { data.map((course:any, index:any)=>(
                    
                            
                                <IonItem  key={index}>
                            <IonAvatar>
                                <IonImg src={hat}></IonImg>
                            </IonAvatar> 
                            <IonText>{course.subject_title}</IonText> 
                            </IonItem>
                                
                        

                    ))}
                </div>
        </IonContent>
    </IonPage>
);
};

export default Carryovers;