
export const isDefined = <T>(value: T): value is NonNullable<T> => {
    return value !== null && value !== '' && value !== undefined;
  };