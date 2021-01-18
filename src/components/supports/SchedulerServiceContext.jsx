import React, { createContext } from 'react';

const schedulerServiceContext = createContext();

const {
  Provider: SchedulerServiceProvider,
  Consumer: SchedulerServiceConsumer,
} = schedulerServiceContext;

export {
  schedulerServiceContext,
  SchedulerServiceProvider,
  SchedulerServiceConsumer,
};
