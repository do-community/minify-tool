export default `/* This a top-level function with some arguments that should be mangled */
const test = (argumentOne, argumentTwo) => {

  /* This is an unused function that compression should remove as dead code */
  const hello = () => console.log('hello world');

  /* Use the input arguments, which should match the new mangled names */
  console.log(argumentOne, argumentTwo);
};`;
