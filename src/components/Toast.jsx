import React from 'react';
import { useKanso } from '../context/KansoContext';

export default function Toast() {
  const { toast } = useKanso();

  if (!toast.show) return null;

  return (
    <div className="toast-notification">
      <span className="toast-symbol">{toast.symbol || '✦'}</span>
      <span className="toast-message">{toast.message}</span>
    </div>
  );
}
