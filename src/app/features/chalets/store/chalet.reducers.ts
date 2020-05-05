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

export function chaletReducer(state = initialState, action: ChaletActions.Chaletctions) {
  switch (action.type) {
    case (ChaletActions.FETCH_CHALETS):
      return {
        ...state,
        loading: true
      };
    case (ChaletActions.FETCH_CHALET):
      return {
        ...state,
        chalet: action,
        loading: true
      };
    case (ChaletActions.FETCH_COUNT_CHALETS):
      return {
        ...state,
        chaletsCount: action,
        loading: true
      };
    case (ChaletActions.SET_CHALETS):
      return {
        ...state,
        chalet: action.payload,
        loading: false
      };
    case (ChaletActions.SET_CHALET):
      return {
        ...state,
        chalet: action.payload,
        loading: false
      };
    case (ChaletActions.SET_COUNT_CHALETS):
      return {
        ...state,
        chaletsCount: action.payload,
        loading: false
      };
    case (ChaletActions.CREATE_CHALET):
      return {
        ...state,
        loading: true
      };
    case (ChaletActions.CREATE_CHALET_SUCCESS):
      return {
        ...state,
        chalet: action.payload,
        loading: false,
        error: null
      };
    case (ChaletActions.CREATE_CHALET_FAIL):
        return {
          ...state,
          loading: false,
          error: action.payload
        };
    case (ChaletActions.UPDATE_CHALET):
      return {
        ...state,
        loading: true
      };
    case (ChaletActions.UPDATE_CHALET_SUCCESS):
      return {
        ...state,
        chalet: action.payload,
        loading: false,
        error: null
      };
    case (ChaletActions.UPDATE_CHALET_FAIL):
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case (ChaletActions.DELETE_CHALET_SUCCESS):
      // const oldChalets = [...state.chalets.data];
      // oldChalets.map( (c, index) => {
      //     if(c.id == action.payload.toString()) {
      //       oldChalets.splice(index, 1);
      //     }
      //   }
      // )
      return {
        ...state,
        // Chalets: {
        //   ...state.chalets,
        //   ...state.chalets.data = oldChalets
        // },
        loading: false,
        error: null
      };
    case (ChaletActions.DELETE_CHALET_FAIL):
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
