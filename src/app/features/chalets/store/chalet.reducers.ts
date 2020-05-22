import * as ChaletActions from './chalet.actions';
import * as fromApp from '../../../store/app.reducers';
import { Chalet } from '../chalet.model';

export interface FeatureState extends fromApp.AppState {
  chalets: State
}

export interface State {
  chalet: Chalet[],
  chaletsCount: number,
  loading: boolean,
  error: any | null;
}

const initialState: State = {
  chalet: [],
  chaletsCount: 0,
  loading: true,
  error: null
};

export function chaletReducer(state = initialState, action: ChaletActions.ChaletActions) {
  switch (action.type) {
    case (ChaletActions.FETCH_CHALETS):
      return {
        ...state,
        loading: true
      };

    case (ChaletActions.SET_CHALETS):
      return {
        ...state,
        chalet: action.payload,
        loading: false
      };

    case (ChaletActions.UPDATE_CHALET):
      return {
        ...state,
        loading: true
      };
    case (ChaletActions.UPDATE_CHALET_SUCCESS): 
      return {
        ...state,
        loading: false,
        error: null
      };
    case (ChaletActions.UPDATE_CHALET_FAIL):
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
