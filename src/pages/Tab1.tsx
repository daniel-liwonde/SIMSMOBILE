import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, isPlatform,IonChip, IonContent, IonDatetime, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonMenuButton, IonModal, IonNote, IonPage, IonRefresher, IonRefresherContent, IonSegment, IonSegmentButton, IonSkeletonText, IonTitle, IonToolbar, useIonAlert, useIonToast, IonText, IonSearchbar, IonInput, IonSelect, IonItemOption, IonFooter, IonAccordion, IonAccordionGroup } from '@ionic/react';
import { add, body, closeOutline, ellipsisVertical, menuOutline, moveSharp, refresh, trash, trashBinOutline, trashOutline } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import { Device } from '@capacitor/device';
import './Tab1.css';
import prof from'../assets/avat.png'
import Settings from './Settings';
import UserData from './hooks/UserData';
import SemHook from './hooks/SemHook';
import { useDataContext } from './context/UserContext';
import axios from 'axios';

const Tab1: React.FC = () => {
   const{csem,cYear}=SemHook();
const[noData,setNoData] = useState<any>(null);
const[loading,setLoading] = useState<boolean>(true);
const [data, setData] = useState<any[]>([]);
const[showAlert]=useIonAlert();
const[selectedUser,setSelectedUser] = useState<any>(null);
const[showTost]=useIonToast();
const{studid}=useDataContext();
const fetchData = async (id:any) => {
console.log('current id: ' + studid);
const fdata= new FormData();
fdata.append("id",id);
try {
    const response= await axios.post('http://localhost/server/code.php?action=feesHISTORY', fdata);
    if (response.data.success===true)
        {
        console.log('data'+response.data)
        setData(response.data.message);
        }
        else
        {
          setNoData(response.data.message);  
        }
    }
    catch(e:any) {
        showTost(
            {
                message:"error occourred"+e,
                duration: 2000,
                color: "danger"

            }
        )
    }
};


    useEffect(() => {
      fetchData(studid);
      console.log('data here'+data);
    }, []);
    
    
     
    const doRefresh = async(event:any) => {
        fetchData(studid);
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
                    <IonTitle>Fees History</IonTitle>
                    <IonButtons slot='end'>
                        <IonButton><IonIcon slot='icon-only' icon={ellipsisVertical}></IonIcon></IonButton>
                    </IonButtons>
                </IonToolbar>
                
            </IonHeader>
            
            <IonContent>
            <IonRefresher slot='fixed'  onIonRefresh={(ev)=>doRefresh(ev)}>
                    <IonRefresherContent />
                </IonRefresher>
                <IonCard>
                <IonCardContent>
                
        
        <IonAccordionGroup>
        {data.map((fees,index) => (
        
                <IonAccordion value={`first${index}`}>
                   { fees.sem===csem && fees.year===cYear && fees.fee_balance===0?
                    <IonItem slot='header'  color={'success'}>
                        <IonLabel>{fees.year} {fees.sem===1? 'Jan-June':'July-Dec'} </IonLabel>
                        </IonItem>
                        :
                        <IonItem slot='header'  color={'light'} >
                        <IonLabel>{fees.year}, {fees.sem===1? 'Jan-June':'July-Dec'} </IonLabel>
                        </IonItem>
        
        }
           
                        <div className='ion-padding' slot='content'>
                       <IonChip>Total amount: {
                      fees.total_amount
                       }</IonChip>
                       <IonChip>Exam number: {fees.exam_no}</IonChip>
                       <IonChip>Balance: {fees.fee_balance}</IonChip>
                       <IonChip>Last paid amount:{fees.amount_paid}</IonChip>
                       <IonChip>Last pay date: {fees.last_pay_date}</IonChip>
                            </div>
            </IonAccordion>
        ))}
        </IonAccordionGroup>
        <IonText color={'success'}>Pull down to refresh content</IonText>
        </IonCardContent>


  </IonCard>
 
    </IonContent>
        </IonPage>
    );
};


export default Tab1;