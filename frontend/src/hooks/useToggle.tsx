import { useCallback, useState } from 'react';

export const useToggle = (
  defaultActive: boolean = false
): [boolean, (active: boolean) => void] => {
  const [isActive, setIsActive] = useState<boolean>(defaultActive);

  const toggle = useCallback(
    (active) => setIsActive(typeof active === 'boolean' ? active : !isActive),
    [isActive]
  );

  return [isActive, toggle];
};
