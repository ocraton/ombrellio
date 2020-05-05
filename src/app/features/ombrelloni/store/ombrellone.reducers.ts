import * as OmbrelloneActions from './ombrellone.actions';
import * as fromApp from '../../../store/app.reducers';
import { Ombrellone } from '../ombrelloni.model';

export interface FeatureState extends fromApp.AppState {
  ombrelloni: State
}

export interface State {
  ombrellone: Ombrellone[],
  ombrelloniCount: number,
  loading: boolean,
  error: any | null;
}

const initialState: State = {
  ombrellone: [],
  ombrelloniCount: 0,
  loading: true,
  error: null
};

export function ombrelloneReducer(state = initialState, action: OmbrelloneActions.Ombrellonections) {
  switch (action.type) {
    case (OmbrelloneActions.FETCH_OMBRELLONI):
      return {
        ...state,
        loading: true
      };
    case (OmbrelloneActions.FETCH_OMBRELLONE):
      return {
        ...state,
        ombrellone: action,
        loading: true
      };
    case (OmbrelloneActions.FETCH_COUNT_OMBRELLONI):
      return {
        ...state,
        ombrelloniCount: action,
        loading: true
      };
    case (OmbrelloneActions.SET_OMBRELLONI):
      return {
        ...state,
        ombrellone: action.payload,
        loading: false
      };
    case (OmbrelloneActions.SET_OMBRELLONE):
      return {
        ...state,
        ombrellone: action.payload,
        loading: false
      };
    case (OmbrelloneActions.SET_COUNT_OMBRELLONI):
      return {
        ...state,
        ombrelloniCount: action.payload,
        loading: false
      };
    case (OmbrelloneActions.CREATE_OMBRELLONE):
      return {
        ...state,
        loading: true
      };
    case (OmbrelloneActions.CREATE_OMBRELLONE_SUCCESS):
      return {
        ...state,
        ombrellone: action.payload,
        loading: false,
        error: null
      };
    case (OmbrelloneActions.CREATE_OMBRELLONE_FAIL):
        return {
          ...state,
          loading: false,
          error: action.payload
        };
    case (OmbrelloneActions.UPDATE_OMBRELLONE):
      return {
        ...state,
        loading: true
      };
    case (OmbrelloneActions.UPDATE_OMBRELLONE_SUCCESS):
      return {
        ...state,
        ombrellone: action.payload,
        loading: false,
        error: null
      };
    case (OmbrelloneActions.UPDATE_OMBRELLONE_FAIL):
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case (OmbrelloneActions.DELETE_OMBRELLONE_SUCCESS):
      // const oldOmbrelloni = [...state.ombrelloni.data];
      // oldOmbrelloni.map( (c, index) => {
      //     if(c.id == action.payload.toString()) {
      //       oldOmbrelloni.splice(index, 1);
      //     }
      //   }
      // )
      return {
        ...state,
        // Ombrelloni: {
        //   ...state.ombrelloni,
        //   ...state.ombrelloni.data = oldOmbrelloni
        // },
        loading: false,
        error: null
      };
    case (OmbrelloneActions.DELETE_OMBRELLONE_FAIL):
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
