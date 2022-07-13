import React from 'react';
import SGProLayout from 'sinogear-module-layout';

const BasicLayout = (props) => {
  return <SGProLayout {...props} />;
};

SGProLayout.initFn({
  enableNotification: true
});

export default BasicLayout;
