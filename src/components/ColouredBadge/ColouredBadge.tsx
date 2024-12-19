import { memo } from 'react';
import { ColouredBadgeProps } from './ColouredBadge.types';

export const ColouredBadge: React.FC<ColouredBadgeProps> = memo(
  ({ sourceString }) => {
    const parts = sourceString.split(' ');
    const initials = parts.map((part) => {
      return Array.from(part)[0].toUpperCase();
    });

    return <div className='coloured-badge'>{initials.join('')}</div>;
  }
);
