import React, { useEffect, useState } from 'react';
import { IonInput, IonButton, IonLabel, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonText, IonCardContent, IonCard, useIonToast, IonItem, IonToggle, IonList, IonButtons, IonBackButton, IonChip, useIonAlert } from '@ionic/react';
import axios from 'axios';
import './appForm.css'
import { alertCircleOutline, globeOutline, logIn, logoFacebook, logoGoogle, logoInstagram, newspaper, newspaperOutline, person, radio, send, tv, tvOutline } from 'ionicons/icons';
const OnlineApplication = () => {
    const [showTost]= useIonToast();
    const[file,setFile]=useState<File>();
    const[sfile,setSfile]=useState<File>();
    const [Alert] =useIonAlert();
  const [formData, setFormData] = useState({ fname: '', sex:'', nation: '', lname: '', age: '', sname: '',
  address: '', paddress:'' , phone: '', email:'',sponsor: '', srelation:'', sphone: '', semail:'', exam1: '', exam2: '', exam3: '',
   edate: '', edate2: '', edate3: '', eresult: '', eresult2: '', eresult3: '',  emp1: '', emp2:'',dstart1: '', dstart2: '',
    appdate:'',
    dend1: '', dend2:'', how:'', discribe: '',prog:'',mode:'',bdate:''
  });
  const [toggleValues,setToggleValues] = useState(
    {
      news: false,tvadd: false,tvpro: false, bro: false,biuweb: false, personal: false, career:false, radio:false,
      disability: false, certify: false,instag: false, google: false, fb: false
    }
  )
  const handleToggleChange=(event:any, toggleName:any) => {
    setToggleValues({
      ...toggleValues,[toggleName]:event.detail.checked
    })

  }
  const handleChange = (e:any) => {
    const { name, value} = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const[data,setData]=useState<any>([])
      const fetchData = async () => {
          //console.log(cYear);
              const response = await axios.post('http://10.0.2.2/server/code.php?action=getprogrammes'
              )
              .then((response) => {setData(response.data)
              })
              .catch((error) =>console.error(error));
      };
  
      useEffect(() => {
          fetchData();
      }, []);
      
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    console.log(toggleValues.fb,toggleValues.instag)
    try {
      const formDataToSend = new FormData();
      Object.entries(toggleValues).forEach(([name, value]) =>{
        formDataToSend.append(name, value.toString());
      })
      formDataToSend.append('fname', formData.fname);
      formDataToSend.append('lname', formData.lname);
      formDataToSend.append('sname', formData.sname);
      formDataToSend.append('age', formData.age);
      formDataToSend.append('sex', formData.sex);
      formDataToSend.append('age', formData.age);
      formDataToSend.append('bdate', formData.bdate);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('paddress', formData.paddress);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('prog', formData.prog);
      formDataToSend.append('mode', formData.mode);
      formDataToSend.append('sponsor', formData.sponsor);
      formDataToSend.append('srelation', formData.srelation);
      formDataToSend.append('sphone', formData.sphone);
      formDataToSend.append('semail', formData.semail);
      formDataToSend.append('fexam', formData.exam1);
      formDataToSend.append('sexam', formData.exam2);
      formDataToSend.append('texam', formData.exam3);
      formDataToSend.append('edate', formData.edate);
      formDataToSend.append('edate2', formData.edate);
      formDataToSend.append('edate3', formData.edate3);
      formDataToSend.append('eresult', formData.eresult);
      formDataToSend.append('eresult2', formData.eresult2);
      formDataToSend.append('eresult3', formData.eresult3);
      formDataToSend.append('emp1', formData.emp1);
      formDataToSend.append('emp2', formData.emp2);
      formDataToSend.append('dstart1', formData.dstart1);
      formDataToSend.append('dstart2', formData.dstart2);
      formDataToSend.append('nation', formData.nation);
      formDataToSend.append('dend1', formData.dend1);
      formDataToSend.append('dend2', formData.dend2);
      formDataToSend.append('how', formData.how);
      formDataToSend.append('discribe', formData.discribe);
      formDataToSend.append('appldate', formData.appdate);
      
      // Check if file exists before appending
      if (file) {
        formDataToSend.append('file', file as File);
       formDataToSend.append('sfile',sfile as File);
      }
      
 if(toggleValues.certify===false){
  Alert('please cerifiy that the information given is true');
 }
 else
 {//start proceed if certified

  if(toggleValues.disability===true && formData.discribe==='')
    {
      Alert('please give information about your disability');
    }
    else
    {//if disability and  info given proceed
      if(!file || !sfile)
        {
          Alert('please upload atleast one certificate file');
        }
        else
        {//proceed if certificate is uploaded
           const response = await axios.post('http://10.0.2.2/server/code.php?action=apply', formDataToSend);
      if(response.data.success) {
      showTost({
        message: response.data.message,
        duration: 3000,
        color: 'success',
        position: 'bottom'
      })
      console.log(response.data); // Handle the response from the server
    }
    else
    {
        if(response.data.success) {
            showTost({
              message: response.data.message,
              duration: 5000,
              color: 'danger',
              position: 'bottom'
            })  
    }
      //console.log(response.data); // Handle the response from the server
}
    }//end proceed if file is attached
    }//end disability info
 }//end proceed if certify
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  return (
    <IonPage>
    <IonHeader>
        <IonToolbar color={'secondary'}>
          <IonButtons>
            <IonBackButton defaultHref='/welcome'></IonBackButton>
          </IonButtons>
            <IonTitle color={'light'}>Online Application Form</IonTitle>
        </IonToolbar>
    </IonHeader>
    <IonContent>
      
      
      <div style={{padding:"8px"}}>
      <IonChip style={{marginLeft:"3%"}}>Please fill  in the form below and submit to apply</IonChip>
    <form onSubmit={handleSubmit}>
    <select  name="prog" className='input'  value={formData.prog} onChange={handleChange}required>
<option value=""> Select programme</option>
{
  data.map((prog:any, index:any) =>(
    <option key={index} value={prog.cys}>
             {prog.cys}
    </option>

  ))
}
    </select>
    <select  name="mode" className='input' value={formData.mode} onChange={handleChange} required>
      <option value="">Select mode</option>
      <option value="online">Online</option>
      <option value="fulltime">Full time</option>
      <option value="abmal4">ABMA Level 4</option>
      <option value="abmal5">ABMA Level 5</option>
      <option value="abmal6">ABMA Level 6</option>
      <option value="abmal4">ABE Level 4</option>
      <option value="abmal5">ABE Level 5</option>
      <option value="abmal6">ABE Level 6</option>
      </select>
      <fieldset className='ion-margin-bottom'>
        <legend color='#985252'>Personal information</legend>
      <input name="fname" placeholder="First name" value={formData.fname} onChange={handleChange} className='input' />
      <input name="lname" placeholder="Surname" value={formData.lname} onChange={handleChange} className='input' />
      <input name="sname" placeholder="Second name" value={formData.sname} onChange={handleChange}   className='input'/>
      <label style={{marginLeft:"13%"}}>Birth date:</label>
      <input name="bdate" placeholder="birth date" value={formData.bdate} onChange={handleChange} type="date"  className='input' required/>
      <select name="sex"   value={formData.sex} onChange={handleChange}  className='input' required >
      <option value=" ">Select sex</option>
        <option>Male</option>
        <option>Female</option>
      </select>
      <select name="nation" value={formData.nation} onChange={handleChange}  className='input' required >
      <option  value=""> Select country </option>
                                            <option >Malawi</option>
                                           <option>Zambia</option>
                                           <option>Mocambique</option>
                                           <option>Tanzania</option>
                                           <option>Uganda</option>
                                           <option>South Africa</option>
                                           <option>Zimbabwe</option>
                                           <option>DRC</option>
                                           <option>Dutch</option>
                                           <option>Kenya</option>
                                           <option>Nigeria</option>
                                           <option>Zaire</option>
                                           <option>Namibia</option>
                                           <option>Afghanistan</option>
                                           <option>Tunisia</option>
                                          <option>Algeria</option>
                                           <option>Burundi</option>
                                           <option>Macedonia</option>
                                            <option>Madagascar</option>
                                            <option>Botswana </option>
                                            <option>Malaysia </option>
                                            <option >Angola</option>
                                            <option>Mali</option>
                                            <option>UK</option>
                                             <option>America</option>
                                              <option>Britain</option>
                                            <option >Marocco</option>
                                            <option>Swazland</option>
                                             <option>Jamica</option>
                                             <option>Japan</option>
                                            <option >Mauritias</option>
                                            <option >Other</option>
                                            </select>
                                            <input name="paddress" placeholder='permanent address'  value={formData.paddress} onChange={handleChange}  className='input' required/>
                                            <input type="text"  multiple     name="address" onChange={handleChange}  value={formData.address} placeholder="postal address" className='input' required />
                                                
                                            
      <input name="phone"  type="number"  value={formData.phone} onChange={handleChange}  placeholder='phone number' className='input' required/>
      <input name="email"  type="email" value={formData.email} onChange={handleChange} placeholder='Email' className='input' required/>
      </fieldset>
      <fieldset className='ion-margin-bottom'>
      
      <legend>Sponsor Information </legend>
        <input name="sponsor"   value={formData.sponsor} onChange={handleChange}  placeholder='sponsor name or self' className='input' required />
      <input name="srelation"   value={formData.srelation} placeholder='Sponsor relationship' onChange={handleChange}  className='input' />
      <input name="sphone"  type="number"  value={formData.sphone} onChange={handleChange}  placeholder='sponsor phone' className='input' />
      <input name="semail"  type="email" value={formData.semail} onChange={handleChange}   placeholder='sponsor email' className='input' />
</fieldset>
      
      
<p> <label> Examinations taken</label></p>
      <fieldset className='ion-margin-bottom'>
      <legend> Examination 1:</legend>
        <input name="exam1"   value={formData.exam1} placeholder='Examination name' onChange={handleChange}  className='input' />
        <p> <label>Date taken</label></p>
        <input name="edate"   value={formData.edate} placeholder='Date taken' onChange={handleChange} type="date" className='input' />
        <input name="eresult"   value={formData.eresult} placeholder='Examination result' onChange={handleChange}  className='input' />
        </fieldset>
        <fieldset className='ion-margin-bottom'>
      <legend> Examination 2:</legend>
        <input name="exam2"   value={formData.exam2} placeholder='Examination name' onChange={handleChange}  className='input' />
        <p> <label>Date taken</label></p>
        <input name="edate2"   type="date" value={formData.edate2} placeholder='Date taken' onChange={handleChange}  className='input' />
        <input name="eresult2"   value={formData.eresult2} placeholder='Examination result' onChange={handleChange}  className='input' />
        </fieldset>
        <fieldset className='ion-margin-bottom'>
      <legend> Examination 3:</legend>
     
        <input name="exam3"   value={formData.exam3} placeholder='Examination name' onChange={handleChange}  className='input' />
        <p><label>Date taken</label></p>
        <input name="edate3" type="date"  value={formData.edate3} placeholder='Date taken' onChange={handleChange}  className='input' />
        <input name="eresult3"   value={formData.eresult3} placeholder='Examination result' onChange={handleChange}  className='input' />
        </fieldset>
        <p> <label> Employment Details</label></p>
        <fieldset className='ion-margin-bottom'>
          
        <legend>First Employment</legend>
        <textarea name="emp1"   value={formData.emp1} placeholder='Employer name and address' onChange={handleChange} rows={4} cols={4} className='input' />
        <p> <label> Employment Start Date</label></p>
        <input name="dstart1"  type="date" value={formData.dstart1} placeholder='date taken' onChange={handleChange}  className='input' />
        <p><label> End Date</label></p>
        <input name="dend1" type="date"  value={formData.dend1} placeholder='end date' onChange={handleChange}  className='input' />
       </fieldset>
       <fieldset className='ion-margin-bottom'>
        <legend>Second  Employment details</legend>
        <textarea name="emp2"   value={formData.emp2} placeholder='Employer name and address' onChange={handleChange} rows={4} className='input' > </textarea>
        <p> <label> Employment start Date</label></p>
        <input name="dstart2"  type="date" value={formData.dstart2} placeholder='Start date' onChange={handleChange}  className='input' />
        <p><label>  Employment end Date</label></p>
        <input name="dend2" type="date"  value={formData.dend2} placeholder='end date' onChange={handleChange}  className='input' />
        </fieldset>
      <IonItem>How will this program develop your career?</IonItem>
      <textarea name="how"   value={formData.how} placeholder="Description here" onChange={handleChange}  className='input' required> </textarea>
      <IonItem >
        <IonLabel>Do you have any disability that can affect your studies</IonLabel>
        <IonToggle slot="end" onIonChange={(e)=>handleToggleChange(e,'disability')} 
        checked={toggleValues.disability}></IonToggle>
      </IonItem>
      <input name="discribe"   value={formData.discribe} placeholder='If yes,please give a full description' onChange={handleChange}  className='input' />
      <fieldset>
        <legend>How did you know about us?</legend>
          <IonList>
          <IonItem>
          <IonLabel><IonIcon slot='start' icon={newspaperOutline}></IonIcon> &nbsp;News paper</IonLabel>
        <IonToggle slot="end" onIonChange={(e)=>handleToggleChange(e,'news')} 
        checked={toggleValues.news}
        ></IonToggle>
      </IonItem>
      <IonItem>
          <IonLabel><IonIcon slot='start' icon={radio}></IonIcon> &nbsp;Radio</IonLabel>
        <IonToggle slot="end" onIonChange={(e)=>handleToggleChange(e,'radio')} 
        checked={toggleValues.radio}></IonToggle>
      </IonItem>
      <IonItem>
          <IonLabel><IonIcon slot='start' icon={radio}></IonIcon> &nbsp;Career guidance talk</IonLabel>
        <IonToggle slot="end" onIonChange={(e)=>handleToggleChange(e,'career')} 
        checked={toggleValues.career}></IonToggle>
      </IonItem>
      <IonItem>
          <IonLabel> <IonIcon slot='start' icon={tv}></IonIcon> &nbsp;Tv Advertisement</IonLabel>
        <IonToggle slot="end" onIonChange={(e)=>handleToggleChange(e,'tvadd')} 
        checked={toggleValues.tvadd}></IonToggle>
      </IonItem>
      <IonItem>
          <IonLabel> <IonIcon slot='start' icon={tvOutline}></IonIcon> &nbsp;Tv program</IonLabel>                        
        <IonToggle slot="end" onIonChange={(e)=>handleToggleChange(e,'tvpro')} 
        checked={toggleValues.tvpro}></IonToggle>
      </IonItem>
      <IonItem>
          <IonLabel><IonIcon slot='start' icon={newspaper}></IonIcon> &nbsp;Brochure</IonLabel>
        <IonToggle slot="end" onIonChange={(e)=>handleToggleChange(e,'bro')} 
        checked={toggleValues.bro}></IonToggle>
      </IonItem>
      <IonItem>
          <IonLabel><IonIcon slot='start' icon={globeOutline}></IonIcon> &nbsp;BIU Website</IonLabel>
        <IonToggle slot="end" onIonChange={(e)=>handleToggleChange(e,'biuweb')} 
        checked={toggleValues.biuweb}></IonToggle>
      </IonItem>
      <IonItem>
          <IonLabel><IonIcon slot='start' icon={person}></IonIcon> &nbsp;Personal recommendation</IonLabel>
        <IonToggle slot="end" onIonChange={(e)=>handleToggleChange(e,'personal')} 
        checked={toggleValues.personal}></IonToggle>
      </IonItem>
      <IonItem lines="none">
      <IonLabel><IonIcon slot='start' icon={person} size='large'></IonIcon> &nbsp;Social media</IonLabel>
      </IonItem>
      <IonItem lines="none">
          
       <IonLabel> <IonIcon icon={logoFacebook} slot='start' size='large'></IonIcon><IonToggle slot="end" onIonChange={(e)=>handleToggleChange(e,'fb')} 
        checked={toggleValues.fb}></IonToggle>
        </IonLabel> 
        <IonLabel> <IonIcon icon={logoInstagram} slot='start' size='large'></IonIcon><IonToggle slot="end" onIonChange={(e)=>handleToggleChange(e,'instag')} 
        checked={toggleValues.instag}></IonToggle>
        </IonLabel> 
        
        <IonLabel> <IonIcon icon={logoGoogle} slot='start' size='large'></IonIcon><IonToggle slot="end" onIonChange={(e)=>handleToggleChange(e,'google')} 
        checked={toggleValues.google}></IonToggle>
        </IonLabel> 
        
      </IonItem>
      
      </IonList>
        
        </fieldset>
        
       <p><label>Copy of certificate 1</label></p>
      <input type="file" accept=".pdf,.doc,.docx"  onChange={(e:any)=>{setFile(e.target.files[0])}}  className='input'/>
      <p><label>Copy of certificate 2</label></p>
      <input type="file" accept=".pdf,.doc,.docx" onChange={(e:any)=>{setSfile(e.target.files[0])}}  className='input'/>
      <IonItem>
          <IonLabel>I certify that the information given is true</IonLabel>
        <IonToggle slot="end" onIonChange={(e)=>handleToggleChange(e,'certify')} 
        checked={toggleValues.certify} ></IonToggle>
      </IonItem>
       <label>Date:</label>
       <input name="appdate"  type="date" value={formData.appdate} placeholder='result' onChange={handleChange}  className='input' required />
      <IonButton   color={'success'}  shape='round' type='submit' className='ion-warning' expand='block'>
        
                            <IonIcon icon={send} color={'light'}  slot='end'></IonIcon>
                            <IonText color="light">APPLY</IonText></IonButton>
    </form>
    </div>
    </IonContent>
    </IonPage>
  );
};

export default OnlineApplication ;

