/*
Copyright 2020 DigitalOcean

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

export default `/* This a top-level function with some arguments that should be mangled */
const test = (argumentOne, argumentTwo) => {

  /* This is an unused function that compression should remove as dead code */
  const hello = () => console.log('hello world');

  /* Use the input arguments, which should match the new mangled names */
  console.log(argumentOne, argumentTwo);
};`;
