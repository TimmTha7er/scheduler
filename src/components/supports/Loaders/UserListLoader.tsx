import React from 'react';
import ContentLoader from 'react-content-loader';

const UserListLoader: React.FC = () => {
  let y = -38;
  let y1 = -38;
  let y2 = -38;
  return (
    <tbody className='user-list__body'>
      <tr>
        <td>
          <ContentLoader
            speed={3}
            width={175}
            height={900}
            // viewBox="0 0 100 100"
            style={{ width: '99.5%' }}
            backgroundColor='#f3f3f3'
            foregroundColor='#ecebeb'
          >
            {Array(16)
              .fill(0)
              .map((_, idx) => {
                y += 56.3;
                return (
                  <rect key={idx} x='5' y={y} rx='3' ry='3' width='165' height='25' />
                );
              })}
          </ContentLoader>
        </td>
        <td>
        <ContentLoader
            speed={3}
            width={395}
            height={900}
            // viewBox="0 0 100 100"
            style={{ width: '99.5%' }}
            backgroundColor='#f3f3f3'
            foregroundColor='#ecebeb'
          >
            {Array(16)
              .fill(0)
              .map((_, idx) => {
                y1 += 56.3;
                return (
                  <rect key={idx} x='5' y={y1} rx='3' ry='3' width='375' height='25' />
                );
              })}
          </ContentLoader>
        </td>
        <td>
        <ContentLoader
            speed={3}
            width={350}
            height={900}
            // viewBox="0 0 100 100"
            style={{ width: '99.5%' }}
            backgroundColor='#f3f3f3'
            foregroundColor='#ecebeb'
          >
            {Array(16)
              .fill(0)
              .map((_, idx) => {
                y2 += 56.3;
                return (
                  <rect key={idx} x='5' y={y2} rx='3' ry='3' width='350' height='25' />
                );
              })}
          </ContentLoader>
        </td>
      </tr>
    </tbody>
  );
};

export default UserListLoader;