#!/bin/sh

mongoimport --uri YOUR_MONGO_URI --collection articles --type json --file /articles.json --jsonArray
mongoimport --uri YOUR_MONGO_URI --collection images --type json --file /images.json --jsonArray
mongoimport --uri YOUR_MONGO_URI --collection contacts --type json --file seed/contacts.json --jsonArray
mongoimport --uri YOUR_MONGO_URI --collection benefits --type json --file /benefits.json --jsonArray
mongoimport --uri YOUR_MONGO_URI --collection brands --type json --file /brands.json --jsonArray
mongoimport --uri YOUR_MONGO_URI --collection issues --type json --file /issues.json --jsonArray
mongoimport --uri YOUR_MONGO_URI --collection gadgets --type json --file /gadgets.json --jsonArray