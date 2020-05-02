import * as RisorsaumanaActions from './risorsaumana.actions';
import * as fromApp from '../../../store/app.reducers';
import { Risorseumane } from '../risorseumane.model';

export interface FeatureState extends fromApp.AppState {
  risorseumane: State
}

export interface State {
  risorseumane: Risorseumane,
  loading: boolean,
  error: any | null;
}

const initialState: State = {
  risorseumane: null,
  loading: true,
  error: null
};

export function risorseumaneReducer(state = initialState, action: RisorsaumanaActions.RisorsaumanaActions) {
  switch (action.type) {
    case (RisorsaumanaActions.FETCH_RISORSEUMANE):      
      return {
        ...state, 
        risorseumane: action.payload,             
        loading: true
      };
    case (RisorsaumanaActions.SET_RISORSEUMANE):            
      return {
        ...state,
        risorseumane: action.payload,
        loading: false
      };
    case (RisorsaumanaActions.CREATE_RISORSAUMANA):            
      return {
        ...state,        
        loading: true
      };          
    case (RisorsaumanaActions.CREATE_RISORSEUMANE_SUCCESS): 
      return {
        ...state,
        risorseumane: action.payload,        
        loading: false,
        error: null
      }; 
    case (RisorsaumanaActions.CREATE_RISORSEUMANE_FAIL):       
        return {
          ...state,
          loading: false,
          error: action.payload
        };     
    case (RisorsaumanaActions.UPDATE_RISORSAUMANA):            
      return {
        ...state,        
        loading: true
      };           
    case (RisorsaumanaActions.UPDATE_RISORSEUMANE_SUCCESS): 
      return {
        ...state,
        risorseumane: action.payload,        
        loading: false,
        error: null
      };    
    case (RisorsaumanaActions.UPDATE_RISORSEUMANE_FAIL):
      return {
        ...state,
        loading: false,
        error: action.payload
      };  
    case (RisorsaumanaActions.DELETE_RISORSAUMANA_SUCCESS): 
      const oldRisorseumane = [...state.risorseumane.data];
      oldRisorseumane.map( (c, index) => {          
          if(c.id == action.payload.toString()) {            
            oldRisorseumane.splice(index, 1);
          }            
        }
      )               
      return {
        ...state,
        risorseumane: {
          ...state.risorseumane,
          ...state.risorseumane.data = oldRisorseumane
        },
        loading: false,
        error: null
      };    
    case (RisorsaumanaActions.DELETE_RISORSAUMANA_FAIL):
      return {
        ...state,
        loading: false,
        error: action.payload
      };                      
    default:
      return state;
  }
}
