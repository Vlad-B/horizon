import { useState, useEffect, useRef } from "react";

// material-ui imports
import {
    Paper,
    Typography,
    Stack,
    Grid,
    Card,
    CardHeader,
    CardContent,
} from "@mui/material";

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
        <Paper component={Card} sx={{ width: "50vw", height: "100%" }}>
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Grid
                    sx={{ height: "100%" }}
                    container
                    justifyContent="space-around"
                    alignContent="center"
                >
                    <Grid item>
                        <Stack alignItems="center">
                            <IconSunrise
                                sx={{
                                    width: "100%",
                                    mb: 2,
                                    fontSize: 150,
                                    fill: "#ffd54f",
                                }}
                            />
                            <Typography>Sunrise time:</Typography>
                            <Typography variant="h4">{sunrise}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item>
                        <Stack alignItems="center">
                            <IconSunset
                                sx={{
                                    width: "100%",
                                    mb: 2,
                                    fontSize: 150,
                                    fill: "#ff8f00",
                                }}
                            />
                            <Typography>Sunset time:</Typography>
                            <Typography variant="h4">{sunset}</Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
        </Paper>
    );
};

export default SunriseSunset;
