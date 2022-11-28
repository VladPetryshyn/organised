import {useDispatch as dispatch} from 'react-redux';
import {Dispatch} from '../redux/mainReducer';

export const useDispatch: () => Dispatch = dispatch;
