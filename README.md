# HomeServeNowREST

This is a simple REST API that stores tradesmen and creates a job with tradesmens nearby.


### Instructions


npm i
   

npm run start

### Thought process

I built three different endpoints to conduct the task:

* Creates a job with the 3 tradesmen who are the closest.

    `router.post('/jobs', controllers.jobs.create)`

* Gets all the jobs that are created

    `router.get('/jobs', controllers.jobs.readAll)`

* Combines the jobs from the mocky.io api with tradesmen location   
    (API: https://run.mocky.io/v3/d27b910a-4fcc-4ff6-ba34-717f9834105d)

    `router.get('/jobsTrade', controllers.jobs.getJobClaimsWithNearByTradesmen)`

I used postman to test and use endpoints.

### Issues Faced

1) When creating a job with a tradesmen, should I try to save it, it overrides the previous entry. This does not happen when you just create a job. You do get the following response:

EXAMPLE:
 INPUT:
 ```
    {
        "id": 27,
        "name": "Heating is out",
        "location": {
          "lat": 97.988574,
          "long": -18.4179324 
        }
    }
 ```

 OUTPUT:
 ```
 {
    "id": 27,
    "name": "Heating is out",
    "location": {
        "lat": 97.988574,
        "long": -18.4179324
    },
    "closestTradesmen": [
        {
            "id": 3,
            "name": "Billy Bob",
            "distance": 79.7864439481579
        },
        {
            "id": 1,
            "name": "Shelly Smith",
            "distance": 112.69871339105873
        },
        {
            "id": 2,
            "name": "Harry Potter",
            "distance": 373.45231080881587
        }
    ]
}
 ```

2) Because of issue number one I am not able to search by tradesman ID throught the jobs created. But should I have gotten that to save, I would have mapped over the array of jobs with tradesmen, then use .includes to find jobs with tradesmen ID in question.

3) I created this `/jobsTrade'` Orginially thinking I needed return an array with all tradesmen and nearest jobs. I think I may have over complicated the situation but I wanted to run it by you to get your thoughts as I wasnt sure how to incorporate the api.