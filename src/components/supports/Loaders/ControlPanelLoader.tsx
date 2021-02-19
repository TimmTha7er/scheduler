import React from 'react';
import ContentLoader from 'react-content-loader';

const ControlPanelLoader: React.FC = () => {
  return (
    <div className='control-panel'>
      <ContentLoader
        speed={3}
        width={970}
        height={50}
        // viewBox='0 0 970 1600'
        style={{ width: '99.5%' }}
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
      >
        {/* control panel */}
        <rect x='5' y='10' rx='10' ry='10' width='125' height='25' />
        <rect x='170' y='10' rx='10' ry='10' width='220' height='25' />
        <rect x='830' y='10' rx='10' ry='10' width='125' height='25' />
      </ContentLoader>
    </div>
  );
};

export default ControlPanelLoader;
