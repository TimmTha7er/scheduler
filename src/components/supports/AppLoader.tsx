import React from 'react';
import ContentLoader from 'react-content-loader';

const DayListLoader: React.FC = () => {
  let y = 115;
  return (
    <div className='container'>
      <ContentLoader
        speed={3}
        width={970}
        height={1600}
        // viewBox='0 0 970 1600'
        style={{ width: '99.5%' }}
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
      >
        {/* control panel */}
        <rect x='5' y='10' rx='10' ry='10' width='125' height='25' />
        <rect x='170' y='10' rx='10' ry='10' width='220' height='25' />
        <rect x='830' y='10' rx='10' ry='10' width='125' height='25' />

        {/* day grid header */}
        <rect x='5' y='70' rx='10' ry='10' width='955' height='30' />
        <rect x='5' y='125' rx='10' ry='10' width='955' height='25' />

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

export default DayListLoader;
