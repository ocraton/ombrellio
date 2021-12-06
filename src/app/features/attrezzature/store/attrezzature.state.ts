import { Attrezzatura } from '../attrezzatura.model';

export default class AttrezzaturaState {
  attrezzatura: Attrezzatura[];
  canDelete: boolean;
  canDeleteLoading: boolean;
  loading: boolean;
  error: any | null;
}

export const initializeState = (): AttrezzaturaState => {
  return {
    attrezzatura: [],
    canDelete: false,
    canDeleteLoading: false,
    loading: true,
    error: null
   };
};
