# Gramoday-api
This is working api in which a document is searched in MongoDB database and is updated with the new details if found else a new document is created.
The only issue here is the users array is not getting updated after updating a document but it is working fine for a new document, I tried debugging it for 1 whole day that is the reason I got a bit late in submitting this task.
For your convenience I have hosted the database on MongoDB atlas and deployed the API on heroku so you can directly test it. Below are the details of URL:
API url : https://gramodayapidemo.herokuapp.com/
Post route for adding/updating a document : https://gramodayapidemo.herokuapp.com/reports (Post request)
Get route for getting a specific doucment using ID : https://gramodayapidemo.herokuapp.com/reports/:reportId (:reportId to be replaced with actual id)
Get route for fetching all the documents in the database: https://gramodayapidemo.herokuapp.com/reports (Get request)
As of now in the database I have kept a few documents just for your convenience so you can get the id directly else you can create a post request and get the new id of the new document in response.
