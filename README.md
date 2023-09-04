# Store-Management

Full Stack Project Store Management

### Client Side - Typescript:

ReactJs
Redux Toolkit
Tailwind Css
Axios

### Server Side - Typescript:

NodeJs
ExpressJs
MySql

### Info Project:

in the project there is options to login, register, status check of the user with redux toolkit and authorization to pages in client side and routes to server side

### Products Page:

Summary of all Purchases.
List of products with a list of customers that purchased the products
on every click on the name of the product or the name of the customer we are transferred to the edit page.
option to add purchase for customer by button 'Add' in list customers will open form with combobox and button. in pressing the button 'save' will be added new purchase for customer.

### Customers Page:

a list of all customers, every customer have a list of the products that he purchased
when click on the name of the customer or the name of the product will redirect to the edit page
option for add purchase for customer by button 'Buy Product' will open form with combobox and button. in pressing the button 'Buy' will be added new purchase for customer.

### Purchase Page:

no completed in client side but this completed in server side.

### About Authentication and Authorization:

in server side there is a function to create a JWT Token.
on every login the JWT Token will be changed in the Database.
in server side there is a MiddleWare function that check if the Token is valid or not.

### client side

in the client side there is a login form that send the username and the password with Redux Toolkit.
if the role of the username is 'user' he can't go to edit pages and can't delete customer or product.

### Images of Project:

Login Page:
<URL>

Products Page:
<URL>

Edit Product Page:
<URL>

Customers Page:
<URL>

Edit Customer Page:
<URL>
