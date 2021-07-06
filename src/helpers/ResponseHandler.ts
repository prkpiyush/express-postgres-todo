export const ApiResponse = (message: string, code: number, status: string, data?: any) => {
  return {
    status,
    code,
    message,
    data
  };
}