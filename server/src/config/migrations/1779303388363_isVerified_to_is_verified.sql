
-- Migration: isVerified_to_is_verified
-- Created at: 2026-05-20T18:56:28.363Z

START TRANSACTION;

ALTER TABLE users
RENAME COLUMN isVerified TO is_verified;

COMMIT;
