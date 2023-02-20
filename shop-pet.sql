-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 17, 2022 at 07:13 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shop-pet`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cartId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `cartCartId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cartId`, `productId`, `userId`, `cartCartId`) VALUES
(1, 1, 2, 0),
(2, 2, 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `orderId` int(11) NOT NULL,
  `senderId` int(11) NOT NULL,
  `recipientId` int(11) NOT NULL,
  `transaction_code` int(11) NOT NULL,
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pets`
--

CREATE TABLE `pets` (
  `productId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `assess` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `species` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `poster` varchar(255) NOT NULL,
  `posterPhoneNumber` int(11) NOT NULL,
  `number` int(11) NOT NULL DEFAULT 1,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `cartCartId` int(11) DEFAULT NULL,
  `orderOrderId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pets`
--

INSERT INTO `pets` (`productId`, `userId`, `categoryId`, `title`, `description`, `assess`, `price`, `species`, `image`, `poster`, `posterPhoneNumber`, `number`, `createdAt`, `updatedAt`, `cartCartId`, `orderOrderId`) VALUES
(1, 2, 0, 'dog corgi', 'dog corgi', 0, 550, 'dogcorgi', '', '', 0, 1, '2022-11-11 07:52:39.178395', '2022-11-11 07:55:04.000000', 1, NULL),
(2, 2, 0, 'dog husky', 'dog husky', 0, 550, 'dog husky', '', '', 0, 1, '2022-11-11 07:52:52.924213', '2022-11-11 07:55:06.000000', 2, NULL),
(3, 2, 0, 'Cat short hart Us', 'Cat short hart Us', 0, 550, 'Cat short hart Us', '', '', 0, 1, '2022-11-11 07:53:11.978679', '2022-11-11 07:53:11.978679', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `numberPhone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `role` int(11) NOT NULL DEFAULT 1,
  `sex` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `cartId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `numberPhone`, `address`, `role`, `sex`, `avatar`, `createdAt`, `cartId`) VALUES
(1, '', '', 'dtu@gmail.com', '$2b$08$YlzEvgG3P4e1thugkQyU5.U58deIPo9gmwc1dECgGKccPHcrpqIKC', '', '', 1, '', '', '2022-11-11 07:52:25.037760', 0),
(2, '', '', 'phuc@gmail.com', '$2b$08$9bmw1a/Glxv17TbklbID1OsEA8QUJnp.eHY7smD3RWiIe4pQMlNHe', '', '', 1, '', '', '2022-11-11 07:52:31.241974', 0),
(3, '', '', '', '', '', '', 1, '', '', '2022-11-11 07:55:04.400880', 0),
(5, '', '', 'quynhoccho@gmail.com', '$2b$08$ApLNK.W4McpuwOVXD.0LH.1sfJrrf9GevTrz91k8gC8Ae3v2I1QTu', '', '', 1, '', '', '2022-11-13 14:56:26.792130', 0),
(6, 'quynh', 'diem', 'diemquynh@gmail.com', '$2b$12$NUz8sWOmQHNCffwaUE854uG4N0toMuplIkHyzFFSEqHQ5O.i4zlGa', '', '', 1, '', '', '2022-11-13 16:31:35.965840', 0),
(7, 'thanh', 'le', 'dienthanh@gmail.com', '$2b$08$yd5JkWrtP94B.L8.qK9Kouq8Xh3nIFF1AhmcFHqQ/5bKmLqpW5t.y', '', '', 1, '', '', '2022-11-14 14:24:07.891469', 0),
(8, 'trongphuc', 'phuc', 'tntp@gmail.com', '$2b$08$sDQ0X1yVd5fIXGdUDyXZ3.xwpd4L5/LJjIIXQqQZ9dCwoC2z/eP2W', '', '', 1, '', '', '2022-11-14 14:29:04.876423', 0),
(9, 'ajsdia', 'jasiod', 'jasidasd@gmail.com', '$2b$08$yYoEOgqKkyvbswW2ebMxKeXIFIx2e33euNR3Q6NSXlDc7oPX8vbsS', '', '', 1, '', '', '2022-11-14 14:34:57.705632', 0),
(10, 'ahsd', 'hausd', 'hausid@gmail.com', '$2b$08$oosk5gb5p8Sg2L9lxpjLT.arEgEOwttefQqB61psQK.Y44b0WRKk2', '', '', 1, '', '', '2022-11-14 14:35:36.075107', 0),
(11, 'thanh ', 'le', 'asjdasi@gmail.com', '$2b$08$ozBtJf.wnV/ka7wzFmWgHuCw1IKaWxyK7QqFmn5fUq08Ik5yJzWHy', '', '', 1, '', '', '2022-11-14 14:40:33.670677', 0),
(12, 'thanh ', 'le', 'aosida@gmail.com', '$2b$08$jBQJUPbB5tJe105GB/Zh8.7jjpEgYNhLSkk7OhcZUKl7cXV/mmURm', '', '', 1, '', '', '2022-11-14 14:41:12.714384', 0),
(13, 'huy', 'pham', 'huy.pham.0508@gmail.com', '$2b$08$OuVMre9qmkkLHhutFF45euEXPiRHqRPRUpd31c6D02zWbQSmZ9c1.', '', '', 1, '', '', '2022-11-14 15:44:44.290612', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cartId`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`orderId`);

--
-- Indexes for table `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `FK_a9f39dd54113410cdd3a04e80eb` (`userId`),
  ADD KEY `FK_c3abe6674be8b4a4fe29a904532` (`cartCartId`),
  ADD KEY `FK_8d3ceb11778185cb6c33d465c8b` (`orderOrderId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cartId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pets`
--
ALTER TABLE `pets`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pets`
--
ALTER TABLE `pets`
  ADD CONSTRAINT `FK_8d3ceb11778185cb6c33d465c8b` FOREIGN KEY (`orderOrderId`) REFERENCES `order` (`orderId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_a9f39dd54113410cdd3a04e80eb` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_c3abe6674be8b4a4fe29a904532` FOREIGN KEY (`cartCartId`) REFERENCES `cart` (`cartId`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
