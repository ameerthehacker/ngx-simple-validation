export const formatErrorMessage = (message: string, args: string []) => {
  console.log(message, args);
  args.forEach((arg, index) => {
    message = message.replace(`{${index}}`, arg);
  });

  return message;
}