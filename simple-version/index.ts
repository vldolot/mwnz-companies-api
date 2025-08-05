import { Elysia, t } from "elysia";
import { XMLParser } from "fast-xml-parser";

const app = new Elysia().get(
  "/v1/companies/:id",
  async ({ params: { id }, set }) => {
    const response = await fetch(
      `https://raw.githubusercontent.com/MiddlewareNewZealand/evaluation-instructions/main/xml-api/${id}.xml`
    );

    if (!response.ok) {
      set.status = 404;
      return {
        error: "Not Found",
        error_description: "The requested company could not be found.",
      };
    }

    const xml = await response.text();
    const parser = new XMLParser();
    const json = parser.parse(xml);

    const company = {
      id: id,
      name: json.Data.name,
      description: json.Data.description,
    };

    return company;
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  }
);

app.listen(3001);

console.log(
  `Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
