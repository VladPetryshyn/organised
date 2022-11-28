import {TypedUseSelectorHook, useSelector as selector} from 'react-redux';
import {RootState} from '../redux/mainReducer';

export const useSelector: TypedUseSelectorHook<RootState> = selector;
