CREATE TABLE `invitations` (
	`id` text PRIMARY KEY NOT NULL,
	`owner_hash` text NOT NULL,
	`data` text NOT NULL,
	`photo_key` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`checkout_id` text,
	`created_at` text NOT NULL
);
