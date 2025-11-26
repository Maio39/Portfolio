import Globe from 'react-globe.gl'
import Button from '../components/Button.jsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  const [hasCopied, setHasCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText('marco.maier@outlook.it')
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), 2000)
  }

  return (
    <section className='c-space my-20' id='about'>
      <div className='relative mb-12'>
        <p className='head-text mb-4'>{t('about.mainTitle')}</p>
        <p className='text-xl text-white-600 max-w-3xl'>
          {t('about.mainDesc')}
        </p>
      </div>

      <div className='grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full'>
        {/* Profile */}
        <div className='col-span-1 xl:row-span-3'>
          <div className='grid-container'>
            <img
              src='assets/avatarPortfolio.png'
              alt='profile'
              className='w-full sm:h-[276px] h-fit object-contain'
            />
            <div>
              <p className='grid-headtext'>{t('about.profile.title')}</p>
              <p className='grid-subtext'>
                {t('about.profile.desc')}
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className='col-span-1 xl:row-span-3'>
          <div className='grid-container'>
            <img
              src='assets/stackTech.png'
              alt='stack'
              className='w-full sm:h-[276px] h-fit object-contain'
            />
            <div>
              <p className='grid-headtext'>{t('about.techStack.title')}</p>
              <p className='grid-subtext'>
                {t('about.techStack.desc')}
              </p>
            </div>
          </div>
        </div>

        {/* Globe / Remote work */}
        <div className='col-span-1 xl:row-span-4'>
          <div className='grid-container'>
            <div className='rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center'>
              <Globe
                height={326}
                width={326}
                backgroundColor='rgba(0,0,0,0)'
                backgroundImageOpacity={0.5}
                showAtmosphere
                showGraticules
                globeImageUrl='//unpkg.com/three-globe/example/img/earth-night.jpg'
                bumpImageUrl='//unpkg.com/three-globe/example/img/earth-topology.png'
              />
            </div>
            <div>
              <p className='grid-headtext'>{t('about.remote.title')}</p>
              <p className='grid-subtext'>
                {t('about.remote.desc')}
              </p>
              <a href='#contact' className='w-fit'>
                <Button name={t('about.contact')} isBeam containerClass='w-full mt-10' />
              </a>
            </div>
          </div>
        </div>

        {/* Passion */}
        <div className='xl:col-span-2 xl:row-span-3'>
          <div className='grid-container'>
            <img
              src='assets/grid3.png'
              alt='grid-3'
              className='w-full sm:h-[266px] h-fit object-contain'
            />
            <div>
              <p className='grid-headtext'>{t('about.passion.title')}</p>
              <p className='grid-subtext'>
                {t('about.passion.desc')}
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className='xl:col-span-1 xl:row-span-2'>
          <div className='grid-container'>
            <img
              src='assets/grid4.png'
              alt='grid-4'
              className='w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top'
            />
            <div className='space-y-2'>
              <p className='grid-subtext text-center'>{t('about.contactGrid')}</p>
              <div className='copy-container' onClick={handleCopy}>
                <img
                  src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'}
                  alt='copy'
                />
                <p className='lg:text-2xl md:text-xl font-medium text-gray_gradient text-white'>
                  marco.maier@outlook.it
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
