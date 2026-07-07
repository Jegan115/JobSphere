import React from 'react';

const SIZE_CLASSES = {
  4: 'w-4 h-4',
  6: 'w-6 h-6',
  8: 'w-8 h-8',
  10: 'w-10 h-10',
  12: 'w-12 h-12'
};

export default function Loader({ size = 6 }) {
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES[6];
  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClass} border-4 border-t-transparent rounded-full animate-spin border-primary`} />
    </div>
  );
}
