/*
Navicat MySQL Data Transfer

Source Server         : my-connect
Source Server Version : 50729
Source Host           : localhost:3306
Source Database       : db_experiment

Target Server Type    : MYSQL
Target Server Version : 50729
File Encoding         : 65001

Date: 2021-01-01 12:01:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `admin_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '管理员编号',
  `admin_account` varchar(20) DEFAULT NULL COMMENT '管理员账号',
  `admin_password` varchar(255) DEFAULT NULL COMMENT '管理员密码',
  `admin_tel` char(11) DEFAULT NULL COMMENT '管理员手机',
  `admin_image` varchar(50) DEFAULT NULL COMMENT '管理员头像',
  `admin_name` varchar(10) DEFAULT NULL COMMENT '管理员真实姓名',
  `is_super` tinyint(3) unsigned DEFAULT NULL COMMENT '管理员权限 0 教师 1超级管理员\r\n',
  `is_deleted` tinyint(3) unsigned DEFAULT NULL COMMENT '是否在岗 0在岗 1离职',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`admin_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for assist_record
-- ----------------------------
DROP TABLE IF EXISTS `assist_record`;
CREATE TABLE `assist_record` (
  `assist_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `experiment_id` int(11) NOT NULL,
  `create_time` datetime NOT NULL,
  `is_assisted` tinyint(4) NOT NULL,
  PRIMARY KEY (`assist_id`),
  UNIQUE KEY `pk_assist_id` (`assist_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class` (
  `class_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '班级编号',
  `class_name` varchar(20) DEFAULT NULL COMMENT '班级名',
  `class_detail` varchar(50) DEFAULT NULL COMMENT '班级说明',
  `admin_id` int(10) unsigned DEFAULT NULL COMMENT '所属教师编号',
  `is_end` tinyint(3) unsigned DEFAULT NULL COMMENT '是否结课',
  PRIMARY KEY (`class_id`) USING BTREE,
  KEY `teacher_id_2` (`admin_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1313021994233462787 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for class_experiment
-- ----------------------------
DROP TABLE IF EXISTS `class_experiment`;
CREATE TABLE `class_experiment` (
  `class_id` bigint(20) NOT NULL,
  `experiment_id` int(11) NOT NULL,
  `is_closed` tinyint(3) DEFAULT NULL,
  PRIMARY KEY (`class_id`,`experiment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for docker_images
-- ----------------------------
DROP TABLE IF EXISTS `docker_images`;
CREATE TABLE `docker_images` (
  `image_id` varchar(20) NOT NULL COMMENT '镜像ID',
  `hub_location` varchar(30) DEFAULT NULL COMMENT 'dockerHub上存储位置',
  `image_detail` varchar(50) DEFAULT NULL COMMENT '镜像描述',
  `image_name` varchar(60) DEFAULT NULL COMMENT '镜像名称',
  `admin_id` int(10) unsigned DEFAULT NULL COMMENT '镜像发布者',
  PRIMARY KEY (`image_id`) USING BTREE,
  KEY `admin_id_3` (`admin_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for experiment
-- ----------------------------
DROP TABLE IF EXISTS `experiment`;
CREATE TABLE `experiment` (
  `experiment_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '实验编号',
  `experiment_title` varchar(30) DEFAULT NULL COMMENT '实验标题',
  `experiment_task` varchar(255) DEFAULT NULL,
  `experiment_describe` varchar(255) DEFAULT NULL COMMENT '实验简介',
  `course_detail` varchar(2000) DEFAULT NULL COMMENT '实验详情',
  `image_name` varchar(30) DEFAULT NULL,
  `image_describe` varchar(255) DEFAULT NULL,
  `image_id` varchar(30) DEFAULT NULL COMMENT '容器镜像编号',
  PRIMARY KEY (`experiment_id`) USING BTREE,
  KEY `image_id_1` (`image_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for experiment_record
-- ----------------------------
DROP TABLE IF EXISTS `experiment_record`;
CREATE TABLE `experiment_record` (
  `record_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '使用记录编号',
  `user_id` int(10) unsigned DEFAULT NULL COMMENT '用户编号',
  `experiment_id` int(10) unsigned DEFAULT NULL COMMENT '实验编号',
  `container_id` char(12) DEFAULT NULL,
  `container_name` varchar(80) DEFAULT NULL COMMENT '容器名称',
  `occupy_port` varchar(30) DEFAULT NULL COMMENT '占用的端口路径',
  `record_ip` varchar(40) DEFAULT NULL COMMENT '申请人ip',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `end_time` datetime DEFAULT NULL COMMENT '结束时间',
  `is_closed` tinyint(3) unsigned DEFAULT NULL COMMENT '是否正在使用容器 0 表示正在使用 1表示停止使用\r\n',
  `is_removed` tinyint(2) DEFAULT NULL,
  PRIMARY KEY (`record_id`) USING BTREE,
  KEY `user_id_1` (`user_id`) USING BTREE,
  KEY `experiment_id_1` (`experiment_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for experiment_step
-- ----------------------------
DROP TABLE IF EXISTS `experiment_step`;
CREATE TABLE `experiment_step` (
  `step_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '实验步骤id',
  `experiment_id` int(10) unsigned DEFAULT NULL COMMENT '实验编号',
  `step_detail` varchar(3000) DEFAULT NULL COMMENT '步骤描述',
  `order_id` tinyint(3) unsigned DEFAULT NULL COMMENT '步骤顺序',
  PRIMARY KEY (`step_id`) USING BTREE,
  KEY `experiment_id_2` (`experiment_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for reference_material
-- ----------------------------
DROP TABLE IF EXISTS `reference_material`;
CREATE TABLE `reference_material` (
  `material_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '参考资料序号',
  `material_name` varchar(255) DEFAULT NULL COMMENT '参考资料名称',
  `material_url` varchar(80) DEFAULT NULL COMMENT '参考资料存储url',
  `admin_id` int(10) unsigned DEFAULT NULL COMMENT '教师编号',
  `is_deleted` tinyint(3) unsigned DEFAULT NULL COMMENT '是否删除 0未删除1删除',
  PRIMARY KEY (`material_id`) USING BTREE,
  KEY `teacher_id_1` (`admin_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for reported_problem
-- ----------------------------
DROP TABLE IF EXISTS `reported_problem`;
CREATE TABLE `reported_problem` (
  `reported_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '反馈问题编号',
  `reported_title` varchar(50) DEFAULT NULL COMMENT '反馈问题标题',
  `reported_detail` varchar(500) DEFAULT NULL COMMENT '反馈问题内容',
  `reported_image` varchar(80) DEFAULT NULL COMMENT '存储image所在URL',
  `create_time` datetime DEFAULT NULL COMMENT '反馈时间',
  `user_id` int(10) unsigned DEFAULT NULL COMMENT '用户编号',
  PRIMARY KEY (`reported_id`) USING BTREE,
  KEY `user_id_2` (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户编号',
  `user_student_number` char(13) NOT NULL DEFAULT '' COMMENT '学号',
  `user_password` varchar(255) DEFAULT NULL COMMENT '用户密码',
  `user_tel` char(11) DEFAULT NULL COMMENT '用户手机',
  `user_image` varchar(80) DEFAULT NULL COMMENT '用户头像',
  `user_name` varchar(10) DEFAULT NULL COMMENT '用户姓名',
  `user_academy` varchar(30) DEFAULT NULL COMMENT '用户所在学院',
  `user_class` varchar(20) DEFAULT NULL COMMENT '用户班级',
  `user_email` varchar(30) DEFAULT NULL COMMENT '用户邮箱',
  `user_gender` tinyint(3) unsigned DEFAULT NULL COMMENT '性别 0女孩 1男孩 2未知',
  `class_id` bigint(20) unsigned DEFAULT NULL COMMENT '所属班级编号 每个学生有所属班级',
  `is_deleted` tinyint(3) unsigned DEFAULT NULL COMMENT '账号是否使用 0未删除 1删除',
  `create_time` datetime DEFAULT NULL COMMENT '账号创建日期',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=255 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
