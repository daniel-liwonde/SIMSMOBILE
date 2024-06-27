// DataContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DataContextProps {
  firstname: string | null;
  lastname: string | null;
  studid: number | null;
  prog:string | null;
  currentyear:number | null;
  addm_year: number | null;
  stud_email:string | null;
  birth_date:string | null;
  gender: string | null;
  sponsor:string | null;
  nation:string | null;
  current_sem: number | null;
  stud_phone:string | null;
  qualif: string | null;
  spo_email:string | null;
   sp_address:string | null;
  student_id:string | null;
  spo_phone:string | null;
  joined :number | null;
  address:string | null;
  username:string | null;
setUserData: (newData: { firstname: string, lastname: string, studid:number,
  prog:string ,
  currentyear:number ,
  addm_year: number ,
  stud_email:string ,
  birth_date:string ,
  gender: string ,
  sponsor:string ,
  nation:string ,
  current_sem: number ,
  stud_phone:string ,
  qualif: string ,
  spo_email:string ,
   sp_address:string ,
  student_id:string ,
  spo_phone:string ,
  joined:number,
  address:string,
  username:string 

}) => void;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<{ firstname: string | null, lastname: string | null, studid:number | null,
    prog:string | null,
    currentyear:number | null,
    addm_year: number | null,
    stud_email:string | null,
    birth_date:string | null,
    gender: string | null,
    sponsor:string | null,
    nation:string | null,
    current_sem: number | null,
    stud_phone:string | null,
    qualif: string | null,
    spo_email:string | null,
     sp_address:string | null,
    student_id:string | null,
    spo_phone:string | null,
    username:string | null,
    joined: number | null,
    address:string | null

  }>({
    firstname: null,
    lastname: null,
    studid: null,
    prog:null,
    currentyear: null,
    addm_year:  null,
    stud_email:null,
    birth_date: null,
    gender:  null,
    sponsor:null,
    nation: null,
    current_sem: null,
    stud_phone: null,
    qualif: null,
    spo_email:null,
     sp_address:null,
    student_id: null,
    spo_phone: null,
     joined:  null,
    username: null,
    address:null,
  });
  const contextValue: DataContextProps = {
    firstname: userData.firstname,
    lastname: userData.lastname,
    studid: userData.studid,
    prog:userData.prog,
    currentyear: userData.currentyear,
    addm_year: userData.addm_year,
    stud_email:userData.stud_email,
    birth_date: userData.birth_date,
    gender:  userData.gender,
    sponsor:userData.sponsor,
    nation: userData.nation,
    current_sem: userData.current_sem,
    stud_phone: userData.stud_phone,
    qualif: userData.qualif,
    spo_email:userData.spo_email,
     sp_address:userData.sp_address,
    student_id: userData.student_id,
    spo_phone: userData.spo_phone,
    username: userData.username,
     joined: userData.joined,
     address:userData.address,
    setUserData: (newData) => setUserData(newData),
  };

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

const useDataContext = (): DataContextProps => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};

export { DataProvider, useDataContext };
