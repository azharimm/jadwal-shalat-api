# Jadwal Shalat API

## 1. Cities
```
[ENDPOINT] /cities
```
```
[GET] http://localhost:5000/cities
```

## 1. Daily Schedule
```
[ENDPOINT] /daily
```
```
[GET] http://localhost:5000/daily?date=2021-01-06&cityId=58
```

### Query params
| params        | desc | required |
| --------------- |:---------:|:---------:|
| date | Y-m-d format | `no` default today |
| cityId | ID of the city | `no` default jakarta (+7 GMT) |

## 1. Monthly Schedule
```
[ENDPOINT] /monthly
```
```
[GET] http://localhost:5000/monthly?month=2021-01&cityId=58
```

### Query params
| params        | desc | required |
| --------------- |:---------:|:---------:|
| month | Y-m format | `no` default today |
| cityId | ID of the city | `no` default jakarta (+7 GMT) |

