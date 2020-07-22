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

export default {
    mangle: 'Mangle',
    mangleDesc: 'Mangle variable names within the script',
    evalDesc: 'Mangle variable names within `eval` scopes',
    classnamesDesc: 'Enable to preserve class names and not mangle them',
    fnamesDesc: 'Enable to preserve function names and not mangle them',
    toplevelDesc: 'Enable to mangle names within the top-level scope',
    safari10Desc: 'Enable to work around a Safari 10 iterator bug',
};
