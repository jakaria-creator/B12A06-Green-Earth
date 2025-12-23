1) Difference between var, let, and const:

Var: var is function-scoped and can be re-declared and updated. It is hoisted and initialized with undefined, which may cause unexpected behavior.
Let: let is block-scoped and can be updated but cannot be re-declared in the same scope. It is hoisted but not initialized.
Const: const is also block-scoped but cannot be re-declared or updated. The value must be assigned at declaration time.

2) Difference between map(), forEach(), and filter():

map() creates a new array by applying a function to each element of the original array.
forEach() executes a function for each element of the array but does not return a new array.
filter() creates a new array containing only the elements that satisfy a given condition.

3) Arrow functions in ES6:
Arrow functions are a shorter syntax for writing functions in JavaScript. They use the => symbol and do not have their own this keyword. This makes them useful for callbacks and cleaner code.

4) Destructuring assignment in ES6:
Destructuring assignment allows extracting values from arrays or properties from objects into separate variables using a simple syntax. It makes the code more readable and reduces the need for multiple assignments.

5) Template literals in ES6:
Template literals are strings written using backticks (`). They allow embedding variables and expressions using ${} and support multi-line strings. Unlike string concatenation, template literals make the code easier to read and write.