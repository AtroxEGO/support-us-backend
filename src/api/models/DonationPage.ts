import { builder } from "../../builder";

builder.prismaObject("DonationPage", {
  fields: (t) => ({
    id: t.exposeID("id"),
    alias: t.exposeString("alias"),
    title: t.exposeString("title"),
    body: t.exposeString("body"),
    owner: t.relation("owner"),
  }),
});
