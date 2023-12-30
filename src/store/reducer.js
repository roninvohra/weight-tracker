// reducer.js
const initialState = {
    effectTriggered: false,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'TRIGGER_EFFECT':
        return {
          ...state,
          effectTriggered: true,
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  