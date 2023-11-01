import React, { createContext, useState, useContext, ReactNode } from "react";
import { PostPayload, Notification } from '../models/index';

type GlobalProviderProps = {
    children: ReactNode; // ReactNode acepta elementos JSX, null y otros tipos válidos para children.
  };
type GlobalContextState = {
  notification: Notification;
  postList: PostPayload[];
  editObj: PostPayload;
  isOpen: boolean;
};

type GlobalContextActions = {
  setNotification: (notification: Notification) => void;
  setPostList: (postList: PostPayload[]) => void;
  setEditObj: (editObj: PostPayload) => void;
  setIsOpen: (isOpen: boolean) => void;
};

// El contexto tendrá tanto estado como acciones
type GlobalContextType = GlobalContextState & GlobalContextActions;

// Crea el contexto con valores por defecto
export const GlobalContext = createContext<GlobalContextType>({
  notification: { msg: "", color: "" },
  postList: [],
  editObj: { userId: 0, title: "", body: "", id: 0 },
  isOpen: false,
  setNotification: () => {},
  setPostList: () => {},
  setEditObj: () => {},
  setIsOpen: () => {},
});

// Hook personalizado para usar el contexto global
export const useGlobalContext = () => useContext(GlobalContext);

// Proveedor del contexto que envuelve la aplicación
export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [notification, setNotification] = useState<Notification>({ msg: "", color: "" });
  const [postList, setPostList] = useState<PostPayload[]>([]);
  const [editObj, setEditObj] = useState<PostPayload>({ userId: 0, title: "", body: "", id: 0 });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const state: GlobalContextState = {
    notification,
    postList,
    editObj,
    isOpen,
  };

  const actions: GlobalContextActions = {
    setNotification,
    setPostList,
    setEditObj,
    setIsOpen,
  };

  return (
    <GlobalContext.Provider value={{ ...state, ...actions }}>
      {children}
    </GlobalContext.Provider>
  );
};
