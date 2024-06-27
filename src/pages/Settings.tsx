import { IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonMenuButton, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import Tab1 from './Tab1';
import { Redirect, Route } from 'react-router';
import Tab2 from './Tab2';
import { bookOutline, cameraOutline, cash, cashOutline, hammerOutline, informationCircle, informationCircleOutline, journalOutline, locationSharp, musicalNote, peopleCircle, peopleCircleOutline, peopleOutline, playBackCircle, time, timeOutline, videocamOutline } from 'ionicons/icons';
import Tab3 from './Tab3';
import { IonReactRouter } from '@ionic/react-router';
import './Settings.css'
import Details from './Details';
import Carryovers from './Carryovers';
import RegisterCourses from './RegisterCourses';
import Courses from './Courses';
import FeesInfo from '../components/FeesInfo';

const Settings: React.FC = () => {

    return (
        <IonReactRouter >
        <IonTabs >
<IonRouterOutlet>
<Route  path="/app/settings/tab1" component={Tab1}  />
<Route  path="/app/settings/tab3" component={FeesInfo}  />
<Route  path="/app/settings/addMyCourses" component={RegisterCourses}/>
<Route   path="/app/settings/thecourses" component={Courses}/>
<Route   path="/app/settings/mydetails" component={Details}/>
<Redirect from="/app/settings/details" to="/app/settings/mydetails" exact={true}/>
<Redirect from="/app/settings/addCourses" to="/app/settings/addMyCourses" exact={true}/>
<Redirect from="/app/settings/registeredCourses" to="/app/settings/thecourses" exact={true}/>

</IonRouterOutlet>
        <IonTabBar slot='bottom'>
                <IonTabButton tab="tab1" href="/app/settings/tab1">
                    <IonIcon  icon={time}></IonIcon>
                    <IonLabel>Fees History</IonLabel>
                </IonTabButton>
                
                <IonTabButton tab="tab2" href="/app/settings/tab2">
                <IonIcon  icon={cashOutline}></IonIcon>
                    <IonLabel>Online Payment</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab3" href="/app/settings/tab3">
                    <IonIcon  icon={informationCircle}></IonIcon>
                    <IonLabel>Fees Info</IonLabel>
                </IonTabButton>
            </IonTabBar>
            
</IonTabs>
</IonReactRouter>
);
};

export default Settings;