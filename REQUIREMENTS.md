# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show [token required]
- Create [token required]
- Delete [token required]

#### Users
- Index [token required]
- Show [token required]
- Create 
- Delete [token required]

#### Orders
- Index [token required]
- Show [token required]
- Create [token required]
- Delete [token required]
- addProduct [token required]
#### Dashboard
- fiveMostExpensive (to get the top 5 expensive products)
- usersWithOrders (to get the users who have made orders)
- productsInOrders (to get the products in all orders)


## Data Shapes
#### Product
-  id integer
- name string
- price number 
- category string 

#### User
- id integer
- firstName string
- lastName string 
- password string

#### Orders
- id number 
- product_id number 
- quantity of each product in the order number
- user_id number
- status of order (active or complete) string

#### Order products
- id integer,
- quantity integer,
- order_id integer,
- product_id integer 


