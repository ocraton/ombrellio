import * as AttrezzaturaActions from './attrezzatura.actions';
import * as fromApp from '../../../store/app.reducers';
import { Attrezzature } from '../attrezzature.model';

export interface FeatureState extends fromApp.AppState {
  attrezzature: State
}

export interface State {
  attrezzature: Attrezzature,
  loading: boolean,
  error: any | null;
}

const initialState: State = {
  attrezzature: null,
  loading: true,
  error: null
};

export function attrezzaturaReducer(state = initialState, action: AttrezzaturaActions.AttrezzaturaActions) {
  switch (action.type) {
    case (AttrezzaturaActions.FETCH_ATTREZZATURE):      
      return {
        ...state, 
        attrezzature: action.payload,             
        loading: true
      };
    case (AttrezzaturaActions.SET_ATTREZZATURE):            
      return {
        ...state,
        attrezzature: action.payload,
        loading: false
      };
    case (AttrezzaturaActions.CREATE_ATTREZZATURA):            
      return {
        ...state,        
        loading: true
      };          
    case (AttrezzaturaActions.CREATE_ATTREZZATURE_SUCCESS): 
      return {
        ...state,
        attrezzature: action.payload,        
        loading: false,
        error: null
      }; 
    case (AttrezzaturaActions.CREATE_ATTREZZATURE_FAIL):       
        return {
          ...state,
          loading: false,
          error: action.payload
        };     
    case (AttrezzaturaActions.UPDATE_ATTREZZATURA):            
      return {
        ...state,        
        loading: true
      };           
    case (AttrezzaturaActions.UPDATE_ATTREZZATURE_SUCCESS): 
      return {
        ...state,
        attrezzature: action.payload,        
        loading: false,
        error: null
      };    
    case (AttrezzaturaActions.UPDATE_ATTREZZATURE_FAIL):
      return {
        ...state,
        loading: false,
        error: action.payload
      };  
    case (AttrezzaturaActions.DELETE_ATTREZZATURA_SUCCESS): 
      const oldAttrezzature = [...state.attrezzature.data];
      oldAttrezzature.map( (c, index) => {          
          if(c.id == action.payload.toString()) {            
            oldAttrezzature.splice(index, 1);
          }            
        }
      )               
      return {
        ...state,
        attrezzature: {
          ...state.attrezzature,
          ...state.attrezzature.data = oldAttrezzature
        },
        loading: false,
        error: null
      };    
    case (AttrezzaturaActions.DELETE_ATTREZZATURA_FAIL):
      return {
        ...state,
        loading: false,
        error: action.payload
      };  
                        
    default:
      return state;
  }
}
