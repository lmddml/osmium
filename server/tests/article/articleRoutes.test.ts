// begin-auto-generated
import { deepStrictEqual, ok, strictEqual } from "node:assert";
import test from "node:test";
import { sql } from "drizzle-orm";
import type { InsertArticle, SelectArticle } from "../../src/article/articleModel.ts";
import * as articleModel from "../../src/article/articleModel.ts";
import { db } from "../../src/db/db.ts";

const createData = async (
        numberOfArticles: number,
): Promise<SelectArticle[]> => {
        await db.execute(sql`delete from articles`);
        const insertArticles: SelectArticle[] = [];

        for (let i = 0; i < numberOfArticles; i++) {
                const article = createTestArticle(i.toString());
                const insertedArticle = await articleModel.createArticle(article);
                insertArticles.push(insertedArticle);
        }

        return insertArticles;
};

test("GET /articles responds with JSON array and status 200", async () => {
        const newArticles = await createData(2);
        const response = await fetch("http://localhost:3001/articles");

        strictEqual(response.status, 200);
        ok(response.headers.get("content-type")?.includes("application/json"));

        const data = (await response.json()) as SelectArticle[];
        const _cleanedArticles = data.map(({ id, ...rest }) => rest);

        deepStrictEqual(data, newArticles);
});

test("POST /articles responds with JSON and status 200", async () => {
        await createData(0);
        const expectedArticle = createTestArticle("1");
        const response = await fetch("http://localhost:3001/articles", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(expectedArticle),
        });
        strictEqual(response.status, 200);
        ok(response.headers.get("content-type")?.includes("application/json"));
        const actualArticle = (await response.json()) as SelectArticle;

        strictEqual(actualArticle.unit, null);
        const { id: _id, unit: _unit, ...actualArticleWithoutIdAndUnit } = actualArticle;

        deepStrictEqual(expectedArticle, actualArticleWithoutIdAndUnit);
});

test("GET /articles/:id responds with JSON and status 200", async () => {
        const expectedArticles = await createData(1);
        strictEqual(expectedArticles.length, 1);
        const expectedArticle = expectedArticles[0] as SelectArticle;
        const id = expectedArticle.id;

        const response = await fetch(`http://localhost:3001/articles/${id}`);
        strictEqual(response.status, 200);
        ok(response.headers.get("content-type")?.includes("application/json"));
        const actualArticle = (await response.json()) as SelectArticle;
        deepStrictEqual(expectedArticle, actualArticle);
});

test("PUT /articles/:id responds with JSON and status 200", async () => {
        const expectedArticles = await createData(1);
        strictEqual(expectedArticles.length, 1);
        const expectedArticle = expectedArticles[0] as SelectArticle;
        const id = expectedArticle.id;
        const updatePayload: InsertArticle = {
                articleNumber: expectedArticle.articleNumber,
                name: expectedArticle.name,
                description: expectedArticle.description,
                price: expectedArticle.price,
                unitId: expectedArticle.unitId,
        };

        const response = await fetch(`http://localhost:3001/articles/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatePayload),
        });
        strictEqual(response.status, 200);
        ok(response.headers.get("content-type")?.includes("application/json"));
        const actualArticle = (await response.json()) as SelectArticle;
        deepStrictEqual(expectedArticle, actualArticle);
});

test("DELETE /articles/:id responds with JSON and status 200", async () => {
        const expectedArticles = await createData(1);
        strictEqual(expectedArticles.length, 1);
        const expectedArticle = expectedArticles[0] as SelectArticle;
        const id = expectedArticle.id;

        const response = await fetch(`http://localhost:3001/articles/${id}`, {
                method: "DELETE",
        });
        strictEqual(response.status, 200);
        ok(response.headers.get("content-type")?.includes("application/json"));
        const actualArticle = (await response.json()) as SelectArticle;
        deepStrictEqual(expectedArticle, actualArticle);
        const articles = await articleModel.getArticles();
        strictEqual(articles.length, 0);
});
// end-auto-generated

const createTestArticle = (suffix: string): InsertArticle => {
        const article: InsertArticle = {
                articleNumber: `000${suffix}`,
                name: "Test Article",
                description: "This is a test article",
                price: 10.99,
                unitId: null,
        };
        return article;
};
