#!/bin/sh

mongoimport --uri "YOUR_MONGO_URI" --collection articles --type json --file seed/articles.json --jsonArray
mongoimport --uri "YOUR_MONGO_URI" --collection images --type json --file seed/images.json --jsonArray
mongoimport --uri "YOUR_MONGO_URI" --collection contacts --type json --file seed/contacts.json --jsonArray
mongoimport --uri "YOUR_MONGO_URI" --collection benefits --type json --file seed/benefits.json --jsonArray
mongoimport --uri "YOUR_MONGO_URI" --collection brands --type json --file seed/brands.json --jsonArray
mongoimport --uri "YOUR_MONGO_URI" --collection issues --type json --file seed/issues.json --jsonArray
mongoimport --uri "YOUR_MONGO_URI" --collection gadgets --type json --file seed/gadgets.json --jsonArray