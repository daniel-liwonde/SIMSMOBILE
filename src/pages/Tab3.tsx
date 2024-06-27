import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonText, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { cameraOutline, locateOutline, locationSharp } from 'ionicons/icons';
import { PushNotificationSchema, PushNotifications, Token, ActionPerformed } from '@capacitor/push-notifications';


const Tab3: React.FC = () => {
    const nullEntry: any[] = []
    const [notifications, setnotifications] = useState(nullEntry);
    const[showTost]=useIonToast();
    useEffect(()=>{
        PushNotifications.checkPermissions().then((res) => {
            if (res.receive !== 'granted') {
              PushNotifications.requestPermissions().then((res) => {
                if (res.receive === 'denied') {
                    showTost(
                        {
                            message: 'Push notification permission denied!',
                            duration: 3000,
                            color: 'danger'
                        }
                        );
                }
                else {
                    showTost(
                        {
                            message: 'Push notification permission granted!',
                            duration: 3000,
                            color: 'danger'
                        }
                        );
                  register();
                }
              });
            }
            else {
              register();
            }
          });
    },[])
    
    const register = () => {
        console.log('Initializing HomePage');

        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();

        // On success, we should be able to receive notifications
        PushNotifications.addListener('registration',
            (token: Token) => {
                showTost(
                    {
                        message: 'Push notification succeeded!',
                        duration: 3000,
                        color: 'danger'
                    }
                    );
            }
        );

        // Some issue with our setup and push will not work
        PushNotifications.addListener('registrationError',
            (error: any) => {
                alert('Error on registration: ' + JSON.stringify(error));
            }
        );

        // Show us the notification payload if the app is open on our device
        PushNotifications.addListener('pushNotificationReceived',
            (notification: PushNotificationSchema) => {
                setnotifications(notifications => [...notifications, { id: notification.id, title: notification.title, body: notification.body, type: 'foreground' }])
            }
        );

        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed',
            (notification: ActionPerformed) => {
                setnotifications(notifications => [...notifications, { id: notification.notification.data.id, title: notification.notification.data.title, body: notification.notification.data.body, type: 'action' }])
            }
        );
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'secondary'}>
                    <IonButtons slot='start'>
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle>Location</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
               
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Current location</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                    <IonListHeader mode="ios" lines="full">
                    <IonLabel>Notifications</IonLabel>
                </IonListHeader>
                {notifications.length !== 0 &&
                    <IonList>
                        {notifications.map((notif: any) =>
                            <IonItem key={notif.id}>
                                <IonLabel>
                                    <IonText>
                                        <h3 className="notif-title">{notif.title}</h3>
                                    </IonText>
                                    <p>{notif.body}</p>
                                </IonLabel>
                            </IonItem>
                        )}
                    </IonList>}
                    
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Tab3;