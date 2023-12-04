import pino from "pino";

const getLogFileName = () => {
  const now = new Date();
  const formattedDate = `${
    now.getMonth() + 1
  }-${now.getDate()}-${now.getFullYear()}_${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;
  return `${formattedDate}.log`;
};

const transport = pino.transport({
  targets: [
    {
      target: "pino/file",
      options: { destination: `./logs/${getLogFileName()}` },
      level: "error",
    },
    {
      target: "pino-pretty",
      options: {},
      level: "trace",
    },
  ],
});

const logger = pino(transport);

export default logger;
