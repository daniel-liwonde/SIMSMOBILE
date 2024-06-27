import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { Camera, CameraOptions,CameraResultType } from '@capacitor/camera';
import { camera, cameraOutline } from 'ionicons/icons';


const Tab2: React.FC = () => {
    const[image,setImage]=useState<any>(null)
    const takePicture = async () => {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        saveToGallery:true,
        resultType: CameraResultType.Base64
      });
      const img = `data:image/jpeg;base64,${image.base64String}`;
      setImage(img);
    };
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'secondary'}>
                    <IonButtons slot='start'>
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle>Take Pictures</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                    <p className='proftext2' onClick={takePicture}><IonIcon icon={cameraOutline} slot='start' ></IonIcon> {'  '}Take picture</p>
                <img  src={image} style={{ width: '50%' }}/>
            </IonContent>
        </IonPage>
    );
};

export default Tab2;