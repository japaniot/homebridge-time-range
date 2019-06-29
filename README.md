# homebridge-time-range

Virtual switch for Homebridge, triggers when entering or leaving specified
time range of day.

## Usage

```js
"accessories": [
  {
    "accessory": "TimeRange",
    "name": "Day",
    "reverse": false,
    "start": "6:00",
    "end": "23:50"
  }
]
```

## License

[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
