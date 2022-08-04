import React, { useEffect, useMemo, useState } from 'react'

export default function PlayAudio({ playing, setPlaying }) {
    const audio = useMemo(() => new Audio("/sounds/ring.mp3"), []);

    useEffect(() => {
        audio.currentTime = 0
        playing ? audio.play() : audio.pause();
    },
        [playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    return (
        <></>
    )
}
