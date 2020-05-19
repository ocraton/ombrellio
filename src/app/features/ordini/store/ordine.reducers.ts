import * as OrdineActions from './ordine.actions';
import * as fromApp from '../../../store/app.reducers';
import { Ordine } from '../ordini.model';

export interface FeatureState extends fromApp.AppState {
  ordini: State
}

export interface State {
  ordine: Ordine[],
  ordiniCount: number,
  loading: boolean,
  error: any | null;
}

const initialState: State = {
  ordine: [],
  ordiniCount: 0,
  loading: true,
  error: null
};

export function ordineReducer(state = initialState, action: OrdineActions.Ordinections) {
  switch (action.type) {
    case (OrdineActions.FETCH_ORDINI):
      return {
        ...state,
        loading: true
      };
    case (OrdineActions.FETCH_ORDINE):
      return {
        ...state,
        ordine: action,
        loading: true
      };
    case (OrdineActions.FETCH_COUNT_ORDINI):
      return {
        ...state,
        ordiniCount: action,
        loading: true
      };
    case (OrdineActions.SET_ORDINI):
      return {
        ...state,
        ordine: action.payload,
        loading: false
      };
    case (OrdineActions.SET_ORDINE):
      return {
        ...state,
        ordine: action.payload,
        loading: false
      };
    case (OrdineActions.SET_COUNT_ORDINI):
      return {
        ...state,
        ordiniCount: action.payload,
        loading: false
      };
    case (OrdineActions.UPDATE_ORDINE):
      return {
        ...state,
        // loading: true
      };
    case (OrdineActions.UPDATE_ORDINE_SUCCESS):
      return {
        ...state,
        ordine: action.payload,
        // loading: false,
        error: null
      };
    case (OrdineActions.UPDATE_ORDINE_FAIL):
      return {
        ...state,
        // loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
