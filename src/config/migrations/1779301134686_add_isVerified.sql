
-- Migration: add_isVerified
-- Created at: 2026-05-20T18:18:54.686Z

START TRANSACTION;

ALTER TABLE users
ADD isVerified BOOLEAN DEFAULT FALSE;


COMMIT;
