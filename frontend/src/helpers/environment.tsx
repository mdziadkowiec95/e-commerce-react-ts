export const getEnvironementVariable = (variable: string) => {
  console.log(process.env.NODE_ENV);

  return process.env[variable] as string;
};
