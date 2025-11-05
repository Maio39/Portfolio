export const navLinks = [
    {
      id: 1,
      name: 'Home',
      href: '#home',
    },
    {
      id: 2,
      name: 'MaiERP',
      href: '#erp-showcase',
    },
    {
      id: 3,
      name: 'About',
      href: '#about',
    },
    {
      id: 4,
      name: 'Work',
      href: '#work',
    },
    {
      id: 5,
      name: 'Contact',
      href: '#contact',
    },
  ];
  
  export const clientReviews = [
    {
      id: 1,
      name: 'Emily Johnson',
      position: 'Marketing Director at GreenLeaf',
      img: 'assets/review1.png',
      review:
        'Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.',
    },
    {
      id: 2,
      name: 'Mark Rogers',
      position: 'Founder of TechGear Shop',
      img: 'assets/review2.png',
      review:
        'Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional! Fantastic work.',
    },
    {
      id: 3,
      name: 'John Dohsas',
      position: 'Project Manager at UrbanTech ',
      img: 'assets/review3.png',
      review:
        'I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.',
    },
    {
      id: 4,
      name: 'Ether Smith',
      position: 'CEO of BrightStar Enterprises',
      img: 'assets/review4.png',
      review:
        'Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend backend dev are top-notch.',
    },
  ];
  
  export const myProjects = [
    {
      title: 'CyberOps Associate',
      desc: 'In this course, gear up for the Cisco Certified Cybersecurity Associate Certification and equip yourself with the essential skills needed for coveted SOC Analyst job roles across all industries.',
      subdesc:
        'You will learn how SOC teams detect and respond to security incidents. You will also explore the intricacies of security concepts, monitoring, host-based analysis, network intrusion analysis, and security policy procedures. This course seamlessly aligns with the National Initiative for Cybersecurity Education (NICE) Cybersecurity Workforce framework to support consistent language for cybersecurity education, training, and workforce development.',
      href: 'https://www.credly.com/badges/3c57aa86-476c-42bb-b843-a681c9d9dbf5/linked_in_profile',
      texture: 'textures/project/CyberopsVideo.mp4',
      logo: 'assets/cisco_logo.jpeg',
      logoStyle: {
        backgroundColor: '#13202F',
        border: '0.2px solid #17293E',
        boxShadow: '0px 0px 60px 0px #2F6DB54D',
      },
      spotlight: 'assets/spotlight2.png',
      tags: [
        {
          id: 1,
          name: 'Badge',
          path: 'assets/CyberOpsAssoc.png',
        },
      ],
    },
    {
      title: 'Deep - Cybersecurity Bootcamp',
      desc: 'Deep is the Cybersecurity Bootcamp powered by Talent Garden. Among the most innovative blended training courses around, the program combines the deep digital network of the Talent Garden network with the cybersecurity expertise of the Cybint Solution learning platform, an Israeli Ed-Tech company specializing in international military security. 13 intense but fascinating weeks of coursework will prepare you for entry-level roles in cybersecurity, a fast-growing industry with high salaries and rapid career progression.',
      subdesc:
        '',
      href: 'https://certificates.talentgarden.com/b30242d3-49db-47e3-b939-628649db6ba1',
      texture: 'textures/project/DeepVideo.mp4',
      logo: 'assets/talentGardenLogo.jpeg',
      logoStyle: {
        backgroundColor: '#2A1816',
        border: '0.2px solid #36201D',
        boxShadow: '0px 0px 60px 0px #AA3C304D',
      },
      spotlight: 'assets/spotlight1.png',
      tags: [
        {
          id: 1,
          name: 'Badge',
          path: 'assets/badgeTag.png',
        },
      ],
    },
    {
      title: 'CCNA - Introduction to Networks',
      desc: 'Build the skills you need for associate-level job roles like Network Administrator, System Administrator, or Network Engineer in this three-course series. You will also get ready to take the Cisco Certified Network Associate (CCNA) certification exam, an industry-recognized credential that validates your expertise and opens doors to exciting professional opportunities.',
      subdesc:
        'Start here with CCNA: Introduction to Networks, the first course in the series. From understanding network architectures and protocols to mastering IP addressing and Ethernet fundamentals, you\'ll develop foundational knowledge and build your networking basics. This course also includes interactive labs and real-world scenarios to help you gain practical experience in building local area networks (LANs), implementing network security measures, and configuring routers and switches.',
      href: 'https://www.credly.com/badges/88030291-c08c-4c25-8de7-591646059dd9/linked_in_profile',
      texture: 'textures/project/CcnaVideo.mp4',
      logo: 'assets/cisco_logo.jpeg',
      logoStyle: {
        backgroundColor: '#13202F',
        border: '0.2px solid #17293E',
        boxShadow: '0px 0px 60px 0px #2F6DB54D',
      },
      spotlight: 'assets/spotlight2.png',
      tags: [
        {
          id: 1,
          name: 'Badge',
          path: 'assets/badgeCCNA.png',
        },
      ],
    },
  ];
  
  export const calculateSizes = (isSmall, isMobile, isTablet) => {
    return {
      deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
      deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
      cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
      reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
      ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
      targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
    };
  };
  
  export const workExperiences = [
    {
      id: 1,
      name: 'Cloudhero',
      pos: 'Full-stack Developer',
      duration: '2023 - Present',
      title: "I develop custom projects for third-party clients from scratch, " +
              "using a range of technologies including C#, HTML, " + 
              "CSS, Javascript, SQL, NoSQL, Docker, and Kubernetes. " +
              "I actively participate in the startup phase of new projects, " +
              "conducting data analysis to determine the optimal data structure " +
              ". I collaborate with cross-functional teams to " +
              "ensure that technology solutions are aligned with " +
              "business objectives and meet customer needs. " +
              "Translated with DeepL.com (free version)",
      icon: 'assets/logoCH.jpeg',
      animation: 'victory',
    },
    {
      id: 2,
      name: 'Microsoft Cloud Developer Academy',
      pos: 'Cloud Developer',
      duration: '2022 - 2023',
      title: "This course was mainly based " +
              "on Asp.Net development. Then we covered the " +
              "c# language, databases (SQL Server, SQLite, " +
              "CosmosDB), and the azure world (Azure Portal, Azure " +
              "DevOps) and then publishing WebApps in the cloud.",
      icon: 'assets/MicrosoftLogo.png',
      animation: 'clapping',
    },
    {
      id: 3,
      name: 'Talent Garden - Cyber Security Bootcamp',
      pos: 'Cyber Security Analyst',
      duration: '2021 - 2022',
      title: "This course was based on key concepts to learn about linux " +
              "and OS, learn about digital forensics processes for analyzing " +
              "threats in digital devices, perform " +
              "cyber attacks, cyber defense practices and " +
              "vulnerability assessment, and finally gain " +
              "familiarity with the latest trends and technologies.",
      icon: 'assets/talentGardenLogo.jpeg',
      animation: 'clapping',
    },
  ];