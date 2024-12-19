import { memo } from 'react';
import { ColouredBadge } from '../ColouredBadge/ColouredBadge';
import { HeaderProps } from './Header.types';

export const Header: React.FC<HeaderProps> = memo(({ user }) => {
  return (
    <header>
      <ColouredBadge sourceString={user.name} />
      {user.name}
    </header>
  );
});
