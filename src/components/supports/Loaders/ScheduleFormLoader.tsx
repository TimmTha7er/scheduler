import React from 'react';
import ContentLoader from 'react-content-loader';

const ScheduleFormLoader: React.FC = () => {
  return (
    <div className='next'>
      <ContentLoader
        speed={3}
        width={970}
        height={45}
        // viewBox='0 0 970 1600'
        style={{ width: '99.5%' }}
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
      >
        <rect x='5' y='5' rx='10' ry='10' width='625' height='30' />
      </ContentLoader>
    </div>
  );
};

export default ScheduleFormLoader;
