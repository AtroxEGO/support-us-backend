import { builder } from "./builder";

import "./api/models/index";

import { lexicographicSortSchema, printSchema } from "graphql";
import logger from "./config/Logger";

export const schema = builder.toSchema({});
const schemaAsString = printSchema(lexicographicSortSchema(schema));
// logger.info(schemaAsString);
