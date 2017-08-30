/* Simple function to shift a set 
 * of random numbers into a continuous range.
 * Very useful for changing integer ID's to
 * a numbered list starting at 1.
 * Expects the list to be ordered A-Z!
 */
function Remap (input) {  
  var id = 1;
  var curr = input[0];
  input[0] = id;
  for (var i = 1; i < input.length; i++) {
    if (input[i] > curr)
      id++;
    
    curr = input[i];
    input[i] = id;
  }
  return input;
}
