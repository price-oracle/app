export const getMessageFromError = (error: any): string => {
  return error?.message || error || '';
};

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface IStatus {
  error?: any;
  loading?: boolean;
}

export const createStatus = ({ loading, error }: IStatus = {}): IStatus => ({
  loading: loading || false,
  error: error?.stack || error?.message || error || '',
});

export const getEnumNumberValues = (e: any): number[] =>
  Object.values(e).filter((x) => typeof x === 'number') as number[];

export const getEnumStringValues = (e: any): string[] =>
  Object.values(e).filter((x) => typeof x === 'string') as string[];

export const toLC = (str?: string) => (str || '').toLowerCase();
