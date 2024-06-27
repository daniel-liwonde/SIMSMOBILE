import { IonAvatar, IonBadge, IonChip, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonItemDivider, IonMenu, IonMenuToggle, IonPage, IonRouterOutlet, IonSplitPane, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { IonContext } from '@ionic/react/dist/types/contexts/IonContext';
import React, { useEffect, useState } from 'react';
import { Device } from '@capacitor/device';
import List from './List';
import { Redirect, Route } from 'react-router';
import Settings from './Settings';
import { arrowBackCircle, book, bookOutline, cash, construct, create, createOutline, folder, folderOpen, folderOpenOutline, grid, gridOutline, home, homeOutline, lockOpen, lockOpenOutline, logOut, logOutOutline, notifications, notificationsOutline, person, personCircleOutline, receipt, receiptOutline, refresh, settings, settingsOutline, syncCircle, syncCircleOutline, time, timeOutline } from 'ionicons/icons';
import Login from './Login';
import prof from'../assets/avat.png'
import  './Menu.css';
import { useDataContext } from './context/UserContext';
import Details from './Details';
import RegisterCourses from './RegisterCourses';
import Notifications from './Notifications';
import Previous from './Previous';
import Carryovers from './Carryovers';
import Courses from './Courses';
import Timetables from './Timetables';
import UpdatePass from './UpdatePass';
import Welcome from '../components/Welcome';
import UserData from './hooks/UserData';
import DeviceHook from './hooks/DeviceHook';
import Cgrades from './Cgrades';
import FeesInfo from '../components/FeesInfo';
import Notifications_details from './Notifications_details';
import axios from 'axios';
import logo from '../assets/tecgsmall.png';
import Tab3 from './Tab3';
import ResetPass from './ResetPass';
const Menu: React.FC = () => {
const paths=[
    {name: 'Home', url: '/app/welcome', icon:home},
    {name: 'My Details', url: '/app/settings/details', icon:receipt},
    {name: 'Register Courses', url: '/app/settings/addCourses', icon:create},
    {name: 'Carryovers', url: '/app/carryovers', icon:syncCircle},
    {name: 'Timetables', url: '/app/timetables', icon: grid},
    {name: 'Current Results', url: '/app/cresults', icon:folderOpen},
    {name: 'Previous Results', url: '/app/previous', icon:folderOpen},
    {name: 'My Courses', url: '/app/settings/registeredCourses', icon:book},
    {name: 'Update Password', url: '/app/update', icon:lockOpen}
];
const { firstname, lastname, studid, setUserData } = useDataContext();
const[notice,setNotice]=useState<number>(0);
const getNoticeViews= async (suid:any) => {
    const data = new FormData();
    data.append("sid", suid);
    try {
       const path='http://localhost/server/code.php?action=findNotif';
      const response = await axios.post(path,data) 
                console.log(response.data)
            setNotice(response.data.noseen);
    }
    catch (error:any) {
       console.log(error)
  }
 
  }
useEffect(() => {
    getNoticeViews(studid)
},[notice]);


    return (
        <IonPage>
            <IonSplitPane contentId='main'>
            <IonMenu contentId='main'>
             <IonHeader>
                <IonToolbar color={'secondary'}>
                    <IonTitle>
                        MENU
                    </IonTitle>
                </IonToolbar>
             </IonHeader>
             <IonContent className='ion-padding'>
                <div className='menutop'>
                <IonAvatar className='prof' class='ion-margin-top'>
  <img src={prof} alt='default profile pic' />

                </IonAvatar>
            
                     <IonChip className='menup' style={{backgroundColor:"#54B4D3",color:"#fff"}}>{firstname} {lastname}</IonChip>
                
                </div>
                <IonMenuToggle autoHide={false}>
            {
               
            
                paths.map((path, index) =>(
                    <>
                    <IonItem key={index} routerLink={path.url} lines='none' className='over'>
                        <IonIcon icon={path.icon} slot='start' className='bmenu'/>
                        {path.name}</IonItem>
                        </>  
                  
                )
                
                )
            }
           <IonItem  routerLink='/app/notice' className='over' lines='none'>
           
           <IonIcon slot='start' icon={notifications} className='bmenu'> </IonIcon>
           
           Notifications &nbsp;
           {notice!==0 ? <IonBadge color={'danger'} className='bg'>{notice}</IonBadge>:""}
           </IonItem>
           <IonItem  routerLink='/' className='over' >
           
           <IonIcon slot='start' icon={arrowBackCircle} className='bmenu'> </IonIcon>
           
           Logout &nbsp;
          
           </IonItem>
           </IonMenuToggle>
          
             </IonContent>
            </IonMenu>
            <IonRouterOutlet id="main">
                <Route exact path="/app/welcome" component={Welcome} />
                <Route exact path="/app/cresults" component={Cgrades} />
                <Route exact path="/app/settings/details" component={Settings} />
                <Route exact path="/app/notice" component={Notifications} />
                <Route exact path="/app/previous" component={Previous} />
                <Route exact path="/app/resetpass" component={ResetPass} />
                <Route exact path="/app/notice_details/:id/:stid" component={Notifications_details}/>
                <Route exact path="/app/fees" component={FeesInfo}/>
                <Route exact path="/app/carryovers" component={Carryovers} />
                <Route exact path="/app/notice" component={Tab3} />
                <Route exact path="/app/settings/registeredCourses" component={Settings} />
                <Route exact path="/app/timetables" component={Timetables} />
                <Route exact path="/app/update" component={UpdatePass} />
                <Route exact path="/app/settings/addCourses" component={Settings} />
                <Route exact path="/" component={Login} />
                <Route exact path="/app" >
                    <Redirect to ="/app/welcome"/>
                </Route>
            </IonRouterOutlet>
            </IonSplitPane>
        </IonPage>
    );
};

export default Menu;