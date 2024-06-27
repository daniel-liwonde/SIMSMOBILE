import { IonAvatar, IonButtons, IonCard, IonCardContent, IonChip, IonContent, IonHeader, IonItem, IonLabel, IonMenuButton, IonPage, IonRefresher, IonRefresherContent, IonSearchbar, IonSkeletonText, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import Settings from './Settings';

const List: React.FC = () => {
const[users,setUsers] = useState<any[]>([]);
const[loading,setLoading] = useState<boolean>(true);
const[noData,setNoData] = useState<string>(""); 
useEffect(()=>{
getUsers();
setLoading(false);
},[]);
const getUsers =async () => {
    const data= await fetch('https://randomuser.me/api?results=15')
    .then((response) => response.json())
    .then(data=>setUsers(data.results))
    .catch((error=>setNoData("Error Occoured.."+error)));

}
const doRefresh = async(event:any) => {
    getUsers();
   event.target.complete();
}
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'secondary'}>
                    <IonButtons slot='start'>
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>List</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonToolbar color={'secondary'}>
            <IonSearchbar  placeholder='Search list' />
            </IonToolbar>
            <IonContent className='ion-padding'>
            <IonRefresher slot='fixed'  onIonRefresh={(ev)=>doRefresh(ev)}>
                    <IonRefresherContent />
                </IonRefresher>
            {
            loading && (
               [...Array(10)].map((_, index)=>(
                 <IonCard key={index}>
                <IonCardContent className='ion-no-padding'>
                    <IonItem lines='none'>
                    <IonSkeletonText />
                        <IonLabel>
                        <IonSkeletonText animated style={{width:'150px'}} />
                        <p> <IonSkeletonText /></p>
                        </IonLabel>
                       <IonChip color={'success'} slot='end'></IonChip>
                    </IonItem>
                </IonCardContent>
                 </IonCard>
               ))
            )
        }
        
              {noData??<IonLabel>{noData}</IonLabel>}
                {users.map(user=>(
                <IonCard key={user.id.value}>
                    <IonCardContent>
                    
                    <IonItem lines='none'>
                        <IonAvatar slot='start'>
                            <img src={user.picture.thumbnail} alt={user.name.first} />
                        </IonAvatar>
                        <IonLabel>{user.name.first} {user.name.last}
                        <p>{user.email}</p>
                        </IonLabel>
                        <IonChip slot='end' color={'success'}>{user.nat}</IonChip>
                        </IonItem>
                    </IonCardContent>
                </IonCard>))
                }
<Settings/>
            </IonContent>
           
        </IonPage>
    );
};

export default List;