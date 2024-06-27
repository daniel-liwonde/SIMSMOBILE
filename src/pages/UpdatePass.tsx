import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, 
    IonGrid, IonHeader, IonIcon, IonMenuButton, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonRouter, useIonToast } from '@ionic/react';
import { person, lockOpen, logIn, refreshCircle } from 'ionicons/icons';
import React, { useState } from 'react';
import axios from 'axios';
import { useDataContext } from './context/UserContext';
const UpdatePass: React.FC = () => {
 const[pass,setPass]= useState<string>();
 const [showTost]=useIonToast();
 const[cpass,setCpass]= useState<string>();
 const {studid} = useDataContext();
 const router=useIonRouter();
const handleUpdate= async(e:any) => {
e.preventDefault();
await axios.post('http://localhost/server/exec.php?action=update', {
    password: pass,
    cconfirmpass: cpass,
    studID:studid
})
.then((response) => {
    if(response.data.success===false) {
        showTost({
            message: response.data.message,
            duration: 3000,
            color: 'danger',
            position: 'bottom'
        })
    }
    else{
        showTost({
            message: response.data.message,
            duration: 3000,
            color: 'success',
            position: 'bottom'
        })  
        router.push('/')
    }
}).catch((err:any) => {
    showTost({
        message: err.message,
        duration: 3000,
        color: 'danger',
        position: 'bottom'
    })
});
}
return (
        <IonPage>
             <IonHeader>
                <IonToolbar color={'secondary'}>
                <IonButtons slot='start'>
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle color={'light'}>Update Password</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
            <IonGrid>
                            
                            <IonRow class='ion-justify-content-center'>
                                <IonCol size='12' sizeMd='8' sizeLg='6'>
                                <span className='update'>UPDATE PASSWORD</span>
                                <div className="update-container">                     
                        <form onSubmit={handleUpdate}>
                            <input className='input' required placeholder='Enter password' value={pass} type='text'  onChange={(e)=>setPass(e.target.value!)} />
                            <input   required placeholder="Confirm  password"  value={cpass} onChange={(e)=>setCpass(e.target.value!)} type='password' className='input' />
                        <IonButton   color={'success'}  shape='round' type='submit' className='ion-warning' expand='block'>
                            <IonIcon icon={logIn} color={'light'}  slot='end'></IonIcon>
                            <IonText color="light">UPDATE</IonText></IonButton>
                        <IonButton size="small" shape='round' color={'medium'} fill="clear" type='button' expand='block' className='ion-margin-top' routerLink='/info'> </IonButton>
                        </form>
                        </div>
                                </IonCol>
                                </IonRow>
                        </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default UpdatePass;
