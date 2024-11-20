import React, {useEffect, useState} from 'react';

let App = null;

const AppWrapperComponent = () => {
  const [showAppComponent, setshowAppComponent] = useState(false);
  useEffect(() => {
    if (App == null) {
      App = require('./App').default;
      setshowAppComponent(true);
    }
    return () => {
      App = null;
    };
  }, []);
  return <>{showAppComponent && <App />}</>;
};

export default AppWrapperComponent;
