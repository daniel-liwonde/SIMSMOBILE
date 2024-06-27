import { Preferences } from '@capacitor/preferences';
import React, { useEffect, useState } from 'react';
const UserData = ()=>{
    const [id, setId] = useState<any>('');
    const [sfname, setFname] = useState<any>('');
    const [slname, setLname] = useState<any>('');
    const [bdate, setBdate] = useState<any>('');
    const [email, setEmail] = useState<any>('');
    const [address, setAddress] = useState<any>('');
    const [phone, setPhone] = useState<any>('');
    const [regNo, setRegNo] = useState<any>('');
    const [joinIn, setJoinIn] = useState<any>('');
    const [cyear, setCyear] = useState<any>('');
    const [sem, setSem] = useState<any>('');
    const [admyear, setAdmYear] = useState<any>('');
    const [gender, setGender] = useState<any>('');
    const [sponsor, setSponsor] = useState<any>('');
    const [spoEmail, setSpoEmail] = useState<any>('');
    const [spoAdd, setSpoAdd] = useState<any>('');
    const [country, setCountry] = useState<any>('');
    const [cqualif, setCQualif] = useState<any>('');
    const [pro, setPro] = useState<any>('');
    const [spophone, setSphone] = useState<any>('');
    const [uid, setUID] = useState<any>('');
    
    useEffect(() =>{
        const setdata=async() => {
          const ui=(await Preferences.get({ key: 'userid' })).value; setUID(ui);
          const p=(await Preferences.get({ key: 'prog' })).value; setPro(p);
          const q=(await Preferences.get({ key: 'entryQ' })).value; setCQualif(q);
          const count=(await Preferences.get({ key: 'country' })).value; setCountry(count);
          const spadd=(await Preferences.get({ key: 'saddress' })).value; setSpoAdd(spadd);
        const spoe=(await Preferences.get({ key: 'spemail' })).value; setSpoEmail(spoe);
        const spo=(await Preferences.get({ key: 'sponsor' })).value; setSponsor(spo);
        const g=(await Preferences.get({ key: 'gender' })).value; setGender(g);
        const ayear=(await Preferences.get({ key: 'admyear' })).value; setAdmYear(ayear);
        const csem=(await Preferences.get({ key: 'csem' })).value; setSem(csem);
        const year=(await Preferences.get({ key: 'cyear' })).value; setCyear(year);
        const join=(await Preferences.get({ key: 'joined' })).value; setJoinIn(join);
        const ids=(await Preferences.get({ key: 'id' })).value; setId(ids);
        const reg=(await Preferences.get({ key: 'reg' })).value; setRegNo(reg);
        const fname=(await Preferences.get({ key: 'fname' })).value; setFname(fname);
        const lname=(await Preferences.get({ key: 'lname' })).value; setLname(lname);
        const bd=(await Preferences.get({ key: 'bdate' })).value; setBdate(bd);
        const em=(await Preferences.get({ key: 'semail' })).value; setEmail(em);
        const add=(await Preferences.get({ key: 'saddress' })).value; setAddress(add);
        const pn=(await Preferences.get({ key: 'sphone' })).value; setPhone(pn);
        const spn=(await Preferences.get({ key: 'spophone' })).value; setSphone(pn);
        }
        setdata();
    },[]);
  return{
    sfname,
    slname,
    bdate,
    email,
    address,
    phone,
    regNo,
    joinIn,cyear,sem,admyear,gender,sponsor,spoEmail,spoAdd,cqualif,country,pro,spophone,id,uid
  }  
}
export default UserData;