import { createContext, ReactNode, useContext, useState } from 'react';

export type IAlert = {
  className?: string;
  message: string;
};

export type INotifierContext = {
  alerts: IAlert[];
  addAlert: (a: IAlert) => void;
  removeAlert: (i: number) => void;
};

const notifierContext = createContext<INotifierContext>({
  alerts: [],
  addAlert: (a: IAlert) => {},
  removeAlert: (i: number) => {},
});

export function useNotifier() {
  return useContext(notifierContext);
}

export function NotifierProvider({ children }: { children: ReactNode }) {
  const notifier = useNotifierProvider();
  return (
    <notifierContext.Provider value={notifier}>
      {children}
    </notifierContext.Provider>
  );
}

function useNotifierProvider() {
  const [alerts, setAlerts] = useState<IAlert[]>([]);

  function addAlert(a: IAlert) {
    console.log(a);
    setAlerts([...alerts, a]);
  }

  function removeAlert(i: number) {
    console.log(i);
    setAlerts([...alerts.slice(0, i), ...alerts.slice(i + 1)]);
  }

  return {
    alerts,
    addAlert,
    removeAlert,
  };
}
