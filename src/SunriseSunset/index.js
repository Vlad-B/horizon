import { useState, useEffect, useRef } from "react";

// material-ui imports
import { Typography } from "@mui/material";

// third party imports
import moment from "moment";
import { getSunrise, getSunset } from "sunrise-sunset-js";

// assets
import { IconSunrise, IconSunset } from "../assets/Icons/Icons";

const SunriseSunset = () => {
    const [state, setState] = useState({
        latitude: null,
        longitude: null,
        sunrise: "",
        sunset: "",
    });
    const stateRef = useRef();
    stateRef.current = state;
    const { sunrise, sunset, latitude, longitude } = state;
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setState({
                ...stateRef.current,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        });
    }, []);

    useEffect(() => {
        if (latitude && longitude) {
            const sunset = getSunset(latitude, longitude);
            const sunrise = getSunrise(latitude, longitude);
            setState({
                ...stateRef.current,
                sunset: moment(sunset).format("HH:mm:ss"),
                sunrise: moment(sunrise).format("HH:mm:ss"),
            });
        }
    }, [latitude, longitude]);

    return (
        <>
            <Typography variant="h3">
                <IconSunrise sx={{ fontSize: 50, fill: "#ffd54f", px: 2 }} />
                {sunrise}
            </Typography>
            <Typography variant="h3">
                <IconSunset sx={{ fontSize: 50, fill: "#ff8f00", px: 2 }} />
                {sunset}
            </Typography>
        </>
    );
};

export default SunriseSunset;
