/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Loading from '@/components/Loading';
import Topbar from '@/components/Topbar';

import { useUI } from '@/contexts/ui.context';

interface LayoutProps {
  children: React.ReactNode;
}

export default function DefaultLayout({ children }: LayoutProps) {
  const router = useRouter();
  const { dataLoaded, isAuthorized, getUserData } = useUI();

  const [showLoading, setShowLoading] = useState(
    dataLoaded && isAuthorized && !!getUserData() ? false : true
  );

  useEffect(() => {
    if (dataLoaded) {
      if (isAuthorized && !!getUserData())
        setTimeout(() => setShowLoading(false), 1000);
      else router.replace('/auth/login');
    }
  }, [isAuthorized, dataLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  if (showLoading)
    return (
      <article className='w-full'>
        <Loading />
      </article>
    );

  return (
    <motion.div
      initial='initial'
      animate='animate'
      exit={{ opacity: 0 }}
      className='relative flex min-h-screen w-full bg-white text-gray-800 antialiased'
    >
      <div className='flex-no-wrap relative flex w-full justify-between bg-gray-100'>
        <div className='z-10 flex min-h-screen w-full flex-col'>
          <Topbar />
          <main className='mx-auto w-full px-2 sm:px-6 lg:px-8'>
            <div className='h-12 w-full' />
            {children}
            <div className='h-12 w-full' />
          </main>
        </div>
      </div>
    </motion.div>
  );
}
