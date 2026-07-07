import React from 'react';
import { APPLICATION_STATUS_STYLES } from '../../constants';

export default function StatusBadge({ status }) {
  const style = APPLICATION_STATUS_STYLES[status] || APPLICATION_STATUS_STYLES.applied;
  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium capitalize ${style}`}>
      {status}
    </span>
  );
}
