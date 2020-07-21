import { Chalet } from '../chalet.model';

export default class ChaletState {
  chalet: Chalet[];
  chaletsCount: number;
  loading: boolean;
  error: any | null
}

export const initializeState = (): ChaletState => {
  return {
      chalet: [],
      chaletsCount: 0,
      loading: true,
      error: null
   };
};
