import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, isPlatform,IonChip, IonContent, IonDatetime, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonMenuButton, IonModal, IonNote, IonPage, IonRefresher, IonRefresherContent, IonSegment, IonSegmentButton, IonSkeletonText, IonTitle, IonToolbar, useIonAlert, useIonToast, IonText, IonSearchbar, IonInput, IonSelect, IonItemOption, IonFooter, IonAccordion, IonAccordionGroup, IonGrid, IonRow, IonCol, IonCardHeader } from '@ionic/react';
import { add, body, closeOutline, ellipsisVertical, menuOutline, moveSharp, refresh, trash, trashBinOutline, trashOutline } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import { Device } from '@capacitor/device';
import './Tab1.css';
import prof from'../assets/avat.png'
import Settings from './Settings';
import UserData from './hooks/UserData';
import SemHook from './hooks/SemHook';
import { Preferences } from '@capacitor/preferences';
import { useDataContext } from './context/UserContext';
import axios from 'axios';
const Previous: React.FC = () => {
const[loading,setLoading] = useState<boolean>(true);
const [data, setData] = useState<any[]>([]);
const{csem,cYear,prvSemTag,semTag}=SemHook();
const[showTost]=useIonToast();
const {studid } = useDataContext();
const handlePrevious = async (id:any) => {
  try {
    const formdata= new FormData();
    formdata.append("studID", id);
    const response = await axios.post('http://localhost/server/code.php?action=getPreviousResults', formdata);
    if (response.data.success) {
    
        setData(response.data.results);
      }
      else
      {
      
        showTost(
          {
              message: response.data.message,
              duration: 3000,
              color: 'info'
          }
          );
      }
    }
  catch (error:any) {
      console.log(error);
      showTost(
          {
              message: error,
              duration: 3000,
              color: 'danger'
          });
}
}
    useEffect(() => {
      handlePrevious(studid);
    },[]);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'secondary'}>
                    <IonButtons slot='start'>
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle>Previous Results</IonTitle>
                    <IonButtons slot='end'>
                        <IonButton><IonIcon slot='icon-only' icon={ellipsisVertical}></IonIcon></IonButton>
                    </IonButtons>
                </IonToolbar>
                
            </IonHeader>
            
            <IonContent>
            
                    
            <div className='contentwrapper' style={{marginTop:"10px"}}> 
                <IonAccordionGroup>
                <IonGrid>
  {Object.values(
    data.reduce((acc, grades) => {
      const key = `${grades.year}-${grades.sem}`;
      if (!acc[key]) {
        acc[key] = { year: grades.year, sem: grades.sem, grades: [] };
      }
      acc[key].grades.push(grades);
      return acc;
    }, {})
  ).map((semesterData:any, index) => (
    <IonAccordion key={`accordion-${index}`} value={`first${index}`}>
      {cYear===semesterData.year && (csem-1)===semesterData.sem ?
      <IonItem slot="header" color={'success'}>
        <IonLabel color={'light'}>{semTag} (Current)</IonLabel>
      </IonItem>:
 <IonItem slot="header" color={'light'}>
 <IonLabel>{semesterData.year}, {Number(semesterData.sem) === 1 ? 'Jan-June' : "July-Dec" } </IonLabel>
</IonItem>
}
      <div className="ion-padding" slot="content" style={{position:"relative"}}>
      <IonRow class="custom-row" >
        <IonCol size='5' class="custom-col"> C.Name</IonCol>
        <IonCol size='1.4' class="custom-col">CW1</IonCol>
        <IonCol size='1.4' class="custom-col">CW2</IonCol>
        <IonCol size='1.4' class="custom-col">EX</IonCol>
        <IonCol size='1.4'class="custom-col">Eos</IonCol>
        <IonCol size='1.4'class="custom-col">Gr.</IonCol>
        </IonRow>
        {semesterData.grades.map((courseData:any, courseIndex:any) => (
            <IonRow  key={`course-${courseIndex}`} class="custom-row">
            <IonCol size='5' class="custom-col">{courseData.subject_title}</IonCol>
            <IonCol size='1.4' class="custom-col"> {courseData.assign_1}</IonCol>
            <IonCol size='1.4' class="custom-col"> {courseData.assign_2}</IonCol>
            <IonCol size='1.4'class="custom-col">{courseData.EOS}</IonCol>
            <IonCol size='1.4'class="custom-col">{courseData.fgrade}</IonCol>
            <IonCol  size='1.4'class="custom-col">{ courseData.assign_1===0 || courseData.assign_2===0 || courseData.EOS===0  ? 'N/A':courseData.comment }</IonCol>
            </IonRow>
        
        ))}
      
      </div>
    </IonAccordion>
  ))}
    </IonGrid>
</IonAccordionGroup>
</div>
    </IonContent>
    
        </IonPage>
    );
};


export default Previous;