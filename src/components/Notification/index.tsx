import React, { useEffect,useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";

const NotificationComponent: React.FC = () => {
  const { notification, setNotification } = useGlobalContext();
  const [toastShow, setToastShow] = useState(false);

  useEffect(() => {
    if (notification.msg) {
      setToastShow(true); // Muestra la notificación
      const timer = setTimeout(() => {
        setToastShow(false); // Oculta la notificación después de 1.5 segundos
        setNotification({ msg: "", color: "" }); // Limpia la notificación global
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [notification, setNotification]);

  // No renderiza nada si no hay mensaje
  if (!notification.msg) return null;
  
  const hideToast = () => {
    setToastShow(false); // Oculta la notificación
    setNotification({ msg: "", color: "" }); // Limpia la notificación global
  };

  return (
    <div
    className={`toast border-none ${toastShow ? 'show' : 'hide'} ${notification.color} text-white align-items-center position-absolute top-0 end-0 m-4`}
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    >
      <div className="d-flex">
        <div className="toast-body">{notification.msg}</div>
        <button
          type="button"
          className="btn-close me-2 m-auto"
          aria-label="Close"
          onClick={() => setNotification({ msg: "", color: "" })}
        ></button>
      </div>
    </div>
  );
};

export default NotificationComponent;
