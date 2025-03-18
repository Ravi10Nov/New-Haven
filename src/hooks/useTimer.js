import { useState, useEffect } from "react";


const useTimer = () => {
    let minutes,seconds; 

    const [time, setTime] = useState(120)

    const [intervalID, setIntervalID] = useState(null)
    const [formatedTime, setFormatedTime] = useState("")
    const hasTimerEnded = time <= 0
    const isTimerRunning = intervalID != null

    const update = () => {
        setTime(time => time - 1)
        
    }

    const setTimer = ( startTime ) => {
        setTime(startTime);
    }


    const resetTimer = (restTime) =>{
        setTime(restTime);
        setIntervalID(setInterval(update, 1000))
    }
    const startTimer = () => {
        if (!hasTimerEnded && !isTimerRunning) {
            setIntervalID(setInterval(update, 1000))
        }
    }
    const stopTimer = () => {
        clearInterval(intervalID)
        setIntervalID(null)
    }
    useEffect( () => {
        minutes = Math.floor(time / 60);
        seconds = time % 60;
        const formatedTime = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
        setFormatedTime( formatedTime)
    }, [time])
    // clear interval when the timer ends
    useEffect(() => {
        if (hasTimerEnded) {
            clearInterval(intervalID)
            setIntervalID(null)
        }
    }, [hasTimerEnded])
    // clear interval when component unmounts
    useEffect(() => () => {
        clearInterval(intervalID)
    }, [])
    

    function padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    }

    

    return {
        time,
        formatedTime,
        setTimer,
        resetTimer,
        startTimer,
        stopTimer,
    }
}

export default useTimer;