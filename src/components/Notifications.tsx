import { IAlert, useNotifier } from '../hooks/Notifier';
import classes from './Notifications.module.css';

export function Alert({
  alert,
  onRemove
}: {
  alert: IAlert;
  onRemove: () => void;
}) {
  const className = `${classes.alert} ${
    alert.className ? classes[alert.className] : ''
  }`;
  return (
    <div className={className}>
      <span>{alert.message}</span>
      <button onClick={onRemove}>X</button>
    </div>
  );
}

export function Notifications() {
  const notifier = useNotifier();

  return (
    <div className={classes.notifications}>
      {notifier.alerts.slice(0, 5).map((alert, i) => (
        <Alert
          alert={alert}
          key={i}
          onRemove={() => {
            notifier.removeAlert(i);
          }}
        />
      ))}
    </div>
  );
}
