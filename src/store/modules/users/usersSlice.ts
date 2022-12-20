import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../typeStore';

const initialState: User[] = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser(state, action: PayloadAction<User>) {
      return [...state, action.payload];
    },
    attUser(state, action: PayloadAction<User>) {
      const indexUser = state.findIndex((user) => user.email === action.payload.email);

      if(indexUser >= 0) {
        const listAtt = [...state];

        listAtt[indexUser] = action.payload;

        return listAtt;

      } else {
        return state;

      }
    },
    deletUser(state, action: PayloadAction<User>) {
      const indexUser = state.findIndex((user) => user.email === action.payload.email);

      if(indexUser >= 0) {
        const listAtt = [...state];

        listAtt.splice(indexUser, 1);

        return listAtt;

      } else {
        return state;
        
      }
    },
  },
});

export const { addNewUser, attUser, deletUser } = usersSlice.actions;
export default usersSlice.reducer;
