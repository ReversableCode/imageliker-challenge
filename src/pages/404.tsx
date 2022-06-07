import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import Loading from '@/components/Loading';

export default function Custom404() {
  const executedRef = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (executedRef.current) return;
    executedRef.current = true;
    router.replace('/');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <Loading />;
}
