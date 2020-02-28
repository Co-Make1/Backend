## [Documentation](https://documenter.getpostman.com/view/8779274/SzKYPGfZ?version=latest)

You can find the documentation for the Co-Make API [here.](https://documenter.getpostman.com/view/8779274/SzKYPGfZ?version=latest)

Api for Co-Make - the app that lets us make things better

# GET Test

https://co-make-backend.herokuapp.com/
Is the server live?

# POST Register A New User

/api/auth/register

expects an object:
Required:

- username
- email
- city
- state
- zip_code

```js
{
  "id": 1,
  "username": string,
  "email": string,
  "first_name": string,
  "last_name": string,
  "city": string,
  "state": string,
  "zip_code": integer,
  "is_admin": false
}
```

returns a 201 SUCCESS Status and the newly created user object:

```json
{
  "token": "super-secret-token",
  "user": {
    "id": 5,
    "first_name": "Betty",
    "last_name": "Woowoo",
    "username": "Pothole Patty",
    "email": "example@email.com",
    "city": "Chicago",
    "state": "Illinois",
    "zip_code": 60626,
    "is_admin": 0
  }
}
```

# POST Log In

/auth/login

Expects an Object:

Required:

- username
- password

```json
{
  "username": "username",
  "password": "password"
}
```

returns a 200 SUCCESS Status and the user object:

```json
{
  "token": "super-secret-token",
  "user": {
    "id": 1,
    "first_name": "First Name (test - user)",
    "last_name": "Last Name (test - user)",
    "username": "testUser",
    "email": "testUser@email.com",
    "city": "Chicago",
    "state": "Illinois",
    "zip_code": 60626,
    "is_admin": 0,
    "created_at": "2020-02-26 21:28:17"
  }
}
```

Returns a 401 FAILURE message when email and/or password do match records, along with the error "Invalid Credentials"

# GET Get Users

/api/users

Restricted Route, must be logged in /_and an admin - not yet added_/ to access

returns an array of user objects containing the

- is_admin is a boolean where 0 === false and 1 === true

```json
[
  {
    "id": 1,
    "username": "testUser",
    "is_admin": 0
  },
  {
    "id": 2,
    "username": "testAdmin",
    "is_admin": 1
  }
]
```

# GET Get User By ID

/api/users/1
Must be logged in and provide a valid user id

Returns

```json
{
  "id": 2,
  "first_name": "First Name (test - admin)",
  "last_name": "Last Name (test - admin)",
  "username": "testAdmin",
  "email": "testAdmin@email.com",
  "city": "Chicago",
  "state": "Illinois",
  "zip_code": 60619,
  "is_admin": 1,
  "created_at": "2020-02-27 03:27:46"
}
```

# PUT Update a User

/api/users/3

Update an existing user, must be logged in and provide an existing username

returns the updated user object

```json
{
  "id": 3,
  "first_name": "First Name (test - new user2)",
  "last_name": "Last Name (test - new user2)",
  "username": "updatedUserName",
  "email": "newUser@email.com",
  "city": "Chicago",
  "state": "Illinois",
  "zip_code": 60611,
  "is_admin": 0,
  "created_at": "2020-02-27 05:57:04"
}
```

# DEL Delete a user

/api/users/3

Must be logged in and provide a valid user id

Returns the number of records removed

```json
{
  "removed": 1
}
```

# GET Get all issues

/api/users/<user.id>/issues

Must be logged in and provide a valid user id

Returns an array of all issue objects

```json
[
  {
    "id": 1,
    "issue": "pothole",
    "issue_description": "I'm an issue description",
    "photo": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
    "hazard_level": "Severe Hazard",
    "city": "Chicago",
    "state": "Illinois",
    "zip_code": 60649,
    "upvotes": 364235,
    "user_id": 1,
    "username": "testUser",
    "created_at": "2020-02-28 02:33:46"
  },
  {
    "id": 2,
    "issue": "car crash",
    "issue_description": "I'm an issue description",
    "photo": "https://images.unsplash.com/photo-1543393716-375f47996a77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
    "hazard_level": "Low Hazard",
    "city": "Chicago",
    "state": "Illinois",
    "zip_code": 60619,
    "upvotes": 3,
    "user_id": 1,
    "username": "testUser",
    "created_at": "2020-02-28 02:33:46"
  }
]
```

# GET Get all issues for a specific user

/api/users/<user.id>/issues/user

Must be logged in and provide a valid user id

Returns an array of all issue objects posted by given user

```json
[
  {
    "id": 1,
    "issue": "pothole",
    "issue_description": "I'm an issue description",
    "photo": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
    "hazard_level": "Severe Hazard",
    "zip_code": 60649,
    "upvotes": 364235,
    "user_id": 1,
    "username": "testUser",
    "created_at": "2020-02-28 02:33:46"
  },
  {
    "id": 2,
    "issue": "car crash",
    "issue_description": "I'm an issue description",
    "photo": "https://images.unsplash.com/photo-1543393716-375f47996a77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
    "hazard_level": "Low Hazard",
    "zip_code": 60619,
    "upvotes": 3,
    "user_id": 1,
    "username": "testUser",
    "created_at": "2020-02-28 02:33:46"
  }
]
```

# GET Get an Issue by id

/api/users/<user.id>/issues/<issue.id>

Must be logged in

Required

- valid issue id
- valid user id

Returns issue object with specified id

```json
{
  "id": 2,
  "issue": "car crash",
  "issue_description": "I'm an issue description",
  "photo": "https://images.unsplash.com/photo-1543393716-375f47996a77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
  "hazard_level": "Low Hazard",
  "city": "Chicago",
  "state": "Illinois",
  "zip_code": 60619,
  "upvotes": 3,
  "user_id": 1,
  "username": "testUser",
  "created_at": "2020-02-28 02:33:46"
}
```

# POST Post a new issue

/api/users/<user.id>/issues/

Must be logged in

Must provide:

- valid user id
- issue (ex: pothole)
- issue_description
- city
- state
- zip_code
- hazard_level ( 1: Severe Hazard, 2: Moderate Hazard, 3: Low Hazard )

Returns newly created issue object

```json
{
  "id": 2,
  "issue": "Newly Created Issue",
  "issue_description": "I'm an issue description",
  "photo": "https://images.unsplash.com/photo-1543393716-375f47996a77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
  "hazard_level": "Low Hazard",
  "city": "Chicago",
  "state": "Illinois",
  "zip_code": 60619,
  "upvotes": 3,
  "user_id": 1,
  "username": "testUser",
  "created_at": "2020-02-28 02:33:46"
}
```

# PUT Update an issue

/api/users/<user.id>/issues/<issue.id>

Must be logged in

Required:

- a valid user id
- a valid issue id
- user must be original poster

Returns updated issue object

```json
{
  "id": 4,
  "issue": "I whine too much",
  "issue_description": "Actually, I'm not sure if it's the dog, or the neighbor, but either way, it needs to stop!",
  "photo": null,
  "hazard_level": "Moderate Hazard",
  "city": "Chicago",
  "state": "Illinois",
  "zip_code": 60610,
  "upvotes": null,
  "user_id": 2,
  "username": "testAdmin",
  "created_at": "2020-02-27 06:21:15"
}
```

# DEL Delete an issue

/api/users/<user.id>/issues/<issue.id>

Must be logged in

Required:

- a valid user id
- a valid issue id
- user must be original poster

Returns the number of records deleted

```json
{
  "removed": 1
}
```

# GET Get All Comments For A Given Issue

/api/users/<user.id>/issues/<issue.id>/comments

Returns an array of comments:

```json
[
  {
    "id": 1,
    "user_id": 1,
    "username": "testUser",
    "issue_id": 1,
    "issue": "pothole",
    "comment": "I'm the first comment."
  },
  {
    "id": 2,
    "user_id": 1,
    "username": "testUser",
    "issue_id": 1,
    "issue": "pothole",
    "comment": "I'm the second comment."
  },
  {
    "id": 3,
    "user_id": 1,
    "username": "testUser",
    "issue_id": 1,
    "issue": "pothole",
    "comment": "I'm the third comment."
  }
]
```

# GET Get Comment By Id

/api/users/<user.id>/issues/<issue.id>/comments/<comment.id>

Must be logged in and provide a valid comment id

Returns a single comment object

```json
{
  "id": 3,
  "user_id": 1,
  "username": "testUser",
  "issue_id": 1,
  "issue": "pothole",
  "comment": "I'm the third comment."
}
```

# POST Post a new comment

/api/users/<user.id>/issues/<issues.id>/comments/

Must be logged in

Required:

- comment body

Returns the new comment:

```json
{
  "id": 4,
  "user_id": 2,
  "username": "testAdmin",
  "issue_id": 2,
  "issue": "car crash",
  "comment": "I'm a new comment",
  "created_at": "2020-02-27 04:17:26"
}
```

# PUT Update a comment

/api/users/<user.id>/issues/<issues.id>/comments/<comment.id>

Must be logged in

Required

- valid comment id
- must be creator of comment

Returns the updated comment object

```json
{
  "id": 4,
  "user_id": 2,
  "username": "testAdmin",
  "issue_id": 2,
  "issue": "car crash",
  "comment": "I'm a newly added comment that has been updated",
  "created_at": "2020-02-27 06:04:58"
}
```

# DEL Delete a comment

/api/users/<user.id>/issues/<issues.id>/comments/<comment.id>

Must be logged in

Required

- valid comment id
- must be creator of comment

Returns the number of records removed

```json
{
  "removed": 1
}
```
