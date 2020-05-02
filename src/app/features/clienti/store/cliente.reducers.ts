import * as ClienteActions from './cliente.actions';
import * as fromApp from '../../../store/app.reducers';
import { Clienti } from '../clienti.model';

export interface FeatureState extends fromApp.AppState {
  clienti: State
}

export interface State {
  clienti: Clienti,
  loading: boolean,
  error: any | null;
}

const initialState: State = {
  clienti: null,
  loading: true,
  error: null
};

export function clienteReducer(state = initialState, action: ClienteActions.ClienteActions) {
  switch (action.type) {
    case (ClienteActions.FETCH_CLIENTI):      
      return {
        ...state, 
        clienti: action.payload,             
        loading: true
      };
    case (ClienteActions.SET_CLIENTI):            
      return {
        ...state,
        clienti: action.payload,
        loading: false
      };
    case (ClienteActions.CREATE_CLIENTE):            
      return {
        ...state,        
        loading: true
      };          
    case (ClienteActions.CREATE_CLIENTI_SUCCESS): 
      return {
        ...state,
        clienti: action.payload,        
        loading: false,
        error: null
      }; 
    case (ClienteActions.CREATE_CLIENTI_FAIL):       
        return {
          ...state,
          loading: false,
          error: action.payload
        };     
    case (ClienteActions.UPDATE_CLIENTE):            
      return {
        ...state,        
        loading: true
      };           
    case (ClienteActions.UPDATE_CLIENTI_SUCCESS): 
      return {
        ...state,
        clienti: action.payload,        
        loading: false,
        error: null
      };    
    case (ClienteActions.UPDATE_CLIENTI_FAIL):
      return {
        ...state,
        loading: false,
        error: action.payload
      };  
    case (ClienteActions.DELETE_CLIENTE_SUCCESS): 
      const oldClienti = [...state.clienti.data];
      oldClienti.map( (c, index) => {          
          if(c.id == action.payload.toString()) {            
            oldClienti.splice(index, 1);
          }            
        }
      )               
      return {
        ...state,
        clienti: {
          ...state.clienti,
          ...state.clienti.data = oldClienti
        },
        loading: false,
        error: null
      };    
    case (ClienteActions.DELETE_CLIENTE_FAIL):
      return {
        ...state,
        loading: false,
        error: action.payload
      };  
                        
    default:
      return state;
  }
}
