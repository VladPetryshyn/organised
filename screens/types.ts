import {DrawerScreenProps} from '@react-navigation/drawer';
import {StackScreenProps} from '@react-navigation/stack';

export type NoteParams = {
  ids?: string[];
  isCreating?: boolean;
  notebook: string;
};

// Drawer
export type DrawerParamList = {
  Settings: undefined;
  DrawerNotebooks: StackScreenProps<NotesStackParamList>;
};

export type DrawerScreenP<N extends keyof DrawerParamList> = DrawerScreenProps<
  DrawerParamList,
  N
>;

// Stack
export type StackParamList = {
  Initialization: {
    setDirectory: (s: string) => void;
  };
  Authorized: undefined;
};

export type StackScreenP<N extends keyof StackParamList> = StackScreenProps<
  StackParamList,
  N
>;

// Settings
export type SettingsStackParamList = {
  Settings: undefined;
  Language: undefined;
  Styling: undefined;
};

export type SettingsStackScreenP<N extends keyof SettingsStackParamList> =
  StackScreenProps<SettingsStackParamList, N>;

// Notes
export type NotesStackParamList = {
  Notebook: {name: string};
  Notebooks: undefined;
  Note: NoteParams;
  Search: undefined;
};

export type NotesStackScreenP<N extends keyof NotesStackParamList> =
  StackScreenProps<NotesStackParamList, N>;
