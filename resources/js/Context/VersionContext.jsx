import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

const VersionContext = createContext();

export const VersionProvider = ({ children }) => {
  // Baca dari cookie saat inisialisasi, default null (terbaru)
  const [version, setVersionState] = useState(() => {
    return Cookies.get('version') || null;
  });

  // Set version + simpan ke cookie
  const setVersion = (newVersion) => {
    setVersionState(newVersion);
    if(newVersion === null) {
      Cookies.remove('version'); // hapus cookie jika versi null (terbaru)
    } else {
      Cookies.set('version', newVersion, { expires: 7 }); // cookie expire 7 hari
    }
  };

  return (
    <VersionContext.Provider value={{ version, setVersion }}>
      {children}
    </VersionContext.Provider>
  );
};

export const useVersion = () => useContext(VersionContext);
