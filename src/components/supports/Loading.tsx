import React from 'react';
import ContentLoader from 'react-content-loader';

const Loading: React.FC = () => {
  let y = 60;
  return (
    <div className='day content__day'>
      <ContentLoader
        speed={2}
        width={970}
        height={1450}
        viewBox='0 0 970 1450'
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
      >
        <rect x='0' y='0' rx='10' ry='10' width='970' height='70' />
        <rect x='0' y='75' rx='10' ry='10' width='970' height='35' />

        {Array(24)
          .fill(0)
          .map((_, idx) => {
            ;

            return (
              <rect
                key={idx}
                x='0'
                y={y += 55.5}
                rx='10'
                ry='10'
                width='970'
                height='50'
              />
            );
          })}
      </ContentLoader>
    </div>
  );
};

export default Loading;
