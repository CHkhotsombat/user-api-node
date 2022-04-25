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
  - npx sequelize-cli model:generate --name ${model-name} --attributes ${column-name}:${type}
  - OR
  - node node_modules/.bin/sequelize model:generate --name ${model-name} --attributes ${column-name}:${type}
  - # example
    - npx sequelize-cli model:generate --name Admin --attributes firstName:string,lastName:string
    - OR
    - node node_modules/.bin/sequelize model:generate --name Admin --attributes firstName:string,lastName:string
- Add common migration file
  - npx sequlize-cli migration:create --name add-column-to-admins
  - OR
  - node node_modules/.bin/sequelize migration:create --name ${migration-name} 
- Run migration
  - npx sequelize-cli db:migrate
  - OR
  - node node_modules/.bin/sequelize db:migrate
- Rollback migration
  - npx sequelize-cli db:migrate:undo
  - OR
  - node node_modules/.bin/sequelize db:migrate:undo
- Run seed
  - node node_modules/.bin/sequelize db:seed:all
- Run undo seed
  - node node_modules/.bin/sequelize db:seed:undo:all