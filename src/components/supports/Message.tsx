import React from 'react';
import Messages from "../../utils/messages";

interface MessageProps {
  msg: string;
  type: 'danger' | 'success' | 'warning' | 'info';
  className?: string;
}

const Message: React.FC<MessageProps> = ({ msg, type, className = '' }) => {
  const message = Messages[msg] || msg;

  return (
    <article className={`message message_${type} ${className}`}>
      <div className='message__body'>{message}</div>
    </article>
  );
};

export default Message;
