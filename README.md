# user-api-node
Tutorials about user api
## Before 1st start the project (with docker-compose)
  - docker-compose run --rm app npm i
## Start project with docker-compose
  - docker-compose up -d
## migration
- using docker-compose
  - docker-compose exec app sh
- Create the new model
  - npx sequelize-cli model:generate --name ${model-name}
- Run migration
  - npx sequelize-cli db:migrate
- Rollback migration
  - npx sequelize-cli db:migrate:undo