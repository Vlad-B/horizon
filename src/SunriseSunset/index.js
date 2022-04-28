import { useState, useEffect, useRef } from "react";

// material-ui imports
import {
    Paper,
    Typography,
    Stack,
    Grid,
    Card,
    CardContent,
} from "@mui/material";

// third party imports
import moment from "moment";
import axios from "axios";
import { getSunrise, getSunset } from "sunrise-sunset-js";

// assets
import { IconSunrise, IconSunset } from "../assets/Icons/Icons";

const getCityApi = (lat, long) =>
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`;

const SunriseSunset = () => {
    const [state, setState] = useState({
        latitude: null,
        longitude: null,
        sunrise: "",
        sunset: "",
        cityLocation: "",
    });
    const stateRef = useRef();
    stateRef.current = state;
    const { sunrise, sunset, latitude, longitude, cityLocation } = state;
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

            axios
                .get(getCityApi(latitude, longitude))
                .then(({ data }) =>
                    setState({
                        ...stateRef.current,
                        cityLocation: `${data.locality}, ${data.countryName}`,
                        sunset: moment(sunset).format("HH:mm"),
                        sunrise: moment(sunrise).format("HH:mm"),
                    })
                )
                .catch((err) => console.error(err));
        }
    }, [latitude, longitude]);

    return (
        <Paper
            component={Card}
            elevation={8}
            sx={{
                width: "50vw",
                height: "100%",
                ":hover": {
                    boxShadow: 16,
                },
            }}
        >
            <CardContent
                sx={{
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography>
                    Your current location is: <b>{cityLocation}</b>
                </Typography>
                <Grid
                    sx={{ m: 4, height: "100%" }}
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
