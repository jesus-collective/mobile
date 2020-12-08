type WithoutKeys<T> = Omit<T, keyof T>;

export type EmptyProps = WithoutKeys<Record<string, never>>; 
export type AuthStateData = {
    fromVerified?: boolean;
    email?: string;
    joinedProduct?: string;
  }|null;