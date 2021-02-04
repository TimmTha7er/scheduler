import React from 'react';

interface MessageProps {
  msg: string;
  type: 'danger' | 'success' | 'warning' | 'info';
}

const Message: React.FC<MessageProps> = ({ msg, type }) => {
  return (
    <article className={`message message_${type}`}>
      <div className='message__body'>{msg}</div>
    </article>
  );
};

export default Message;
