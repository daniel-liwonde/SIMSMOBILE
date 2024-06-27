import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonMenuButton, IonPage, IonRow, IonText, IonTitle, IonToast, IonToolbar, useIonRouter } from '@ionic/react';
import { arrowForward, arrowForwardCircleOutline, book, bookOutline, cash, cashOutline, checkmarkCircle, create, createOutline, enterOutline, informationCircle, informationCircleOutline, location, locationOutline, logIn, logInOutline, personCircle, school, schoolOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { Device } from '@capacitor/device';
import '../pages/Intro.css'
import biu from './images/biu3.jpg';
import FeesInfo from './FeesInfo';
import money from '../assets/money.png'
interface ContainerProps{
    onFinish:()=>void;
}
const Welcome: React.FC= () => {
const router =useIonRouter();
const[username,setUserName]=useState("");
const [showToast, setShowToast] = useState(false);
const regCourse=() => {
    router.push('/app/settings/register');
}
const currentResults=() => {
    router.push('/app/cresults');
}
const currentFees=() => {
    router.push('/app/fees');
}
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'secondary'}>
                    <IonButtons slot='start'>
  <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle color={'light'}>BIU SIMS</IonTitle>
                </IonToolbar>
            </IonHeader>
                   
                    <IonContent>
                       <IonGrid>
                       <IonRow class='ion-justify-content-center'>
                       <IonCol size='12'>
                        <div className='topimg'>
                           
                    <div className='wrap'>
                        <IonGrid>
                        <IonRow class='ion-justify-content-center'>
                                <IonCol sizeMd='6' sizeLg='3'>
                                <IonCard className='ion-no-margin'>                      
                                <IonCardContent class='ion-text-center'>
                       <p><IonIcon  className='mod' icon={bookOutline}></IonIcon></p>
                       <p>Current Results</p>
                       <IonChip onClick={currentResults}  class='ion-margin-bottom'>ACCESS</IonChip>
                        </IonCardContent>
                        </IonCard>
                                </IonCol>
                                <IonCol sizeMd='6' sizeLg='3'>
                                <IonCard className='ion-no-margin'>                      
                                <IonCardContent class='ion-text-center'>
                       <p> <IonIcon icon={createOutline}   className='mod'></IonIcon></p>
                       <p>Register Courses</p>
                       <IonChip onClick={regCourse} class='ion-margin-bottom'>ACCESS</IonChip>
                        </IonCardContent>
                        </IonCard>
                                </IonCol>
                                
                            </IonRow>
                            <IonRow class='ion-justify-content-center'>
                                <IonCol sizeMd='6' sizeLg='3'>
                                <IonCard className='ion-no-margin' href='/app/notice'>                      
                                <IonCardContent class='ion-text-center'>
                       <p><IonIcon icon={cashOutline}  className='mod'></IonIcon></p>
                       <p>Online Payment notif</p>
                       <IonChip class='ion-margin-bottom'>ACCESS</IonChip>
                        </IonCardContent>
                        </IonCard>
                                </IonCol>
                                <IonCol sizeMd='6' sizeLg='3'>
                                <IonCard className='ion-no-margin' onClick={currentFees}>                      
                                <IonCardContent class='ion-text-center ion-align-content-center' >
                       <IonIcon icon={informationCircleOutline} className='mod'></IonIcon>
                       <p>Fees Info</p>
                       <IonChip class='ion-margin-bottom' >ACCESS</IonChip>
                        </IonCardContent>
                        </IonCard>
                                </IonCol>
                                
                            </IonRow>
                            
                        </IonGrid>
                       
                        </div>
                        </div>
                        </IonCol>
                        </IonRow>
                        </IonGrid>
                       
                    </IonContent>
                   
        </IonPage>
    );
};

export default Welcome;