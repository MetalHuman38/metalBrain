export interface IErrorhandler extends Error {
  status?: number;
  message: string;
}
