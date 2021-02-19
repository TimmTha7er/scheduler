import React from 'react';
import ContentLoader from 'react-content-loader';

const DayListLoader: React.FC = () => {
  return (
    <div className='user-bar'>
      <ContentLoader
        speed={3}
        width={60}
        height={20}
        // viewBox='0 0 970 1600'
        style={{ width: '99.5%' }}
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
      >
        <rect x='0' y='0' rx='10' ry='10' width='55' height='20' />
      </ContentLoader>
    </div>
  );
};

export default DayListLoader;
