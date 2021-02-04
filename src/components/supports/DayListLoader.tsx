import React from 'react';
import ContentLoader from 'react-content-loader';

const DayListLoader: React.FC = () => {
  let y = -53;
  return (
    // <div className='day content__day'>
    <ContentLoader
      speed={3}
      width={915}
      height={1345}
      viewBox='0 0 915 1345'
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
    >
      {/* <rect x='0' y='0' rx='10' ry='10' width='915' height='70' />
        <rect x='0' y='75' rx='10' ry='10' width='915' height='35' /> */}

      {Array(24)
        .fill(0)
        .map((_, idx) => {
          y += 56.3;
          return (
            <rect
              key={idx}
              x='0'
              y={y}
              rx='3'
              ry='3'
              width='915'
              height='50'
            />
          );
        })}
    </ContentLoader>
    // </div>
  );
};

export default DayListLoader;
