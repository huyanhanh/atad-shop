import React, { useState, useEffect, useRef } from 'react'

import Grid from '../Grid/Grid'

const Clock = () => {
    const [days, setDays] = useState()
    const [hours, setHours] = useState()
    const [minutes, setMinutes] = useState()
    const [seconds, setSeconds] = useState()

    const interval = useRef()

    useEffect(() => {
        const destination = new Date('Oct 29, 2022').getTime()
        interval.current = setInterval(() => {
            const now = new Date().getTime()
            const different = destination - now
            const days = Math.floor(different / (1000 * 60 * 60 * 24))
            const hours = Math.floor(different % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
            const minutes = Math.floor(different % (1000 * 60 * 60) / (1000 * 60))
            const seconds = Math.floor(different % (1000 * 60) / 1000)

            if (destination < 0) {
                clearInterval(interval.current)
            } else {
                setDays(days)
                setHours(hours)
                setMinutes(minutes)
                setSeconds(seconds)
            }
        })
    }, [])

    return (
        <div className='clock__wrapper'>
            <Grid col={7} mdCol={7} smCol={7} gap={20}>
                <div className='clock__data'>
                    <h3>{days}</h3>
                    <h4>Days</h4>
                </div>
                <span className='clock__distance'>:</span>

                <div className='clock__data'>
                    <h3>{hours}</h3>
                    <h4>Hours</h4>
                </div>
                <span className='clock__distance'>:</span>

                <div className='clock__data'>
                    <h3>{minutes}</h3>
                    <h4>Minutes</h4>
                </div>
                <span className='clock__distance'>:</span>

                <div className='clock__data'>
                    <h3>{seconds}</h3>
                    <h4>Seconds</h4>
                </div>
            </Grid>
        </div>
    )
}

export default Clock