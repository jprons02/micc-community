import React from 'react';
import WellnessEventRegisterForm from '../../components/forms/Health/WellnessEventRegisterForm';

const WellnessSection = () => {
  const fitnessVideos = [
    {
      title:
        'Quick Morning Stretching Routine For Flexibility, Mobility, And Stiffness!',
      src: 'https://www.youtube.com/embed/t2jel6q1GRk?si=s-nBOPwWCsnd-WUc',
    },
    {
      title: `15-Minute Beginner's At-Home Cardio Workout | Class FitSugar`,
      src: 'https://www.youtube.com/embed/VHyGqsPOUHs?si=zdfoMpHdjBv_Rcsv',
    },
    {
      title: '15 Minute Full Body Cardio Workout (No Equipment)',
      src: 'https://www.youtube.com/embed/IvmaekQfKiw?si=o-Z0DuXxhw3sjn6z',
    },
  ];

  const renderFitnessVideos = () => {
    return fitnessVideos.map((video, index) => {
      return (
        <div key={video.title} style={{ marginBottom: '40px' }}>
          <p>{video.title}</p>
          <div className="wellnessYoutubeEmbed" key={index}>
            <iframe
              width="100%"
              height="100%"
              src={video.src}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div>
        <div style={{ marginBottom: '60px' }}>
          <WellnessEventRegisterForm center={false} />
        </div>
      </div>
      <div style={{ marginBottom: '60px' }}>
        <h4 style={{ textTransform: 'uppercase' }}>Fitness Videos</h4>
        {renderFitnessVideos()}
      </div>
    </div>
  );
};

export default WellnessSection;
