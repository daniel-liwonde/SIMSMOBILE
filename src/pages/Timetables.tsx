import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonChip, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonMenuButton, IonPage, IonRefresher, IonRefresherContent, IonSegment, IonSegmentButton, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDataContext } from './context/UserContext';
import SemHook from './hooks/SemHook';
import FormatDate from './hooks/FormateDate';
import PrintSlot from './hooks/PrintSlot';
import './Time.css';
import { calendar, home, person, ticketOutline, time } from 'ionicons/icons';
const Timetables: React.FC = () => {
    const[activeSegment,setActiveSegment] = useState<any>('teaching');
    const[tableData, setTableData] = useState<any>([]);
    const[teachData, setTeachData] = useState<any>([]);
    const[venues, setVenues] = useState<any>([]);
    const [showTost]=useIonToast();
    const {studid} = useDataContext();
    const{csem,cYear}= SemHook();
    const[loading,setLoading] = useState<boolean>(true)
          
    const fetchData = async () => {
        console.log(studid,csem,cYear);
        try {
            const response = await axios.post('http://localhost/server/timetables.php?action=exam', {
                studID: studid,
                sem: csem,
                year: cYear
            });

            if (response.data.success) {
                //setTableHtml(response.data.table_html);
                setTableData(response.data.table);
                setVenues(response.data.venue);
            } else {
                showTost(
                    {
                        message: response.data.message,
                        duration: 3000,
                        color: 'danger'
                    }
                )
                // Handle error
            }
        } catch (error:any) {
            console.error('Error:', error.message);
            // Handle error
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const doRefresh = async(event:any) => {
    fetchData();
       event.target.complete();
       setLoading(false);
    }

    const fetchDatateach = async () => {
        console.log(studid,csem,cYear);
        try {
            const response = await axios.post('http://localhost/server/timetables.php?action=teach', {
                studID: studid,
                sem: csem,
                year: cYear
            });

            if (response.data.success) {
                //setTableHtml(response.data.table_html);
                setTeachData(response.data.courses);
                console.log('our teaching message:'+response.data.message);
                console.log('our teaching message:'+response.data.courses);
            } else {
                showTost(
                    {
                        message: response.data.message +'If you did reflesh the page by pulling down',
                        duration: 3000,
                        color: 'danger'
                    }
                )
                // Handle error
            }
        } catch (error:any) {
            console.error('Error:', error.message);
            // Handle error
        }
    };
    useEffect(() => {
        fetchDatateach();
    }, []);

    const doRefreshteach = async(event:any) => {
    fetchDatateach();
       event.target.complete();
       setLoading(false);
    }
    return (
        <IonPage>
             <IonHeader>
                <IonToolbar color={'secondary'}>
                <IonButtons slot='start'>
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle color={'light'}>Timetables</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-no-padding ion-marging-top ion-align-content-center">
            <IonSegment value={activeSegment} onIonChange={(e)=>setActiveSegment(e.target.value!)}>
    <IonSegmentButton value="teaching">TEACHING</IonSegmentButton>
    <IonSegmentButton value="exam">EXAMS</IonSegmentButton>
</IonSegment>
{ activeSegment==='exam' &&( <>
            <IonRefresher slot='fixed'  onIonRefresh={(ev)=>doRefresh(ev)}>
                    <IonRefresherContent />
                </IonRefresher>
          
                <div className='contentwrapper' style={{paddingLeft:"10%",marginTop:"10px"}}> 
        <IonCardHeader>
        <IonChip>Exam timetable  {' '} {csem===1?'Jan-June':'July-Dec'},{cYear}</IonChip>
        </IonCardHeader>
        <IonCardContent class='ion-padding'>
        {
            tableData.map((data:any,index:any)=>(
<IonItem key={index}>
    <IonLabel>
        {data.course}
    <p><IonIcon slot="start" icon={calendar}></IonIcon> {' '}{FormatDate(data.edate)}</p>
    <p><IonIcon slot="start" icon={time}></IonIcon> {' '}{data.session_from} - {data.session_to}</p>
    <p><IonIcon slot="start" icon={home}></IonIcon> {' '}
    {venues.map((v:any)=>(<span key={index}>{v.room},</span>))}
    </p>
    </IonLabel>

</IonItem>
            ))
        }
        </IonCardContent>
       </div>
       </>
)}
{
    activeSegment==='teaching' &&( <>
            <IonRefresher slot='fixed'  onIonRefresh={(ev)=>doRefreshteach(ev)}>
                    <IonRefresherContent />
                </IonRefresher>
          
                <div className='contentwrapper' style={{paddingLeft:"10%",marginTop:"10px"}}> 
        <IonCardHeader>
        <IonChip>Teaching timetable  {' '} {csem===1?'Jan-June':'July-Dec'},{cYear}</IonChip>
        </IonCardHeader>
        <IonCardContent class='ion-padding'>
            {teachData.map((data:any,index:any)=>(
<IonItem key={index}>
    <IonLabel >
        {data.allocatedcourse}
    <p><IonIcon slot="start" icon={person}></IonIcon> {' '}{data.lecturerlname}{' '}{data.lecturerfname}</p>
    <p><IonIcon slot="start" icon={time}></IonIcon> {' '} {PrintSlot(Number(data.timeslot))}</p>
    <p><IonIcon slot="start" icon={home}></IonIcon> {' '}{data.room}
   
    </p>
    </IonLabel>

</IonItem>
            ))
            
            
            }
        </IonCardContent>
        </div></>
    )
}
            </IonContent>
        </IonPage>
    );
};

export default Timetables;

