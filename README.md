# pocketsupers-frontend
React.js app to search for your favourite superhero

Try the AWS Amplify deployed version:
https://main.d1pm5d65zkbq9n.amplifyapp.com/

To run locally:
 - clone this app
 - npm install
 - npm start

Assumptions:
  - cannot add more than one superhero (id) of a kind to the collection
  - assumes cartoon image is available (or else looks bad)
  - stats can be changed to any number, including negative, decimal or over 100
  - can vary stats from search list, then add to collection
  - or can vary stats then save for a hero already in collection

Issues:
  - initial API calls are happening twice still, despite useEffect set to run once
  - no mobile responsive view as yet
