import React from 'react';
import ContentLoader from 'react-content-loader';

const EventListLoader: React.FC = () => {
  let y = -155;
  return (
		<div className="schedule-range__day-list">
			<ContentLoader
				speed={3}
				width={970}
				height={900}
				// viewBox='0 0 970 1600'
				style={{ width: '99.5%' }}
				backgroundColor='#f3f3f3'
				foregroundColor='#ecebeb'
			>
				{/* event list */}
				{Array(4)
					.fill(0)
					.map((_, idx) => {
						y += 200;
						return (
							<React.Fragment key={idx}>
								<rect x='35' y={y} rx='10' ry='10' width='695' height='30' />
								<rect x='215' y={y + 45} rx='10' ry='10' width='515' height='30' />
								<rect x='215' y={y + 90} rx='10' ry='10' width='515' height='30' />
								<rect x='215' y={y + 135} rx='10' ry='10' width='515' height='30' />
							</React.Fragment>
						);
					})}
			</ContentLoader>
		</div>
  );
};

export default EventListLoader;
