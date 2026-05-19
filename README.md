# vue3-standard-system-project-template

#### 项目介绍
``` bash
项目基于sso菜单管理模块搭建的框架
技术：vue3 + vite + ts + postcss-px2rem-exclude + vant + pinia + axios + vue-router + vue-i18n
建议编辑器：VS + Vue(Official) + Vue Extension Box + ESLint开发
node版本：16.0.0 以上
npm版本：7.10.0 以上
```
## 项目演示
https://github.com/user-attachments/assets/9c78f15a-ea20-4411-a1a5-7fdbb2d5e558


#### 项目查看
``` bash
1、项目根目录下的package.json文件，查看项目依赖
2、项目根目录下的vite.config.ts文件，查看项目配置
3、项目根目录下的tsconfig.json文件，查看项目ts配置
4、项目根目录下的.env.dev文件，查看项目开发环境配置
5、项目根目录下的.env.test文件，查看项目开发环境配置
6、项目根目录下的.env.pro文件，查看项目生产环境配置
```

#### 项目启动
``` bash
1、npm install
2、npm run dev(开发环境)
3、npm run test(测试环境)
```

#### 项目打包
``` bash
1、npm run build:test(测试环境)
2、npm run build:pro(生产环境)
```

#### 新建分支命名规范
``` bash
1、master：主分支，功能稳定的代码；
2、release：上线发布的代码，其他分支将要上线的代码Merge Request（合并请求）到该分支，从该分支打上线发布的tag，待线上功能稳定运行以后，再合并代码到master主分支；
3、uat:预发布分支，预发布环境的代码（可无）
4、feat_${taskId}_{$description} _{$username}: 个人功能开发分支，从release新建的分支，用来开发分配给个人的禅道任务;
5、fix_${taskId可选}_{$description} _{$username}: 修复开发分支，从release新建的分支，用来修复线上bug，如果没有禅道任务taskId，可不填；
6、feat_dev_${taskId}_{$description}: 多人协作总开发分支 ，从release新建的分支，主要针对大需求，需要多人协作的功能开发
7、feat_dev_${taskId}_{$description} _{$username}: 多人协作个人开发分支 ，从【6】中的【多人协作总分支】新建而来，用于协作中的个人开发，个人开发部分功能完成，会合并到【6】分支中，同时也会把【6】分支的代码合并的该分支
8、feat_test_ ${taskId}_{$description}:多人协作测试分支（可选），从【6】中的【多人协作总分支】新建而来，对稳定的功能进行测试，【6】中的分支可能还在迭代功能
```


