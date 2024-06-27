import { IonAvatar, IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonMenuButton, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDataContext } from '../pages/context/UserContext';
import UserData from '../pages/hooks/UserData';
import SemHook from '../pages/hooks/SemHook';
import { cashOutline, moonOutline } from 'ionicons/icons';
import money from '../assets/money.png'

const FeesInfo: React.FC = () => {
    const[showToast]=useIonToast();
    const {csem,cYear}=SemHook();
const[data,setData]=useState<any>([])
const[loading,setLoading] = useState<boolean>(true)
    const fetchData = async () => {
        //console.log(cYear);
            const response = await axios.post('http://localhost/server/fees_amounts.php',
            {
                semester: csem,
                year: cYear
            }
            )
            .then((response) => {setData(response.data)
            console.log(response.data);
        })
            .catch((error) =>console.error(error));
            

    };

    useEffect(() => {
        fetchData();
    }, []);

    const doRefreshteach = async(event:any) => {
        fetchData();
           event.target.complete();
           setLoading(false);
        }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'secondary'}>
                    <IonButtons slot='start'>
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle>Fees information</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
            <div className='contentwrapper' style={{marginTop:"10px"}}> 
                    <IonCardHeader>
                    <IonChip>Tuition Fees for  {' '} {csem===1?'Jan-June':'July-Dec'},{cYear}</IonChip>
                    </IonCardHeader>
                    <IonCardContent>
            <IonRefresher slot='fixed'  onIonRefresh={(ev)=>doRefreshteach(ev)}>
                    <IonRefresherContent />
                </IonRefresher>
                    {
                
                        data.map((_thedata:any, index:any)=>(
<div key={index}>
<IonItem  lines="none">
<IonIcon icon={cashOutline} slot='start' color={'success'}></IonIcon>
    <IonLabel> Full time: {'MK'} {Number(_thedata.fulltime).toLocaleString()}</IonLabel>
</IonItem>
<IonItem  lines="none">
    <IonIcon icon={cashOutline} slot='start' color={'success'}></IonIcon>
    <IonLabel>Biu Masters: {' MK'} {Number(_thedata.masters).toLocaleString()}</IonLabel>
    </IonItem>
<IonItem lines="none">
    <IonIcon icon={cashOutline} slot='start' color={'success'}></IonIcon>
    <IonLabel> Biu Diploma: {' MK'} {Number(_thedata.biu_dip).toLocaleString()}</IonLabel>
</IonItem>
<IonItem lines="none">
    <IonIcon icon={cashOutline} slot='start' color={'success'}></IonIcon>
    <IonLabel>ABE Level 4: {'MK '} {Number(_thedata.abel4).toLocaleString()}</IonLabel>
    </IonItem>
    <IonItem  lines="none">
    <IonIcon icon={cashOutline} slot='start' color={'success'}></IonIcon>
    <IonLabel>ABE Level 5: {' MK'} {Number(_thedata.abel5).toLocaleString()}</IonLabel>
    </IonItem>
    <IonItem  lines="none">
    <IonIcon icon={cashOutline} slot='start' color={'success'}></IonIcon>
    <IonLabel>ABE Level 6: {' MK'} {Number(_thedata.abel6).toLocaleString()}</IonLabel>
    </IonItem>
    <IonItem  lines="none">
    <IonIcon icon={cashOutline} slot='start' color={'success'}></IonIcon>
    <IonLabel>ABMA Level 4: {' MK'} {Number(_thedata.abmal4).toLocaleString()}</IonLabel>
    </IonItem>
    <IonItem  lines="none">
    <IonIcon icon={cashOutline} slot='start' color={'success'}></IonIcon>
    <IonLabel>ABMA Level 5: {' MK'}{Number(_thedata.abmal5).toLocaleString()}</IonLabel>
    </IonItem>
    <IonItem lines='none'>
    <IonIcon icon={cashOutline} slot='start' color={'success'}></IonIcon>
    <IonLabel>ABMA Level 6: {' MK'} {Number(_thedata.abmal6).toLocaleString()}</IonLabel>
    </IonItem>
</div>
                        ))
                    }
                    </IonCardContent>
                    </div>
            </IonContent>
        </IonPage>
    );
};

export default FeesInfo;