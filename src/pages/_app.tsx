import { AnimatePresence } from 'framer-motion';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import '@/styles/globals.css';

import Loading from '@/components/Loading';

import { ManagedUIContext } from '@/contexts/ui.context';

function handleExitComplete() {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0 });
  }
}

function ImageLikerApp({ Component, pageProps }: AppProps): JSX.Element {
  const [pageLoading, setPageLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);

  return (
    <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
      <ManagedUIContext>
        {pageLoading && <Loading />}
        <Component {...pageProps} key={router.route} />
      </ManagedUIContext>
    </AnimatePresence>
  );
}

export default ImageLikerApp;
