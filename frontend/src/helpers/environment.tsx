export const getEnvironementVariable = (variable: string) => {
    return (process.env[variable] as string);
} 