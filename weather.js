/* Open-Meteo WMO codes: https://open-meteo.com/en/docs
   Try ?weatherPreview=rain (or sun, cloud, night, fog, snow, storm,
   neutral, loading, error). Previews never fetch or display live values. */
(() => {
  'use strict';

  const panel = document.querySelector('#weather');
  const summary = document.querySelector('#weather-summary');
  const updated = document.querySelector('#weather-updated');
  const refresh = document.querySelector('#weather-refresh');
  const timezone = 'Europe/Stockholm';
  const params = new URLSearchParams({
    latitude: '57.7089',
    longitude: '11.9746',
    current: 'temperature_2m,weather_code,is_day',
    daily: 'temperature_2m_max',
    timezone,
    temperature_unit: 'celsius',
    forecast_days: '1'
  });
  const endpoint = `https://api.open-meteo.com/v1/forecast?${params}`;

  function describeWeather(code, isDay) {
    if (code === 0) return ['clear', isDay === 0 ? 'night' : 'sun'];
    if (code === 1) return ['mainly clear', isDay === 0 ? 'night' : 'sun'];
    if (code === 2) return ['partly cloudy', 'cloud'];
    if (code === 3) return ['overcast', 'cloud'];
    if ([45, 48].includes(code)) return ['foggy', 'fog'];
    if ([51, 53, 55].includes(code)) return ['drizzly', 'rain'];
    if ([56, 57].includes(code)) return ['freezing drizzle', 'rain'];
    if ([61, 63, 65].includes(code)) return ['rainy', 'rain'];
    if ([66, 67].includes(code)) return ['freezing rain', 'rain'];
    if ([71, 73, 75, 77].includes(code)) return ['snowy', 'snow'];
    if ([80, 81, 82].includes(code)) return ['rain showers', 'rain'];
    if ([85, 86].includes(code)) return ['snow showers', 'snow'];
    if ([95, 96, 99].includes(code)) return ['thunderstorms', 'storm'];
    return ['condition unavailable', 'neutral'];
  }

  function showFailure() {
    panel.dataset.weather = 'neutral';
    summary.textContent = 'Weather for Göteborg is unavailable right now. Please try again.';
    updated.textContent = 'No current weather data to display.';
    refresh.textContent = 'Try again';
  }

  // A separate preview mode keeps sample artwork from being mistaken for live data.
  const preview = new URLSearchParams(window.location.search).get('weatherPreview');
  const states = ['sun', 'cloud', 'rain', 'night', 'fog', 'snow', 'storm', 'neutral', 'loading', 'error'];
  if (states.includes(preview)) {
    panel.dataset.weather = ['loading', 'error'].includes(preview) ? 'neutral' : preview;
    summary.textContent = preview === 'loading'
      ? 'Loading weather for Göteborg…'
      : preview === 'error'
        ? 'Weather for Göteborg is unavailable right now. Please try again.'
        : `Illustration preview: ${preview}.`;
    updated.textContent = 'Preview only — no live weather data. Remove weatherPreview from the URL to return to live weather.';
    return;
  }

  async function loadWeather() {
    refresh.disabled = true;
    refresh.hidden = false;
    panel.dataset.weather = 'neutral';
    summary.textContent = 'Loading weather for Göteborg…';
    updated.textContent = '';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(endpoint, { signal: controller.signal, cache: 'no-store' });
      if (!response.ok) throw new Error(`Weather request failed: ${response.status}`);
      const data = await response.json();
      const current = data.current;
      const today = new Intl.DateTimeFormat('sv-SE', {
        timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit'
      }).format(new Date());
      const dayIndex = data.daily?.time?.indexOf(today) ?? -1;
      const high = data.daily?.temperature_2m_max?.[dayIndex];

      // Missing, null, wrong-unit, or out-of-date responses must not become live values.
      if (!Number.isFinite(current?.temperature_2m) || !Number.isFinite(high) ||
          !Number.isInteger(current?.weather_code) || ![0, 1].includes(current?.is_day) ||
          typeof current?.time !== 'string' || !current.time.startsWith(`${today}T`) ||
          data.current_units?.temperature_2m !== '°C' ||
          data.daily_units?.temperature_2m_max !== '°C') {
        throw new Error('Incomplete or outdated weather response');
      }

      const [condition, state] = describeWeather(current.weather_code, current.is_day);
      const degrees = value => `${Math.round(value)}°C`;
      summary.textContent = `Right now in Göteborg: ${degrees(current.temperature_2m)}, ${condition}. Today’s forecast high is ${degrees(high)}.`;
      panel.dataset.weather = state;
      updated.textContent = `As of ${current.time.slice(11, 16)} · ${today} · Stockholm time`;
      refresh.textContent = 'Refresh weather';
    } catch {
      showFailure();
    } finally {
      clearTimeout(timeout);
      refresh.disabled = false;
    }
  }

  refresh.addEventListener('click', loadWeather);
  return loadWeather();
})();
