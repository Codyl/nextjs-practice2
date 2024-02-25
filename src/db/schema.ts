import { boolean, pgTable, serial, integer, text } from "drizzle-orm/pg-core";

export const equipments = pgTable("equipment", {
  id: serial("id").notNull().primaryKey(),
  data_id: text("data_id").notNull().primaryKey(),
  status: text("status").notNull(),
  equipped: boolean("equipped").notNull(),
});

export const storage = pgTable("storage", {
  id: serial("id").notNull().primaryKey(),
  equipment_ids: text("equipment_ids").references(() => equipments.id, {
    onDelete: "cascade",
  }),
  name: text("name").notNull(),
});

export const inventory = pgTable("inventory", {
  id: serial("id").notNull().primaryKey(),
  equipment_ids: text("equipment_ids").references(() => equipments.id, {
    onDelete: "cascade",
  }),
});

export const wallet = pgTable("wallet", {});

export const characters = pgTable("player", {
  id: serial("id").notNull().primaryKey(),
  status: text("status").notNull(),
  languages: text("languages").notNull(),
  armor_class: integer("armor_class").notNull(),
  spell_slots: integer("spell_slots").notNull(),
  inventory_id: text("inventory_id")
    .notNull()
    .references(() => inventory.id, { onDelete: "cascade" }),
  wallet_id: text("inventory_id")
    .notNull()
    .references(() => inventory.id, { onDelete: "cascade" }),
});

export const players = pgTable("player", {
  id: serial("id").notNull().primaryKey(),
  username: text("username").notNull(),
  player_name: text("player_name").notNull(),
  character_ids: text("character_id")
    .notNull()
    .references(() => characters.id, { onDelete: "cascade" }),
});

export const monsters = pgTable("monsters", {
  id: serial("id").notNull().primaryKey(),
  data_id: serial("id").notNull(),
  health_points: integer("health_points").notNull(),
  status: text("status").notNull(),
});

export const encounters = pgTable("encounters", {
  id: serial("id").notNull().primaryKey(),
  order_entity_ids: text("order_entity_ids").array(),
  monster_ids: text("monster_ids")
    .array()
    .references(() => monsters.id, { onDelete: "cascade" }),
  character_ids: text("character_ids")
    .array()
    .references(() => players.id, { onDelete: "cascade" }),
  conditions: text("conditions"),
  location: text("location"),
});

export const room = pgTable("room", {
  id: serial("id").notNull().primaryKey(),
  current_encounter: text("encounter_id").references(() => encounters.id, {
    onDelete: "cascade",
  }),
});

export type Room = typeof room.$inferSelect;
