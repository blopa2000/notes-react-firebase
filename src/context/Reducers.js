export const initialState = {
  user: null,
  notes: [],
};

export const Reducers = (state, { type, payload }) => {
  switch (type) {
    case "ADD_USER":
      return {
        ...state,
        user: payload,
      };
    case "DELETE_USER":
      return {
        ...state,
        user: null,
      };
    case "GET_NOTES":
      return {
        ...state,
        notes: payload,
      };
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note.noteId !== payload),
      };
    default:
      return state;
  }
};
