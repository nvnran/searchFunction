# SimPragma - RBAC

### Overview

This is a simple application to get data of existing Loan Details. To get the details of a particular loan account, there are different parameters that can be used to search.

- Current Face
- EMI Amount
- Disbursal Date
- Lead Source
- Lead Source Name
- Loan Amount
- Loan Name
- Maturity Date

Optional parameters of rounding up 'Current Face' and searching by Approximate date is also possible.

### Tech

Backend:

- Node Js
- Express JS

Template Engine for Frontend

- EJS

### Endpoint

In order to call the API Endpoint, any frontend technology can be used. The API accepts 4 parameters:

| Plugin              | README                |
| ------------------- | --------------------- |
| Data                | JSON Array of objects |
| Search Type         | String                |
| Search Term         | String                |
| Optional Parameters | String                |

Output is in the form of JSON Array of Objects
