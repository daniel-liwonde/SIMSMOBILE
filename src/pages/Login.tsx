import { IonBackButton, IonButton, isPlatform,IonCard, IonCardContent, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonLoading, useIonRouter, useIonToast, IonLabel } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import {arrowForwardCircleOutline, body, bookOutline, key, lockOpen, logIn, logInOutline, person, personCircle, refreshCircle, settingsOutline, trailSignOutline} from 'ionicons/icons';
import logo from '../assets/logo.png';
import Intro from './Intro';
import './Intro.css'
import { Preferences } from '@capacitor/preferences';
import { useDataContext } from './context/UserContext';
import { Device } from '@capacitor/device';
import DeviceHook from './hooks/DeviceHook';
import axios from 'axios';

const INTRO_KEY ='intro_seen';
const Login: React.FC = () => {
    const router =useIonRouter();
    const { firstname, lastname, studid, setUserData } = useDataContext();
    const[introSeen,setIntroSeen]=useState(true);
    const[username,setUsername] = useState<string>('');
    const[login,setLogin] =useState<boolean>();
    const[password,setPassword] = useState<string>('');
   const[present, dismiss] = useIonLoading();
   const [showTost]=useIonToast(); //
    useEffect(()=>{
        const checkStorage = async()=>{
            const seen =  await Preferences.get({key:INTRO_KEY})
            setIntroSeen(seen.value==='true')
    
        }
checkStorage()
    },[]);
    useEffect(() => {
    },[]);
        const finishIntro = async()=>{
         
            setIntroSeen(true)
            Preferences.set({key:INTRO_KEY, value:'true'})
        }
        const introAgain = ()=>{
            setIntroSeen(false)
            Preferences.remove({key:INTRO_KEY})
        }
      
        const handleLogin = async (e:any) => {
          e.preventDefault();
          const formData = new FormData();        
       formData.append('username', username)
       formData.append('password', password);
       try{
        
              const response=await axios.post('http://localhost/server/code.php?action=login',formData)
                  
                if(response.data.success===true) {
                  const{detail}=response.data
                  const { firstname, lastname,id,cys,joined_in,stud_current_year, addm_year,stud_email,birth_date,gender,sponsor,
                    nation,current_sem,stud_pnone,qualif,spo_email,sp_address,student_id,spo_phone,username,stud_address} = detail[0];
                    setUserData({ firstname: firstname, lastname: lastname, studid:id,prog:cys,currentyear:stud_current_year,addm_year:
                    addm_year,stud_email:stud_email,birth_date:birth_date,gender:gender,sponsor:sponsor,nation:nation,
                    current_sem:current_sem,stud_phone:stud_pnone,qualif:qualif,spo_email:spo_email,sp_address:sp_address,student_id:student_id,
                    spo_phone:spo_phone,username:username,joined:joined_in,address:stud_address});
                    finishIntro();
                    await present('Logging in...');
                    dismiss();
                    //setLogin(resp.success)
                    router.push('/app', 'root');
                }
                else
                {
                  showTost(
                    {
                      message:"Failed to login:"+response.data.message,
                      duration: 3000,
                      color: "danger" 
                    }

                  ) 
                  console.log("message",response.data.message)
                }
              }
              catch (error:any)
              {
                showTost(
                  {
                    message: "Unable to login:"+ error.message,
                    duration: 3000,
                    color: "danger" 
                  }

                ) 
              }
            }
           const getReset=() => {
            router.push('/app/resetpass','forward');
           }   
    return (
            <>
      {
        !introSeen ? (<Intro onFinish={finishIntro}/>) :(
        <IonPage>
            <IonHeader>
                <IonToolbar color={'secondary'}>
                    <IonTitle color={'light'}>BIU SIMS</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent >
                
                    <IonContent>
                        <IonGrid>
                            <IonRow class='ion-justify-content-center'>
                                <IonCol size='12' sizeMd='8' sizeLg='4'>
                                <div className='ion-text-center ion-padding'>
                        
                        </div>
                                </IonCol>
                            </IonRow>
                            <IonRow class='ion-justify-content-center'>
                                <IonCol size='12' sizeMd='8' sizeLg='4'>
                                <img src={logo}  alt='biu logo'  className='logo'/>
                                <span className='sign'>PLEASE SIGN IN</span>
                                <div className='formwrapper'>                      
                            
                        <form onSubmit={handleLogin}>
                            <input className='inputform'  placeholder='Username' value={username} type='text'  onChange={(e)=>setUsername(e.target.value!)} />
                            <IonIcon icon={person} slot='start' style={{marginLeft:'-78%',fontWeight:'bold',color:'#989aa2'}}></IonIcon>
                            <input   placeholder="Password"  value={password} onChange={(e)=>setPassword(e.target.value!)} type='password' className='inputform' />
                            <IonIcon icon={lockOpen} slot='start' style={{marginLeft:'-78%',fontWeight:'bold',color:'#989aa2'}}></IonIcon>
                        <IonButton  style={{padding:"2px"}} color={'success'}  shape='round' type='submit' className='ion-warning' expand='block'>
                            <IonIcon icon={ arrowForwardCircleOutline} color={'light'}  slot='end'></IonIcon>
                            <IonText color="light">LOGIN</IonText></IonButton>
                            <div style={{marginBottom:"20px",marginTop:"20px",marginLeft:"6%"}}>
                    <IonLabel className='ion-margin-top ion-padding' color={'primary'} style={{marginLeft:"13%", cursor:"pointer"}} onClick={introAgain}>See Intro</IonLabel> <IonLabel className='ion-margin-top ion-padding' color={'primary'} onClick={getReset} style={{cursor:"pointer"}}>Forgot Password
                    </IonLabel>
                    </div>
                        </form>

                        </div>
                                </IonCol>
                                </IonRow>
                        </IonGrid>
                    </IonContent>
                   
            </IonContent>
        </IonPage>
    )
}
        </>
    
    );
};

export default Login; 