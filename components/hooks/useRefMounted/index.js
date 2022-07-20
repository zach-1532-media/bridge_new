import { useCallback, useEffect, useRef } from 'react';

const useRefMounted = () => {
  const isRef = useRef(false);

  useEffect(() => {
    isRef.current = true;

    return () => {
      isRef.current = false;
    };
  }, []);

  return useCallback(() => isRef.current, []);
};

export default useRefMounted;
