import bunyan from 'bunyan';
import config from 'config';
import { LoggingBunyan } from '@google-cloud/logging-bunyan';

const projectId: string = config.get('configDefault.configGoogleAuth.project_id') || '';
const loggingBunyan = new LoggingBunyan({ projectId, autoRetry: false });

export const logger = bunyan.createLogger({
  // The JSON payload of the log as it appears in Cloud Logging
  // will contain "name": "my-service"
  name: 'contact-manipulation',
  streams: [{ stream: process.stdout, level: 'info' }, loggingBunyan.stream('info')]
});

export const formatLog = (
  requestId: string,
  emailAddress: string,
  module: string,
  functionName: string,
  text: string
) => {
  return `${requestId}--${emailAddress}--${module}--${functionName}--${text}`;
};
