export const initialState = {
  user: null,
  notes: [],
};

export const Reducers = (state, { type, payload }) => {
  switch (type) {
    case "CLEAN_STATE":
      return initialState;
    /**
     * USER
     */
    case "ADD_USER":
      return {
        ...state,
        user: payload,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      };
    /**
     * NOTES
     */
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
    case "COLOR_NOTE":
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.noteId === payload.noteId) {
            return {
              ...note,
              bgColor: payload.typeColor.bgColor,
              textColor: payload.typeColor.textColor,
            };
          }
          return note;
        }),
      };
    default:
      return state;
  }
};
