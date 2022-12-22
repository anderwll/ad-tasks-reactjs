import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { User } from '../typeStore';

const usersAdapter = createEntityAdapter<User>({
  selectId: (state) => state.email,
});

export const { selectAll: searchUsers } = usersAdapter.getSelectors<RootState>((state) => state.users);

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {
    addNewUser: usersAdapter.addOne,
    attUser: usersAdapter.updateOne,
    deletUser: usersAdapter.removeOne,
  },
});

export const { addNewUser, attUser, deletUser } = usersSlice.actions;
export default usersSlice.reducer;
