import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, User } from '../typeStore';

const initialState: User = {
  name: '',
  email: '',
  password: '',
  darkMode: false,
  tasks: []
};

const userLoggedSlice = createSlice({
  name: 'userLogged',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      return state = action.payload
    },

    addTask(state, action: PayloadAction<Task>) {
        const listAtt = [...state.tasks, action.payload];

        state.tasks = listAtt;
        
        return state
    },

    editTask(state, action: PayloadAction<Task>) {
        const indexTask = state.tasks.findIndex((task) => task.id === action.payload.id);

        if(indexTask >= 0) {
          const listTemp = state.tasks;

          listTemp[indexTask] = action.payload

          state.tasks = listTemp

          return state
        }
    },

    deletTask(state, action: PayloadAction<Task>) {
        const indexTask = state.tasks.findIndex((task) => task.id === action.payload.id);

        if(indexTask >= 0) {
          const listTemp = state.tasks;

          listTemp.splice(indexTask, 1);

          state.tasks = listTemp

          return state
        }
    },

    deletAllTask(state) {
      state.tasks = [];
   },

    editAccount(state, action: PayloadAction<User>) {
      return state = action.payload
      
    },

    logout() {
        return initialState;
    },
  },
});

export const { login, addTask, editTask, deletTask, deletAllTask, editAccount, logout } = userLoggedSlice.actions;
export default userLoggedSlice.reducer;
