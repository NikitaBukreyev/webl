DROP TABLE IF EXISTS `config`;
CREATE TABLE `config` (
                          `carousel_id` int NOT NULL,
                          `slide_id` int NOT NULL,
                          `slide_text` text NOT NULL
);

INSERT INTO `config` VALUES (0,0,'Slide1'),(0,1,'Slide2'),(0,2,'Slide3'),(0,3,'Slide4');