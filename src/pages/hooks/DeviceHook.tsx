import { Device } from '@capacitor/device';
import React, { useEffect, useState } from 'react';
const DeviceHook=()=>{
const[deviceInfo,setDInfo]=useState<any>('');
useEffect(() => {
    const logDeviceInfo = async () => {
        const info = (await Device.getInfo()).platform;
        setDInfo(info);
    };
    logDeviceInfo();
}, []);

return deviceInfo;
}
export default DeviceHook;