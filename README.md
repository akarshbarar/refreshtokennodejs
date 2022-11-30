curl --location --request POST 'localhost:5000/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"test@test.test"
}'



curl --location --request GET 'localhost:5000/protected' \
--header 'Authorization: Bearer njknjknjk'


curl --location --request POST 'localhost:5000/refresh' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "test@test.test",
    "refreshToken": "rrrrrrrrrrrrr"
}'