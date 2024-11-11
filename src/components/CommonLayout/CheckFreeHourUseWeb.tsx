'use client';

import { addDays, isAfter, subDays } from 'date-fns';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

type IsHaveFreeDays = 'expired' | 'free' | undefined;

export default function CheckFreeHourUseWeb() {
  const router = useRouter();
  const pathname = usePathname();
  const isClient = typeof window === 'object'

  const isHaveFree: IsHaveFreeDays = React.useMemo(() => {
    if (!isClient) return undefined
    let flag: IsHaveFreeDays = undefined;

    const record = localStorage.getItem("APPLY_CODE");

    if (!record) {
      localStorage.setItem("APPLY_CODE", String(addDays(new Date(), 3)));
      flag = 'free';
    }

    if (record) {
      if (isAfter(new Date(record), new Date())) {
        flag = 'free';
      } else {
        flag = 'expired';
      }
    }

    return flag;
  }, [pathname]);

  if (isHaveFree === 'expired') {
    router.push('/expired')
  }

  return <></>;
}