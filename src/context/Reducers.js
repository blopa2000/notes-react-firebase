export const initialState = {
  user: null,
  notes: [],
  selectNoteEdit: {
    nodeId: "",
    title: "",
    content: "",
  },
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

    case "SELECT_NOTE":
      return {
        ...state,
        selectNoteEdit: payload,
      };

    default:
      return state;
  }
};
