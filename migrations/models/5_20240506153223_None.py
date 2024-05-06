from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        CREATE TABLE IF NOT EXISTS `todos` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `content` VARCHAR(255) NOT NULL,
    `is_completed` BOOL NOT NULL  DEFAULT 0
) CHARACTER SET utf8mb4 COMMENT='args:';
CREATE TABLE IF NOT EXISTS `aerich` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `version` VARCHAR(255) NOT NULL,
    `app` VARCHAR(100) NOT NULL,
    `content` JSON NOT NULL
) CHARACTER SET utf8mb4;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        """
