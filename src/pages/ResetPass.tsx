import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, 
    IonGrid, IonHeader, IonIcon, IonMenuButton, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonRouter, useIonToast } from '@ionic/react';
import { person, lockOpen, logIn, refreshCircle, mail } from 'ionicons/icons';
import React, { useState } from 'react';
import axios from 'axios';
const UpdatePass: React.FC = () => {
 const[email,setEmail]= useState<string>();
 const [showTost]=useIonToast();
 const router=useIonRouter();
const handleUpdate= async(e:any) => {
e.preventDefault();
await axios.post('http://localhost/server/code.php?action=resetpassword', {
    uemail: email,
})
.then((response) => {
    if(response.data.success===false) {
        console.log(response.data)
        showTost({
            message: response.data.message,
            duration: 5000,
            color: 'danger',
            position: 'bottom'
        })
    }
    else{
        console.log(response.data)
        showTost({
            message: response.data.message,
            duration: 5000,
            color: 'success',
            position: 'bottom'
        })  
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
const st={
paddingLeft: "7%",
}
return (
        <IonPage>
             <IonHeader>
                <IonToolbar color={'secondary'}>
                <IonButtons slot='start'>
            <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle color={'light'}>Update Password</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent  color={'warning'}>
            <IonGrid>
                            
                            <IonRow class='ion-justify-content-center'>
                                <IonCol size='12' sizeMd='8' sizeLg='6'>
                                <span className='sign' color={'success'}>Please Enter Email</span>
                                <div className="formwrapper">                     
                        <form onSubmit={handleUpdate}>
                            <input className='input'style={st} required placeholder='Email here' value={email} type='email'  onChange={(e)=>setEmail(e.target.value!)} />
                            <IonIcon icon={mail} slot='start' style={{marginLeft:'-78%',fontSize:"1.1em", marginTop:"90px",fontWeight:'bold',color:'#989aa2'}}></IonIcon>
                        <IonButton   color={'success'}  shape='round' type='submit' className='ion-warning' expand='block' style={{padding:"0px"}}>
                            <IonIcon icon={logIn} color={'light'}  slot='end'></IonIcon>
                            <IonText color="light">Send Email</IonText></IonButton>
                      
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
