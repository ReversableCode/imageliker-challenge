/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function Loading({ inside }: { inside?: boolean }) {
  return (
    <motion.div
      key='loading-page'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={clsx(
        !!inside && 'loading-overlay',
        'fixed top-0 right-0 z-50 flex h-screen w-full flex-col items-center justify-center'
      )}
      style={{ zIndex: 9999, backgroundColor: '#FFFFFFB0' }}
    >
      <div className='absolute top-0 left-0 w-full' style={{ zIndex: 9999 }}>
        <div className='progress-materializecss'>
          <div className='indeterminate'></div>
        </div>
      </div>
      <div className='login-bg absolute top-0 left-0 h-screen w-full opacity-50'></div>
      <div className='flex items-center' style={{ zIndex: 9999 }}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 100 100'
          width={230}
          height={135}
        >
          <circle
            fill='none'
            stroke='#1f2937'
            strokeWidth='6'
            strokeMiterlimit='15'
            strokeDasharray='14.2472,14.2472'
            cx='50'
            cy='50'
            r='47'
          >
            <animateTransform
              attributeName='transform'
              attributeType='XML'
              type='rotate'
              dur='5s'
              from='0 50 50'
              to='360 50 50'
              repeatCount='indefinite'
            />
          </circle>
          <circle
            fill='none'
            stroke='#1f2937'
            strokeWidth='1'
            strokeMiterlimit='10'
            strokeDasharray='10,10'
            cx='50'
            cy='50'
            r='39'
          >
            <animateTransform
              attributeName='transform'
              attributeType='XML'
              type='rotate'
              dur='5s'
              from='0 50 50'
              to='-360 50 50'
              repeatCount='indefinite'
            />
          </circle>
          <g fill='#1f2937'>
            <rect x='30' y='35' width='5' height='30'>
              <animateTransform
                attributeName='transform'
                dur='1s'
                type='translate'
                values='0 5 ; 0 -5; 0 5'
                repeatCount='indefinite'
                begin='0.1'
              />
            </rect>
            <rect x='40' y='35' width='5' height='30'>
              <animateTransform
                attributeName='transform'
                dur='1s'
                type='translate'
                values='0 5 ; 0 -5; 0 5'
                repeatCount='indefinite'
                begin='0.2'
              />
            </rect>
            <rect x='50' y='35' width='5' height='30'>
              <animateTransform
                attributeName='transform'
                dur='1s'
                type='translate'
                values='0 5 ; 0 -5; 0 5'
                repeatCount='indefinite'
                begin='0.3'
              />
            </rect>
            <rect x='60' y='35' width='5' height='30'>
              <animateTransform
                attributeName='transform'
                dur='1s'
                type='translate'
                values='0 5 ; 0 -5; 0 5'
                repeatCount='indefinite'
                begin='0.4'
              />
            </rect>
            <rect x='70' y='35' width='5' height='30'>
              <animateTransform
                attributeName='transform'
                dur='1s'
                type='translate'
                values='0 5 ; 0 -5; 0 5'
                repeatCount='indefinite'
                begin='0.5'
              />
            </rect>
          </g>
        </svg>
      </div>
      <style jsx>
        {`
          @media (max-width: 767px) {
            .loading-overlay {
              max-height: calc(100% - 5rem);
              top: 5rem;
            }
          }
          @media (min-width: 768px) {
            .loading-overlay {
              max-width: calc(100% - 16rem);
            }
          }

          .progress-materializecss {
            margin: 0;
            position: relative;
            height: 8px;
            display: block;
            width: 100%;
            background-color: #1f29373f;
            overflow: hidden;
          }
          .progress-materializecss .indeterminate {
            background: linear-gradient(45deg, #19243a, #0c111b);
          }
          .progress-materializecss .indeterminate::before {
            content: '';
            position: absolute;
            background: inherit;
            top: 0;
            left: 0;
            bottom: 0;
            will-change: left, right;
            animation: indeterminate 2.1s
              cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
          }
          .progress-materializecss .indeterminate::after {
            content: '';
            position: absolute;
            background: inherit;
            top: 0;
            left: 0;
            bottom: 0;
            will-change: left, right;
            animation: indeterminate-short 2.1s
              cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
            animation-delay: 1.15s;
          }
          @keyframes indeterminate {
            0% {
              left: -35%;
              right: 100%;
            }
            60% {
              left: 100%;
              right: -90%;
            }
            100% {
              left: 100%;
              right: -90%;
            }
          }
          @keyframes indeterminate-short {
            0% {
              left: -200%;
              right: 100%;
            }
            60% {
              left: 107%;
              right: -8%;
            }
            100% {
              left: 107%;
              right: -8%;
            }
          }
        `}
      </style>
    </motion.div>
  );
}
