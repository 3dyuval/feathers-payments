/*
 append-only database table to maintain accuracy and allow for troubleshooting
 */

CREATE TABLE IF NOT EXISTS payment_status
(
    id         SERIAL PRIMARY KEY,
    payment_id UUID        NOT NULL,
    status     VARCHAR(50) NOT NULL,
    timestamp  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    metadata   JSONB

);

