// reducer.js
const initialState = {
    effectTriggered: true,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'TRIGGER_EFFECT':
        return {
          ...state,
          effectTriggered: true,
        };
    case 'RESET_EFFECT':
        return {
            ...state,
            effectTriggered: false,
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  