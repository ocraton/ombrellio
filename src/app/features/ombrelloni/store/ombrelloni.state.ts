import { Ombrellone } from '../ombrellone.model';

export default class OmbrelloniState {
  ombrelloni: Ombrellone[];
  ombrelloniCount: number;
  loading: boolean;
  deleteLoading: boolean;
  error: any | null
}

export const initializeState = (): OmbrelloniState => {
  return {
      ombrelloni: [],
      ombrelloniCount: 0,
      loading: true,
      deleteLoading: false,
      error: null
   };
};
