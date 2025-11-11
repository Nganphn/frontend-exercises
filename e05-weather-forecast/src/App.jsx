import * as React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios'
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import {
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  TextField,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Grid,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

// -------------- header --------------
function Header({view, onNavigate}) {
  return (
    <AppBar position="sticky" color="primary" elevation={0}>
        <Container maxWidth="md">
          <Toolbar disableGutters sx={{ py: 1 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ flexGrow: 1 }}>
                <CloudQueueIcon/>
                <Typography variant="h6">Weather Forecast</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Button
                  color="inherit"
                  startIcon={<HomeOutlinedIcon />}
                  onClick={() => onNavigate("home")}
                  sx={{
                    fontWeight: view === "home" ? 700 : 500,
                    textDecoration: view === "home" ? "underline" : "none",
                    textUnderlineOffset: "6px",
                  }}
                >
                  Home
                </Button>
                <Button
                  color="inherit"
                  startIcon={<FavoriteBorderOutlinedIcon />}
                  onClick={() => onNavigate("favs")}
                    sx={{
                    fontWeight: view === "favs" ? 700 : 500,
                    textDecoration: view === "favs" ? "underline" : "none",
                    textUnderlineOffset: "6px",
                  }}
                >
                  Favourites
                </Button>
              </Stack>
          </Toolbar>
        </Container>
    </AppBar>
  );
}

// -------------- search and get --------------
function SearchCityAndGetForecast({cityText, setCityText, onSubmit}) {
  return (
    <Box component="section" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1">Find the forecast</Typography>

      <Box component="form" onSubmit={onSubmit} noValidate autoComplete="off" sx={{ mt: 2 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", sm: "center" }}
        >
          <TextField
            id="city"
            label="Search with a city name"
            placeholder="e.g., Helsinki"
            variant="outlined"
            fullWidth
            value={cityText}
            onChange={(e) => setCityText(e.target.value)}
          />
          <Button type="submit" variant="contained" size="medium">Get Forecast</Button>
        </Stack>
      </Box>
    </Box>
  );
}

// -------------- forecast card --------------
function ForecastCard({cityDetails, onAdd, onRemove}) {
  const name = cityDetails?.location?.name ?? "—";
  const country = cityDetails?.location?.country ?? "—";
  const time = cityDetails?.location?.localtime ?? "—";
  const tempC = cityDetails?.current?.temp_c ?? "—";
  const feelsC = cityDetails?.current?.feelslike_c ?? "—";
  const condText = cityDetails?.current?.condition?.text ?? "—";
  const humidity = cityDetails?.current?.humidity ?? "—";
  const windMs =
    cityDetails?.current?.wind_kph != null ? (cityDetails.current.wind_kph / 3.6).toFixed(1) : "—";

  const allDays = cityDetails?.forecast?.forecastday ?? [];
  const next3 = allDays.slice(1, 4); 
  const fmt = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" });
  
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardHeader
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h6">{name}</Typography>
            <Chip label={country} size="small" />
          </Stack>
        }
        subheader={time}
      />
      <Divider />
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography variant="h3" component="div" sx={{ lineHeight: 1 }}>
              {tempC}°
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Feels like {feelsC}°
            </Typography>
          </Grid>

          <Grid item xs={12} sm>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
              <Chip label={condText} />
              <Chip label={`Humidity — ${humidity}%`} variant="outlined" />
              <Chip label={`Wind — ${windMs} m/s`} variant="outlined" />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
            <Grid container spacing={1}>
              {next3.map((d) => {
                const label = d?.date ? fmt.format(new Date(d.date)) : "—";
                const t = d?.day?.avgtemp_c ?? "—";
                return (
                  <Grid item xs={4}>
                    <Box
                      sx={{
                        p: 1.5,
                        bgcolor: "action.hover",
                        borderRadius: 2,
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        {label}
                      </Typography>
                      <Typography variant="subtitle1">{t}°</Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Save this city to favourites
        </Typography>
        <Stack direction="row" spacing={1}>
          {onRemove && (
            <Button size="small" variant="outlined" color="error" onClick={onRemove}>
              Remove
            </Button>
          )}
          {onAdd && (
            <Button size="small" variant="contained" onClick={onAdd}>
              Add
            </Button>
          )}
        </Stack>
      </CardActions>
    </Card>
  );
}

// -------------- app --------------
function App() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [cityText, setCityText] = useState("");
  const [cityDetails, setCityDetails] = useState(null);
  const [savedCities, setSavedCities] = useState([]);
  const [favForecasts, setFavForecasts] = useState([]);
  const [view, setView] = useState("home");

  // -------------- theme --------------
  const theme = createTheme({
    palette: {
      primary: { main: "#1565c0" },
      background: { default: "#f7f9fc" },
    },
    shape: { borderRadius: 12 },
    typography: {
      h4: { fontWeight: 700, letterSpacing: 0.2 },
      h6: { fontWeight: 600 },
    },
  });

  // -------------- fetch --------------
  async function fetchData(city) {
    if (!city) return;
    try {
      let response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no&days=4`)
      setCityDetails(response.data)
    } catch (error) {
    console.log(error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const text = cityText.trim()
    if (!text) return;
    setCityText(text);
    fetchData(text);
    setCityText("");
  }

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedCities")) || [];
      setSavedCities(stored);
    }, []);

  function handleAddCity(cityName) {
    if (!cityName) return;
    const updated = [...new Set([...savedCities, cityName])];
    setSavedCities(updated);
    localStorage.setItem("savedCities", JSON.stringify(updated));
  }

  function handleRemoveCity(cityName) {
    const updated = savedCities.filter(c => c !== cityName);
    setSavedCities(updated);
    localStorage.setItem("savedCities", JSON.stringify(updated));
  }

  useEffect(() => {
    const urlFor = (city) =>
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=4&aqi=no`;

    if (!savedCities.length) { setFavForecasts([]); return; }
    
    let cancelled = false;
    (async () => {
      // fetch all saved cities in parallel
      const results = await Promise.allSettled(savedCities.map(c => axios.get(urlFor(c))));
      if (cancelled) return;

      // keep only successful
      const next = results.flatMap((r, i) =>
        r.status === "fulfilled" ? [{ city: savedCities[i], data: r.value.data }] : []
      );

      setFavForecasts(next);
    })();

    return () => { cancelled = true; };
  }, [savedCities]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header view={view} onNavigate={setView}/>
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          {/* HOME */}
          {view === "home" && (
            <>
              <SearchCityAndGetForecast
                cityText={cityText}
                setCityText={setCityText}
                onSubmit={handleSubmit}
              />

              {/* only show the recent searched card */}
              {cityDetails && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" sx={{ mb: 1.5 }}>
                    Recent
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                      <ForecastCard
                        cityDetails={cityDetails}
                        onAdd={() =>
                          handleAddCity(cityDetails.location?.name)
                        }
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}
            </>
          )}

          {/* FAVOURITES */}
          {view === "favs" && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Favourites
              </Typography>
              <Grid container spacing={2}>
                {favForecasts.map(({ city, data }) => (
                  <Grid item xs={12} sm={6} md={4} key={city}>
                    <ForecastCard
                      cityDetails={data}
                      onRemove={() => handleRemoveCity(city)}
                    />
                  </Grid>
                ))}
                {!favForecasts.length && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      No favourites yet. Add a city from the search result on Home.
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
    
  );
}

export default App


// search weather forecast by city name
// can save city to local storage
// can remove city from local storage
// All stored city weather forecast will be shown when the app loads
//   or a new city is added
// Application UI is made by some React UI library
// API keys are store to .env file