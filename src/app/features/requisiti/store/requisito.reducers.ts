import * as RequisitoActions from './requisito.actions';
import * as fromApp from '../../../store/app.reducers';
import { Requisiti } from '../requisiti.model';

export interface FeatureState extends fromApp.AppState {
  requisiti: State
}

export interface State {
  requisiti: Requisiti,
  loading: boolean,
  error: any | null;
}

const initialState: State = {
  requisiti: null,
  loading: true,
  error: null
};

export function requisitoReducer(state = initialState, action: RequisitoActions.RequisitoActions) {
  switch (action.type) {
    case (RequisitoActions.FETCH_REQUISITI):      
      return {
        ...state, 
        requisiti: action.payload,             
        loading: true
      };
    case (RequisitoActions.SET_REQUISITI):            
      return {
        ...state,
        requisiti: action.payload,
        loading: false
      };
    case (RequisitoActions.CREATE_REQUISITO):            
      return {
        ...state,        
        loading: true
      };          
    case (RequisitoActions.CREATE_REQUISITI_SUCCESS): 
      return {
        ...state,
        requisiti: action.payload,        
        loading: false,
        error: null
      }; 
    case (RequisitoActions.CREATE_REQUISITI_FAIL):       
        return {
          ...state,
          loading: false,
          error: action.payload
        };     
    case (RequisitoActions.UPDATE_REQUISITO):            
      return {
        ...state,        
        loading: true
      };           
    case (RequisitoActions.UPDATE_REQUISITI_SUCCESS): 
      return {
        ...state,
        requisiti: action.payload,        
        loading: false,
        error: null
      };    
    case (RequisitoActions.UPDATE_REQUISITI_FAIL):
      return {
        ...state,
        loading: false,
        error: action.payload
      };  
    case (RequisitoActions.DELETE_REQUISITO_SUCCESS): 
      const oldRequisiti = [...state.requisiti.data];
      oldRequisiti.map( (c, index) => {          
          if(c.id == action.payload.toString()) {            
            oldRequisiti.splice(index, 1);
          }            
        }
      )               
      return {
        ...state,
        requisiti: {
          ...state.requisiti,
          ...state.requisiti.data = oldRequisiti
        },
        loading: false,
        error: null
      };    
    case (RequisitoActions.DELETE_REQUISITO_FAIL):
      return {
        ...state,
        loading: false,
        error: action.payload
      };  
                        
    default:
      return state;
  }
}
