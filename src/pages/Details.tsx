import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonMenuButton, IonPage, IonRow, IonText, IonTitle, IonToast, IonToolbar, useIonRouter } from '@ionic/react';
import { checkmarkCircle, key, logInOutline, personCircle, person, school } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { Device } from '@capacitor/device';
//import DeviceHook from './hooks/DeviceHook';
import { useDataContext } from './context/UserContext';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';
import UserData from './hooks/UserData';
import SemHook from './hooks/SemHook';
const Details: React.FC = () => {
    const{csem,cYear}=SemHook();
   const { firstname,lastname, studid,prog,currentyear,addm_year,stud_email,birth_date,gender,sponsor,nation,
        current_sem,stud_phone,qualif,spo_email,sp_address,student_id,joined, address,
        spo_phone,username}=useDataContext();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'secondary'}>
                    <IonButtons slot='start'>
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle color={'light'}>User Details</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-justify-content-center">
                
                    <IonContent>
                        <IonGrid>
                            <IonRow class='ion-justify-content-center'>
                                <IonCol size='12'>
                                    
                                
                                
            
                                <IonChip class='ion-margin-bottom ion-margin-top' style={{width:"80%",marginLeft:"6%", paddingLeft:"18%"}}><b>{lastname}</b>, Below are your details</IonChip>
                   
                                     
                            
                                
                            
                              <IonRow>
                                <IonCol sizeMd='12' sizeLg='6' sizeSm='12' size='12'>
                                    <div className='contentwrapper' style={{paddingLeft:"10%",marginTop:"10px"}}>                      
                                
                                <p><IonIcon  className='mod' icon={personCircle} style={{paddingLeft:"34%"}}></IonIcon></p>
                                   <IonText class='text-bold' color={'success'} style={{paddingLeft:"17%"}}>PERSONAL DATA</IonText>
                                   <IonText class='ion-text-justify'>
                                    <p>Reg No:  {student_id}</p>
                                    <p>Firstname:{firstname}</p>
                                    <p>Lastname:{lastname}</p>
                                    <p>Date of Birth: {birth_date}</p>
                                    <p>Gender: {gender}</p>
                                    <p>Phone number:{stud_phone}</p>
                                    <p>Email:{stud_email}</p>
                                    <p>Address:{ address}</p>
                                    <p>Country:{nation}</p>
                                    </IonText>
                                
                                </div>
                                </IonCol>
                                <IonCol sizeMd='12' sizeLg='6' sizeSm='12' size='12'>
                                <div className='contentwrapper' style={{paddingLeft:"10%",marginTop:"10px"}}>                  
                               
                                    <p><IonIcon  className='mod' icon={school}  style={{paddingLeft:"34%"}}></IonIcon></p>
                                    <IonText class='ion-text-bold' color={'success'} style={{paddingLeft:"18%"}}>ACADEMIC DATA</IonText>
                                   <IonText class='ion-text-left'>
                                    <p>Programme:{prog}</p>
                                    <p>Current  Year:{currentyear}</p>
                                    <p>Current Sem:{current_sem}</p>
                                    <p>Admission year:{addm_year}</p>
                                    <p>Joined in Year:{joined}</p>
                                    <p>Entry Qualification:{qualif}</p>
                                    <p>Sponsor: {sponsor}</p>
                                    <p>Sponsor Phone:{spo_phone}</p>
                                    <p> Sponsor Email:{spo_email}</p>
                                    <p> Sponsor Address:{sp_address}</p>
                                    
                                    </IonText>
                                    
                                </div>
                                </IonCol>
                              </IonRow>
                    
                        
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                        
                    </IonContent>
                
            </IonContent>
        </IonPage>
    );
};

export default Details;