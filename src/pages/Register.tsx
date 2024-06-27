import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonMenuButton, IonPage, IonRow, IonText, IonTitle, IonToast, IonToolbar, useIonRouter } from '@ionic/react';
import { checkmarkCircle, logInOutline, personCircle } from 'ionicons/icons';
import React, { useState } from 'react';

const Register: React.FC = () => {
const router =useIonRouter();
const[username,setUserName]=useState("");
const [showToast, setShowToast] = useState(false);

const doRegister = (event:any)=>{
    event.preventDefault();
    setShowToast(true)
    setTimeout(()=>{
    router.goBack();
    }, 2000);
    
}
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'secondary'}>
                <IonButtons slot='start'>
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle color={'light'}>Create Account</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                
                    <IonContent>
                        <IonGrid>
                            <IonRow class='ion-justify-content-center'>
                                <IonCol size='12' sizeMd='6' sizeLg='4'>
                                <IonCard>                      
                            <IonCardContent>
                        <form onSubmit={doRegister}>
                            <IonInput label="Email" value={username} onIonChange={(e:any)=>setUserName(e.target.value)} labelPlacement='floating' type='email' fill='outline'></IonInput>
                            <IonInput label="Password" labelPlacement='floating' fill='outline' type='password' className='ion-margin-top ion-margin-bottom'></IonInput>
                        <IonButton shape='round'  color={'success'}  type='submit' expand='block'>
                            <IonIcon  color={'light'} icon={checkmarkCircle} slot='end'></IonIcon>
                           <IonText color={'light'}> Create my account</IonText></IonButton>
                       
                        </form>
                       <IonToast   icon={checkmarkCircle} slot='start' color={'success'} animated={false} isOpen={showToast} layout={'stacked'} position={'middle'}  onDidDismiss={() => setShowToast(false)} message={"Your username is "+username} duration={1500} />
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

export default Register;