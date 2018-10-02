export const formatErrorMessage = (message: string, args: string []) => {
  args.forEach((arg, index) => {
    message = message.replace(`{${index}}`, arg);
  });

  return message;
}