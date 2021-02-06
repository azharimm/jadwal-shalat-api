# Jadwal Shalat API

## 1. Cities
```
[ENDPOINT] /cities
```
```
[GET] https://jadwal-shalat-api.herokuapp.com/cities
```

## 2. Daily Schedule
```
[ENDPOINT] /daily
```
```
[GET] https://jadwal-shalat-api.herokuapp.com/daily?date=2021-01-06&cityId=58
```

### Query params
| params        | desc | required |
| --------------- |:---------:|:---------:|
| date | Y-m-d format | `no` default today |
| cityId | ID of the city | `no` default jakarta (+7 GMT) |

## 3. Monthly Schedule
```
[ENDPOINT] /monthly
```
```
[GET] https://jadwal-shalat-api.herokuapp.com/monthly?month=2021-01&cityId=58
```

### Query params
| params        | desc | required |
| --------------- |:---------:|:---------:|
| month | Y-m format | `no` default today |
| cityId | ID of the city | `no` default jakarta (+7 GMT) |

