import React from 'react';
import ContentLoader from 'react-content-loader';

const AdminPageLoader: React.FC = () => {
  let y = 88;
  return (
    <div className='admin'>
      <ContentLoader
        speed={3}
        width={955}
        height={900}
        // viewBox="0 0 100 100"
        style={{ width: '99.5%' }}
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
      >
				{/* title */}
				<rect x='5' y='0' rx='10' ry='10' width='125' height='25' />

				{/* table head */}
				<rect x='5' y='50' rx='10' ry='10' width='945' height='45' />
				<rect x='5' y='110' rx='10' ry='10' width='945' height='15' />

				{/* user list */}
        {Array(16)
          .fill(0)
          .map((_, idx) => {
            y += 56.3;
            return (
              <rect key={idx} x='5' y={y} rx='3' ry='3' width='945' height='25' />
            );
          })}
      </ContentLoader>
    </div>
  );
};

export default AdminPageLoader;