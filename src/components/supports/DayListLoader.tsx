import React from 'react';
import ContentLoader from 'react-content-loader';

const DayListLoader: React.FC = () => {
  let y = -38;
  return (
    <ContentLoader
      speed={3}
      width={915}
      height={1345}
      // viewBox="0 0 100 100"
      style={{ width: '99.5%' }}
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
    >
      {Array(24)
        .fill(0)
        .map((_, idx) => {
          y += 56.3;
          return (
            <rect key={idx} x='5' y={y} rx='3' ry='3' width='915' height='25' />
          );
        })}
    </ContentLoader>
  );
};

export default DayListLoader;
