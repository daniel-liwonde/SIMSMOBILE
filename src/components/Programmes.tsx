import { IonAvatar, IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonMenuButton, IonPage, IonRefresher, IonRefresherContent, IonText, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDataContext } from '../pages/context/UserContext';
import UserData from '../pages/hooks/UserData';
import SemHook from '../pages/hooks/SemHook';
import { add, cashOutline, pencil, searchOutline } from 'ionicons/icons';
import hat from '../assets/hat.png'

const FeesInfo: React.FC = () => {
    const[showToast]=useIonToast();
    const {csem,cYear}=SemHook();
    const[search,setSearch] = useState<string>('');
const[data,setData]=useState<any>([])
const[loading,setLoading] = useState<boolean>(true)
    const fetchData = async () => {
        //console.log(cYear);
            const response = await axios.post('http://10.0.2.2/server/programmes.php'
            )
            .then((response) => {setData(response.data)
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
                    <IonTitle>Courses Available</IonTitle>
                </IonToolbar>
                <IonToolbar color={'secondary'}>
              
  <input className='ssinput' type="search" required onChange={(e)=>setSearch(e.target.value)}  placeholder='Search course...'/>
  <IonIcon icon={searchOutline}  color={'medium'} style={{marginLeft:'1.3%',fontWeight:'bold',fontSize:'1.3em'}}></IonIcon>
 
            </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
            <div> 
                    <IonCardHeader>
                    <IonChip>Below are the Courses on Offer</IonChip>
                    </IonCardHeader>
                    
            <IonRefresher slot='fixed'  onIonRefresh={(ev)=>doRefreshteach(ev)}>
                    <IonRefresherContent />
                </IonRefresher>
                    
                
                {data.filter((course:any)=>{
                    return  search.toLowerCase()==='' ? course : course.cys.toLowerCase().includes(search) 
                  }).map((course:any, index:any)=>(
<IonItem key={index}>
    <IonAvatar>
        <IonImg src={hat}  />
    </IonAvatar>
    <IonLabel class='ion-text-wrap'>{course.cys}</IonLabel>
</IonItem>
   
                        ))
                    }
                    </div>
                
            </IonContent>
            <IonFab horizontal='end' vertical='bottom' slot='fixed'>
        <IonFabButton id='card-modal' color={'success'} routerLink='/applicationform'><IonText style={{color:"#fff"}}> APPLY</IonText></IonFabButton>
    </IonFab>
        </IonPage>
    );
};

export default FeesInfo;