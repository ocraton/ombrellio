import * as MansioneActions from './mansione.actions';
import * as fromApp from '../../../store/app.reducers';
import { Mansioni } from '../mansioni.model';
import { Mansione } from '../mansione.model';

export interface FeatureState extends fromApp.AppState {
  mansioni: State
}

export interface State {
  mansioni: Mansioni,
  mansione: Mansione,
  loading: boolean,
  error: any | null;
}

const initialState: State = {
  mansioni: null,
  mansione: null,
  loading: true,
  error: null
};

export function mansioneReducer(state = initialState, action: MansioneActions.MansioneActions) {
  switch (action.type) {
    case (MansioneActions.FETCH_MANSIONI):      
      return {
        ...state, 
        mansioni: action.payload,             
        loading: true
      };
    case (MansioneActions.FETCH_MANSIONE):           
      return {
        ...state,
        mansioni: null, 
        mansione: action.payload.id_mansione,             
        loading: true
      };       
    case (MansioneActions.SET_MANSIONI):            
      return {
        ...state,
        mansioni: action.payload,
        loading: false
      };
    case (MansioneActions.SET_MANSIONE):   
      return {
        ...state,
        mansione: action.payload,
        loading: false
      };       
    case (MansioneActions.CREATE_MANSIONE):            
      return {
        ...state,        
        loading: true
      };          
    case (MansioneActions.CREATE_MANSIONI_SUCCESS): 
      return {
        ...state,
        mansioni: action.payload,        
        loading: false,
        error: null
      }; 
    case (MansioneActions.CREATE_MANSIONI_FAIL):       
        return {
          ...state,
          loading: false,
          error: action.payload
        };     
    case (MansioneActions.UPDATE_MANSIONE):            
      return {
        ...state,        
        loading: true
      };           
    case (MansioneActions.UPDATE_MANSIONI_SUCCESS): 
      return {
        ...state,
        mansioni: action.payload,        
        loading: false,
        error: null
      };    
    case (MansioneActions.UPDATE_MANSIONI_FAIL):
      return {
        ...state,
        loading: false,
        error: action.payload
      };  
    case (MansioneActions.DELETE_MANSIONE_SUCCESS): 
      const oldMansioni = [...state.mansioni.data];
      oldMansioni.map( (c, index) => {          
          if(c.id == action.payload.toString()) {            
            oldMansioni.splice(index, 1);
          }            
        }
      )               
      return {
        ...state,
        mansioni: {
          ...state.mansioni,
          ...state.mansioni.data = oldMansioni
        },
        loading: false,
        error: null
      };    
    case (MansioneActions.DELETE_MANSIONE_FAIL):
      return {
        ...state,
        loading: false,
        error: action.payload
      };  
                        
    default:
      return state;
  }
}
