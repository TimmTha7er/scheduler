import React from 'react';
import Messages from "../../utils/messages";

interface MessageProps {
  msg: string;
  type: 'danger' | 'success' | 'warning' | 'info';
}

const Message: React.FC<MessageProps> = ({ msg, type }) => {
  const message = Messages[msg] || msg;

  console.log('message', Messages[msg]);
  

  return (
    <article className={`message message_${type}`}>
      <div className='message__body'>{message}</div>
    </article>
  );
};

export default Message;
