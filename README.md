### Setup
```bash
docker-compose up  # run un-detached to show debug msgs
docker ps          # run in a separate terminal to show processes
```

##### DB
Verify tables were created
```bash
docker exec -it db bash
mysql -proot
```

##### backend
Check endpoint health
```bash
docker exec -it api bash
curl 'localhost:5000/'
curl 'localhost:5000/providers/?latitude=43.4610373&longitude=-80.5325973'
```

##### frontend
Visit [https://localhost:3000](https://localhost:3000)


---
### Future Work
- finish implementing subscribe endpoint in frontend

- update
  - periodic scan: 1x daily
  - add to subscription table: providers_last_updated    TIMESTAMP
  - for user in users: email details of updated providers
  - page refresh alert UI

- auth
  - login to skip asking for email before calling subscribe endpoint

- changes for prod
  - move API_KEY to backend
  - better error handling
  - form validation
  - set Map center to center of closest / top providers on initial load
  - scale info icons with Map zoom