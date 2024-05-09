import React from 'react';
import MentalHealthInitiative from './MentalHealthInitiative';

const initiatives = [
  {
    text: "[italic]National Mental Health Programme (NMHP)[\italic]Launched in May 2014 within the Ministry of Public Health with the support of the World Health Organization (WHO), UNICEF, and International Medical Corps (IMC), with the aim of reforming mental health care in Lebanon and providing services beyond medical treatment at the community level, in line with Human Rights and the latest evidence for best practices.",
    image: "https://cdn.pixabay.com/photo/2022/10/18/11/02/mood-7529903_640.png",
    link: "https://www.moph.gov.lb/en/Pages/6/553/the-national-mental-health-program#:~:text=The%20National%20Mental%20Health%20Programme%20(NMHP)%20was%20launched%20in%20May,beyond%20medical%20treatment%20at%20the",

  },
  {
    text: "[italic]Idraac[\italic]Aims to destigmatize mental health and provide access to high-quality and cost-effective mental health care. It is achieving this goal by providing education and making mental health care accessible. By undertaking continuous research, the Foundation is also creating effective intervention programs with its multidisciplinary team.",
    image: "https://cdn.pixabay.com/photo/2022/10/18/11/02/woman-7529904_640.png",
    link: "https://www.idraac.org/idraac/homepage",    
  },
  {
    text: "[italic]Embrace[\italic]Embrace launched as an affiliation with the Department of Psychiatry at the American University of Beirut Medical Center (AUBMC) back in 2013. As of 2017, Embrace branched out as an independent Lebanese non-governmental organisation (NGO), not affiliated with any institution. Embrace seeks to better inform the community about mental illness, break the stigma, provide support to those affected, and help foster a resilient and emotionally healthy community which cares for the mental wellbeing of its young and old",
    image: "https://cdn.pixabay.com/photo/2022/08/17/20/00/psychotherapy-7393379_640.png",
    link: "https://embracelebanon.org/Aboutus/WhoWeAre",
  },
  {
    text: "[italic]National Mental Health Strategy of Lebanon[\italic]supports evidence-based practice among professionals and provision of optimal services as well as changing peoples' attitudes towards mental health substance use. The strategy addresses mental and substance use disorders in a cost-effective, evidence-based and multidisciplinary approach with an emphasis on community involvement, continuum of care, human rights, and cultural relevance",
    image: "https://cdn.pixabay.com/photo/2022/10/18/11/02/mood-7529905_1280.png",
    link: "https://www.mhinnovation.net/resources/national-mental-health-strategy-lebanon",
  },  {
    text: "[italic]Mental Health Foundation[\italic]Based in the UK and its focus is to end mental health discrimination with people who have successfully championed their way through mental illness and want to help others. Also, they assist workplaces to encourage support of their employees and schools so that students may understand mental health better.",
    image: "https://cdn.pixabay.com/photo/2022/08/19/17/51/brain-7397412_1280.png",
    link: "https://www.mentalhealth.org.uk/about-us",
  },
];
const backgroundColors = [
  "#e8dff5", 
    "#fce1e4", 
    "#daeaf6",
    "#fcf4dd",
    "#ddedea"
];

const Initiatives = () => {
  return (
    <div className="initiatives-container" style={{ width: '100%' }}>
      <h1>Mental Health Initiatives</h1>
      {initiatives.map((initiative, index) => (
        <MentalHealthInitiative
          key={index}
          text={initiative.text}
          image={initiative.image}
          alt={initiative.text} 
          link={initiative.link}
          backgroundColor={backgroundColors[index % backgroundColors.length]}
        />
      ))}
    </div>
  );
};

export default Initiatives;
