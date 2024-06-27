import { IonAvatar, IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonMenuButton, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDataContext } from '../pages/context/UserContext';
import UserData from '../pages/hooks/UserData';
import SemHook from '../pages/hooks/SemHook';
import { cashOutline } from 'ionicons/icons';
import money from '../assets/money.png'

const FeesInfo: React.FC = () => {
    const[showToast]=useIonToast();
    const {csem,cYear}=SemHook();
const[data,setData]=useState<any>([])
const[loading,setLoading] = useState<boolean>(true)
    const fetchData = async () => {
        //console.log(cYear);
            const response = await axios.post('http://10.0.2.2/server/fees_amounts.php',
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
                        <IonBackButton defaultHref='/info'></IonBackButton>
                    </IonButtons>
                    <IonTitle>Fees information</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonCard>
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
<IonItem>
    <IonAvatar>
        <IonImg src={money}  />
    </IonAvatar>
    <IonLabel> Full time: {' '} {Number(_thedata.fulltime).toLocaleString()}</IonLabel>
</IonItem>
<IonItem>
    <IonAvatar>
        <IonImg src={money} />
    </IonAvatar>
    <IonLabel>Biu Masters: {' '} {Number(_thedata.masters).toLocaleString()}</IonLabel>
    </IonItem>
<IonItem>
    <IonAvatar>
        <IonImg src={money} />
    </IonAvatar>
    <IonLabel> Biu Diploma: {' '} {Number(_thedata.biu_dip).toLocaleString()}</IonLabel>
</IonItem>
<IonItem>
    <IonAvatar>
        <IonImg src={money} />
    </IonAvatar>
    <IonLabel>ABE Level 4: {' '} {Number(_thedata.abel4).toLocaleString()}</IonLabel>
    </IonItem>
    <IonItem>
    <IonAvatar>
        <IonImg src={money} />
    </IonAvatar>
    <IonLabel>ABE Level 5: {' '} {Number(_thedata.abel5).toLocaleString()}</IonLabel>
    </IonItem>
    <IonItem>
    <IonAvatar>
        <IonImg src={money} />
    </IonAvatar>
    <IonLabel>ABE Level 6: {' '} {Number(_thedata.abel6).toLocaleString()}</IonLabel>
    </IonItem>
    <IonItem>
    <IonAvatar>
        <IonImg src={money} />
    </IonAvatar>
    <IonLabel>ABMA Level 4: {' '} {Number(_thedata.abmal4).toLocaleString()}</IonLabel>
    </IonItem>
    <IonItem>
    <IonAvatar>
        <IonImg src={money} />
    </IonAvatar>
    <IonLabel>ABMA Level 5: {' '}{Number(_thedata.abmal5).toLocaleString()}</IonLabel>
    </IonItem>
    <IonItem>
    <IonAvatar>
        <IonImg src={money} />
    </IonAvatar>
    <IonLabel>ABMA Level 6: {' '} {Number(_thedata.abmal6).toLocaleString()}</IonLabel>
    </IonItem>
</div>
                        ))
                    }
                    </IonCardContent>
                    </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default FeesInfo;