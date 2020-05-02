import * as AziendaActions from './azienda.actions';
import * as fromApp from '../../../store/app.reducers';
import { Azienda } from '../azienda.model';

export interface FeatureState extends fromApp.AppState {
  aziende: State
}

export interface State {
  azienda: Azienda[],
  aziendeCount: number,
  loading: boolean,
  error: any | null;
}

const initialState: State = {
  azienda: [],
  aziendeCount: 0,
  loading: true,
  error: null
};

export function aziendaReducer(state = initialState, action: AziendaActions.Aziendactions) {
  switch (action.type) {
    case (AziendaActions.FETCH_AZIENDE):
      return {
        ...state,
        loading: true
      };
    case (AziendaActions.FETCH_AZIENDA):
      return {
        ...state,
        azienda: action.payload,
        loading: true
      };
    case (AziendaActions.FETCH_COUNT_AZIENDE):
      return {
        ...state,
        aziendeCount: action,
        loading: true
      };
    case (AziendaActions.SET_AZIENDE):
      return {
        ...state,
        azienda: action.payload,
        loading: false
      };
    case (AziendaActions.SET_AZIENDA):
      return {
        ...state,
        azienda: action.payload,
        loading: false
      };
    case (AziendaActions.SET_COUNT_AZIENDE):
      return {
        ...state,
        aziendeCount: action.payload,
        loading: false
      };
    case (AziendaActions.CREATE_AZIENDA):
      return {
        ...state,
        loading: true
      };
    case (AziendaActions.CREATE_AZIENDA_SUCCESS):
      return {
        ...state,
        azienda: action.payload,
        loading: false,
        error: null
      };
    case (AziendaActions.CREATE_AZIENDA_FAIL):
        return {
          ...state,
          loading: false,
          error: action.payload
        };
    case (AziendaActions.UPDATE_AZIENDA):
      return {
        ...state,
        loading: true
      };
    case (AziendaActions.UPDATE_AZIENDE_SUCCESS):
      return {
        ...state,
        azienda: action.payload,
        loading: false,
        error: null
      };
    case (AziendaActions.UPDATE_AZIENDE_FAIL):
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case (AziendaActions.DELETE_AZIENDA_SUCCESS):
      // const oldAziende = [...state.aziende.data];
      // oldAziende.map( (c, index) => {
      //     if(c.id == action.payload.toString()) {
      //       oldAziende.splice(index, 1);
      //     }
      //   }
      // )
      return {
        ...state,
        // Aziende: {
        //   ...state.aziende,
        //   ...state.aziende.data = oldAziende
        // },
        loading: false,
        error: null
      };
    case (AziendaActions.DELETE_AZIENDA_FAIL):
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
