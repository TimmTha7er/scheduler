import React from 'react';
import ContentLoader from 'react-content-loader';

const DayListLoader: React.FC = () => {
  let y = 200;
  return (
    <div className='container'>
      <ContentLoader
        speed={3}
        width={970}
        height={1600}
        viewBox='0 0 970 1600'
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
      >
        {/* header */}
        <rect x='15' y='10' rx='10' ry='10' width='250' height='70' />
        <rect x='850' y='10' rx='10' ry='10' width='120' height='70' />

        {/* control panel */}
        <rect x='15' y='90' rx='10' ry='10' width='125' height='55' />
        <rect x='170' y='90' rx='10' ry='10' width='220' height='55' />
        <rect x='830' y='90' rx='10' ry='10' width='140' height='55' />

        {/* day grid header */}
        <rect x='15' y='155' rx='10' ry='10' width='955' height='60' />
        <rect x='15' y='220' rx='10' ry='10' width='955' height='30' />

        {/* day grid rows */}
        {Array(24)
          .fill(0)
          .map((_, idx) => {
            y += 56.3;
            return (
              <rect
                key={idx}
                x='15'
                y={y}
                rx='3'
                ry='3'
                width='955'
                height='50'
              />
            );
          })}
      </ContentLoader>
    </div>
  );
};

export default DayListLoader;
