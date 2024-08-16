import { useState, useEffect } from 'react';
import '../styles/Clock.css'

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="container-clock">
            {time.toLocaleTimeString()}
        </div>
    );
};

export default Clock;