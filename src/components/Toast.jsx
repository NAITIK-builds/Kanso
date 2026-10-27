import React from 'react';
import { useKanso } from '../context/KansoContext';
import {
  IconCheck,
  IconSparkle,
  IconBed,
  IconKey,
  IconStar,
  IconTicket,
  IconHouse,
  IconHeart,
  IconAlert
} from './Icons';

export default function Toast() {
  const { toast } = useKanso();

  if (!toast.show) return null;

  const renderIcon = () => {
    if (React.isValidElement(toast.symbol)) return toast.symbol;
    switch (toast.symbol) {
      case 'check':
        return <IconCheck size={16} />;
      case 'sparkle':
        return <IconSparkle size={16} />;
      case 'bed':
        return <IconBed size={16} />;
      case 'key':
        return <IconKey size={16} />;
      case 'star':
        return <IconStar size={16} fill="currentColor" />;
      case 'ticket':
        return <IconTicket size={16} />;
      case 'house':
        return <IconHouse size={16} />;
      case 'heart':
        return <IconHeart size={16} fill="currentColor" />;
      case 'alert':
        return <IconAlert size={16} />;
      default:
        return <IconSparkle size={16} />;
    }
  };

  return (
    <div className="toast-notification">
      <span className="toast-symbol" style={{ display: 'inline-flex', alignItems: 'center' }}>
        {renderIcon()}
      </span>
      <span className="toast-message">{toast.message}</span>
    </div>
  );
}
