### Customize car pick by adjusting parameters in profile1920.js

|  ——   |  ——   |  ——   |  ——   |   ——   |  ——  |
| :---: | :---: | :---: | :---: | :----: | :--: |
| Car 1 | Car 3 | Car 5 | Car 7 | Car 9  |  ……  |
| Car 2 | Car 4 | Car 6 | Car 8 | Car 10 |  ……  |

* You only need to write numbers at the corresponding lines.

* You must using comma to separate numbers.

* Front cars have priorities.

- Carrer script

  - Line 6.

- MultiPlayer script

  - Parameters in line 13 - 17 control script's level pick.
    - Only ***true*** or ***false***. 
      - The ***true*** means you **allow** scripts to use cars in this level.
      - The ***false*** means you **DON'T allow** scripts to use cars in this level. 
    - You can only set ***true*** for levels which you have achieved.
      - If you set ***true*** for more than one level, scripts will use cars in higher level automatically.
      - Setting ***true*** for levels which you **haven't achieved** will lead to unexpected results.
  ---
  - Parameters in line 20 - 24 control script's car pick in each specific level.
  - Last 6 cars in Legend level **CANNOT** be used due to technical reasons.



### You may read these instructions below

* <a href="requirement.md">Device requirements</a>
* <a href="installation.md">Install Scripts</a>
* <a href="adjustment.md">Adjust parameters</a>
* <a href="run.md">Run Scripts</a>
* <a href="description.md">Statements</a>

