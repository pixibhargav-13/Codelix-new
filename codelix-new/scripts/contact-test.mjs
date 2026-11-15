/* node scripts/contact-test.mjs — checks /api/contact booking rules against
   a fake Supabase (no real database, no email). */
import http from "node:http";
import assert from "node:assert/strict";

let taken = [], insertError = null;
const db = http.createServer((req, res) => {
  req.resume().on("end", () => {
    res.setHeader("content-type", "application/json");
    if (req.method === "GET") return res.end(JSON.stringify(taken.map((t) => ({ booking_time: t }))));
    if (insertError) { res.statusCode = 409; return res.end(JSON.stringify(insertError)); }
    res.statusCode = 201; res.end("[]");
  });
}).listen(5197);

Object.assign(process.env, { SUPABASE_URL: "http://localhost:5197", SUPABASE_SERVICE_ROLE_KEY: "test",
  SMTP_HOST: "127.0.0.1", SMTP_PORT: "1", SMTP_EMAIL: "x@example.test", SALES_RECEIVER: "y@example.test" });
const { default: handler } = await import("../api/contact.js");

const call = (method, body, query = {}) => new Promise((done) => handler(
  { method, query, body, headers: { origin: "http://localhost" }, socket: { remoteAddress: Math.random() + "" } },
  { setHeader() {}, status(c) { this.c = c; return this; }, json(j) { done([this.c, j]); } }));

// next weekday in India, a few days out
const day = (n) => new Date(Date.now() + 330 * 60000 + n * 86400000).toISOString().slice(0, 10);
let ok = 3; while (new Date(day(ok)).getUTCDay() === 0) ok++;
const book = (bookingDateIso, bookingTime = "11:00 AM") =>
  call("POST", { formType: "booking", name: "T", email: "t@example.test", bookingDateIso, bookingTime });

taken = ["11:00 AM"];
assert.deepEqual(await call("GET", null, { slots: day(ok) }), [200, { taken: ["11:00 AM"] }]);
assert.equal((await book(day(ok)))[0], 409, "taken slot is refused");
taken = [];
assert.equal((await book(day(-1)))[0], 400, "past date is refused");
assert.equal((await book(day(120)))[0], 400, "date too far ahead is refused");
let sun = ok; while (new Date(day(sun)).getUTCDay() !== 0) sun++;
assert.equal((await book(day(sun)))[0], 400, "Sunday is refused");
assert.equal((await book(day(ok), "09:13 AM"))[0], 400, "unknown time is refused");
insertError = { code: "23505", message: "duplicate key" };
assert.equal((await book(day(ok)))[0], 409, "database duplicate becomes 409");
insertError = null;
const [code, body] = await book(day(ok));
assert.equal(code, 200, "free slot is saved even when email fails");
assert.equal(body.stored, true);

db.close();
console.log("contact-test: all passed");
