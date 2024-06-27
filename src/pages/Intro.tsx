import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonText, IonTitle, IonToast, IonToolbar, useIonRouter } from '@ionic/react';
import { arrowForward, arrowForwardCircleOutline, book, bookOutline, cash, cashOutline, checkmarkCircle, create, enterOutline, location, locationOutline, logIn, logInOutline, personCircle, school, schoolOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { Device } from '@capacitor/device';
import './Intro.css'
import biu from './images/biu3.jpg';
interface ContainerProps{
    onFinish:()=>void;
}
const Intro: React.FC<ContainerProps>= ({onFinish}) => {
const router =useIonRouter();
const[username,setUserName]=useState("");
const [showToast, setShowToast] = useState(false);
const getLogin=() => {
    router.push('/');
}
const getFeeInfo=() => {
    router.push('/fees');
}
const getCourseInfo=() => {
    router.push('/courses');
}
const getApplicationForm=() => {
    router.push('/applicationform');
}
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'secondary'}>
                    <IonTitle color={'light'}>Welcome to BIU</IonTitle>
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
                                <IonCard className='ion-no-margin' onClick={onFinish} >                      
                                <IonCardContent class='ion-no-padding ion-text-center'>
                       <p><IonIcon  className='mod' icon={arrowForwardCircleOutline}></IonIcon></p>
                       <p>Sign In</p>
                       <IonChip  class='ion-margin-bottom'>ACCESS</IonChip>
                        </IonCardContent>
                        </IonCard>
                                </IonCol>
                                <IonCol sizeMd='6' sizeLg='3'>
                                <IonCard className='ion-no-margin'>                      
                                <IonCardContent class='ion-no-padding ion-text-center'>
                       <p> <IonIcon icon={locationOutline}   className='mod'></IonIcon></p>
                       <p>Find Us</p>
                       <IonChip class='ion-margin-bottom'>VIEW</IonChip>
                        </IonCardContent>
                        </IonCard>
                                </IonCol>
                                
                            </IonRow>
                            <IonRow class='ion-justify-content-center'>
                                <IonCol sizeMd='6' sizeLg='3'>
                                <IonCard className='ion-no-margin'>                      
                                <IonCardContent class='ion-no-padding ion-text-center'>
                       <p><IonIcon icon={cashOutline}  className='mod'></IonIcon></p>
                       <p>Online Payment</p>
                       <IonChip class='ion-margin-bottom'>ACCESS</IonChip>
                        </IonCardContent>
                        </IonCard>
                                </IonCol>
                                <IonCol sizeMd='6' sizeLg='3'>
                                <IonCard className='ion-no-margin' onClick={getApplicationForm}>                      
                                <IonCardContent class='ion-no-padding ion-text-center'>
                       <p> <IonIcon icon={schoolOutline}  className='mod' ></IonIcon></p>
                       <p>Online Application</p>
                       <IonChip class='ion-margin-bottom'>ACCESS</IonChip>
                        </IonCardContent>
                        </IonCard>
                                </IonCol>
                                
                            </IonRow>
                            <IonRow class='ion-justify-content-center'>
                            <IonCol  sizeMd='6' sizeLg='3'>
                            <IonCard className='ion-no-margin'>                      
                                <IonCardContent class='ion-no-padding ion-text-center'>
                                <p><IonIcon icon={cashOutline}  className='mod'></IonIcon></p>
                                <p>Fees Info</p>
                                <IonChip onClick={getFeeInfo} class='ion-margin-bottom'>VIEW</IonChip>
                            </IonCardContent>
                            </IonCard>
                            </IonCol>
                            <IonCol sizeMd='6' sizeLg='3'>
                            <IonCard className='ion-no-margin'>                      
                                <IonCardContent class='ion-text-center'>
                              <IonIcon icon={bookOutline}   className='mod'></IonIcon>
                              <p>Programmes</p>
                              <IonChip  onClick={getCourseInfo} >VIEW</IonChip>
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

export default Intro;