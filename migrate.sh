#!/bin/sh

# This script is used to migrate the database from one server to another.
NODE_ENV=develpment npx sequelize "$@"