/* 
To call the function, use node bamazonCustomer.js. Every product is then listed
and the user is prompted to type in a product id. (see pic1)

Once the user chooses a product, they are then prompted to choose a quantity (see pic2).

The price of that product is added to priceArray.

Then, the quantity is pushed to an array that matches priceArray and gets 
subtracted and updated to the database

After that, the function ifFinished() is called which asks the user if he is done shopping. (pic3)

If not, the display() function is called again and things start over (pic1)

If the user is finished shopping, the total prices of the objects is shown in the array. (pic4)
