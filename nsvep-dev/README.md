# 网络安全虚拟实验平台

#### 介绍
网络安全虚拟实验平台——Network security virtual experiment platform
本项目参加杭州师范大学2020国家级大学生创新创业项目

主要用于课程随堂的实验  使用了docker的远程服务

使用maven对项目进行模块化管理，提高项目的易开发性、扩展性

#### 主要功能
1.数据库：使用MySQL5.7 Druid数据库连接池，监控数据库访问性能，统计SQL的执行性能

2.持久层：mybatis持久化，使用MyBatis-Plus优化，减少sql开发量；aop切换数据库实现读写分离。Transaction注解事务。

3.MVC： 基于spring mvc注解。Exception统一管理。

#### 安装教程

1.  在服务器上安装JAVA、tomcat、nginx、Docker等软件运行环境
2.  在服务器上安装docker-server服务，生成docker密钥于/usr/local/dockercert下
3.  将sql下数据库导入MySQL
4.  将build与mng_build文件导入tomcat中的webapps中
5.  将本项目的后端代码生成为一个jar包
6.  运行jar包

#### 使用说明

1.  用户登录至平台后可以进行实验选择，实验开启过程为开启实验->开始实验->关闭实验
2.  添加实验部分
3.  xxxx

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request


