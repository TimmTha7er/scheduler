import React from 'react';
import ContentLoader from 'react-content-loader';

const AppLoader: React.FC = () => {
  let y = 65;
  return (
    <div className='day-loader'>
      <ContentLoader
        speed={3}
        width={970}
        height={1600}
        // viewBox='0 0 970 1600'
        style={{ width: '99.5%' }}
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
      >
        {/* day grid header */}
        <rect x='5' y='20' rx='10' ry='10' width='955' height='30' />
        <rect x='5' y='75' rx='10' ry='10' width='955' height='25' />

        {/* day grid rows */}
        {Array(24)
          .fill(0)
          .map((_, idx) => {
            y += 56.3;
            return (
              <rect
                key={idx}
                x='5'
                y={y}
                rx='3'
                ry='3'
                width='955'
                height='25'
              />
            );
          })}
      </ContentLoader>
    </div>
  );
};

export default AppLoader;
