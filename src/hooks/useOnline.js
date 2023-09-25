import { useEffect, useState } from "react";
const useOnline = () => {
    const [online, setOnline] = useState(navigator.onLine);
    useEffect(() => {
        const isOnline = () => setOnline(true);
        const isOffline = () => setOnline(false);
        window.addEventListener("online", isOnline);
        window.addEventListener("offline", isOffline);

        return () => {
            window.removeEventListener("online", isOnline);
            window.removeEventListener("offline", isOffline);
        };
    }, []);

    return online;
};

export default useOnline;
