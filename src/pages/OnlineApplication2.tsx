import { IonBackButton, IonButton, isPlatform,IonCard, IonCardContent, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonLoading, useIonRouter, useIonToast, IonChip, IonCardHeader } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import {body, bookOutline, key, lockOpen, logIn, logInOutline, person, personCircle, refreshCircle, settingsOutline, trailSignOutline} from 'ionicons/icons';
import logo from '../assets/logo.png';
import Intro from './Intro';
import './Intro.css'
import { Preferences } from '@capacitor/preferences';
import axios from 'axios';
const Login: React.FC = () => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    
    const UPLOAD_ENDPOINT = 'http://localhost/server/upload.php';
    
    const handleSubmit = async (e:any) => {
        e.preventDefault(); 
        //if await is removed, console log will be called before the uploadFile() is executed completely.
        //since the await is added, this will pause here then console log will be called
        let res = await uploadFile(file);
        console.log(res.data);
    }
    
    const uploadFile = async(file:any) => { 
       const formData = new FormData();        
       formData.append('avatar',file)
       formData.append('name',name);
        
        return  await axios.post(UPLOAD_ENDPOINT, formData,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    }

    const handleOnChange = (e:any) => {
        //console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    }
   
    return (
      
        
        <IonPage>
            <IonHeader>
                <IonToolbar color={'secondary'}>
                    <IonTitle color={'light'}>OnLine Application Form</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent >
                
                    <IonContent>
                        <IonGrid>
                        
                            <IonRow class='ion-justify-content-center'>
                                <IonCol size='12' sizeMd='8' sizeLg='4'>
                                <IonCard> 
                                    <IonCardHeader>
                                        <IonChip>Please fill the information below</IonChip>
                                    </IonCardHeader>                    
                            <IonCardContent>
                        <form onSubmit={handleSubmit}>
                            <input className='input'  placeholder='file'  type='file'  onChange={handleOnChange} />
                            <input className='input'  placeholder='your name'  type='text'  onChange={(e)=>setName(e.target.value)} />
                         
                            
                        <IonButton   color={'success'}  shape='round' type='submit' className='ion-warning' expand='block'>
                            <IonIcon icon={logIn} color={'light'}  slot='end'></IonIcon>
                            <IonText color="light">APPLY</IonText></IonButton>
                        
                        </form>
                        </IonCardContent>
                        </IonCard>
                                </IonCol>
                                </IonRow>
                        </IonGrid>
                    </IonContent>
                
            </IonContent>
        </IonPage>
       

    
    );
};

export default Login; 