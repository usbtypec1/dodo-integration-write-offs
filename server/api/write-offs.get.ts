import { randomUUID } from "crypto";

const ingredientWriteOffs = [
  {
    id: "4ecce91c-14bc-4903-82c9-8f1ddfd1eb45",
    ingredientName: "Mushroom",
    toWriteOffAt: "2025-05-28T15:40:00.000Z",
    writtenOffAt: null,
    createdAt: "2025-07-25T14:59:00.000Z",
  },
  {
    id: "4b7833ac-76ca-4fac-b782-cacbbbd784cd",
    ingredientName: "Cucumber",
    toWriteOffAt: "2025-05-28T11:24:00.000Z",
    writtenOffAt: "2025-04-12T11:12:00.000Z",
    createdAt: "2025-07-29T00:16:00.000Z",
  },
  {
    id: "97a776d5-2999-4c5f-b7a0-a61927bc6089",
    ingredientName: "Leek",
    toWriteOffAt: "2025-05-28T15:20:00.000Z",
    writtenOffAt: null,
    createdAt: "2025-04-15T09:31:00.000Z",
  },
  {
    id: "2f1fd8c8-4d26-4220-80bc-4ce5f6a55060",
    ingredientName: "Pepper",
    toWriteOffAt: "2025-05-28T08:51:00.000Z",
    writtenOffAt: "2025-05-28T09:30:00.000Z",
    createdAt: "2025-08-02T16:01:00.000Z",
  },
  {
    id: "76a8c598-07c5-451d-adb8-7835fcbec4c8",
    ingredientName: "Chili",
    toWriteOffAt: "2025-05-28T15:50:00.000Z",
    writtenOffAt: null,
    createdAt: "2025-05-07T15:09:00.000Z",
  },
  {
    id: "b03ae926-ed7e-4144-bddc-124637f8f5e5",
    ingredientName: "Eggplant",
    toWriteOffAt: "2025-04-06T18:06:00.000Z",
    writtenOffAt: null,
    createdAt: "2025-07-28T02:09:00.000Z",
  },
  {
    id: "df7b313c-9a38-4547-9889-5478e76019b3",
    ingredientName: "Cabbage",
    toWriteOffAt: "2025-03-02T02:48:00.000Z",
    writtenOffAt: null,
    createdAt: "2025-05-10T20:06:00.000Z",
  },
  {
    id: "4f40683e-81fb-4a8a-9538-26202c101f18",
    ingredientName: "Mushroom",
    toWriteOffAt: "2025-03-10T15:41:00.000Z",
    writtenOffAt: null,
    createdAt: "2025-07-28T04:39:00.000Z",
  },
  {
    id: "6853a384-60e7-4798-b142-0d37ca2fbc9e",
    ingredientName: "Broccoli",
    toWriteOffAt: "2025-07-07T14:39:00.000Z",
    writtenOffAt: "2025-07-11T04:26:00.000Z",
    createdAt: "2025-04-22T20:46:00.000Z",
  },
  {
    id: "d4b5e937-1c94-4048-8253-c1f9d3005888",
    ingredientName: "Eggplant",
    toWriteOffAt: "2025-04-11T13:58:00.000Z",
    writtenOffAt: null,
    createdAt: "2025-06-29T17:51:00.000Z",
  },
  {
    id: "730d3b04-84c1-49c6-be92-aea6dd05dbcc",
    ingredientName: "Broccoli",
    toWriteOffAt: "2025-08-07T08:59:00.000Z",
    writtenOffAt: null,
    createdAt: "2025-03-18T11:39:00.000Z",
  },
  {
    id: "735d9c2d-8d90-47ae-9c87-4a0e8a273a14",
    ingredientName: "Celery",
    toWriteOffAt: "2025-07-16T18:23:00.000Z",
    writtenOffAt: "2025-07-24T18:05:00.000Z",
    createdAt: "2025-08-14T06:59:00.000Z",
  },
  {
    id: "90bc983c-57d3-4842-8fc2-6b0c76ebcc17",
    ingredientName: "Tomato",
    toWriteOffAt: "2025-07-04T22:45:00.000Z",
    writtenOffAt: "2025-03-09T23:52:00.000Z",
    createdAt: "2025-07-27T00:03:00.000Z",
  },
  {
    id: "e8195202-b77b-4d46-bd13-4268a983df0e",
    ingredientName: "Garlic",
    toWriteOffAt: "2025-05-04T19:29:00.000Z",
    writtenOffAt: "2025-06-01T22:42:00.000Z",
    createdAt: "2025-05-29T00:42:00.000Z",
  },
  {
    id: "288cbb8d-732a-42c0-968a-4d9c853895e6",
    ingredientName: "Mushroom",
    toWriteOffAt: "2025-07-21T19:26:00.000Z",
    writtenOffAt: null,
    createdAt: "2025-07-02T11:12:00.000Z",
  },
  {
    id: "9d837969-990e-428d-adbb-d409609d1e09",
    ingredientName: "Cabbage",
    toWriteOffAt: "2025-06-18T00:50:00.000Z",
    writtenOffAt: "2025-06-29T18:16:00.000Z",
    createdAt: "2025-04-18T06:30:00.000Z",
  },
  {
    id: "9f750455-ba23-4c3d-8155-427cf7eed980",
    ingredientName: "Pepper",
    toWriteOffAt: "2025-04-01T13:59:00.000Z",
    writtenOffAt: null,
    createdAt: "2025-06-07T17:30:00.000Z",
  },
  {
    id: "df52d342-7c4f-47c4-ad93-cb0459156656",
    ingredientName: "Pepper",
    toWriteOffAt: "2025-07-04T17:34:00.000Z",
    writtenOffAt: "2025-03-07T10:55:00.000Z",
    createdAt: "2025-05-16T04:04:00.000Z",
  },
  {
    id: "907a0d4e-4fe7-4e12-bea6-22bbfda92c9e",
    ingredientName: "Cabbage",
    toWriteOffAt: "2025-07-17T06:55:00.000Z",
    writtenOffAt: null,
    createdAt: "2025-04-11T14:04:00.000Z",
  },
  {
    id: "f9cc0995-49bc-48f1-ae11-297003aa03a3",
    ingredientName: "Cucumber",
    toWriteOffAt: "2025-04-08T19:56:00.000Z",
    writtenOffAt: null,
    createdAt: "2025-05-29T21:59:00.000Z",
  },
  {
    id: "865c48b7-5ffc-4cde-8eac-7fb90e9a9233",
    ingredientName: "Carrot",
    toWriteOffAt: "2025-05-21T01:06:00.000Z",
    writtenOffAt: "2025-05-03T11:15:00.000Z",
    createdAt: "2025-07-03T11:14:00.000Z",
  },
  {
    id: "b6175a93-f0c7-46ce-8cd2-5bc8e58b73d0",
    ingredientName: "Eggplant",
    toWriteOffAt: "2025-06-01T06:54:00.000Z",
    writtenOffAt: null,
    createdAt: "2025-05-17T19:40:00.000Z",
  },
  {
    id: "cb30f7f1-2f33-496d-ac7e-cc2c9a8afee5",
    ingredientName: "Carrot",
    toWriteOffAt: "2025-07-25T14:15:00.000Z",
    writtenOffAt: "2025-05-10T15:33:00.000Z",
    createdAt: "2025-08-14T15:26:00.000Z",
  },
  {
    id: "dd9955de-59f2-4dbd-82d0-2a0468e5ef11",
    ingredientName: "Onion",
    toWriteOffAt: "2025-05-06T03:18:00.000Z",
    writtenOffAt: "2025-06-16T10:51:00.000Z",
    createdAt: "2025-04-21T00:45:00.000Z",
  },
  {
    id: "af0edc0a-c3c3-4495-9729-6ca1e60f023d",
    ingredientName: "Mushroom",
    toWriteOffAt: "2025-06-26T15:42:00.000Z",
    writtenOffAt: null,
    createdAt: "2025-06-15T21:14:00.000Z",
  },
  {
    id: "6eae55ba-da83-4b9e-959b-6c6389489c45",
    ingredientName: "Lettuce",
    toWriteOffAt: "2025-05-16T18:23:00.000Z",
    writtenOffAt: null,
    createdAt: "2025-07-16T14:49:00.000Z",
  },
  {
    id: "4148a748-f9a8-45d5-97f8-e5cc7f99266b",
    ingredientName: "Cucumber",
    toWriteOffAt: "2025-04-22T01:06:00.000Z",
    writtenOffAt: null,
    createdAt: "2025-05-30T02:54:00.000Z",
  },
  {
    id: "17c2f0ce-a0cc-476d-9c7f-78202aa2181f",
    ingredientName: "Garlic",
    toWriteOffAt: "2025-03-18T04:55:00.000Z",
    writtenOffAt: null,
    createdAt: "2025-04-18T08:45:00.000Z",
  },
  {
    id: "6f3e3195-16d7-4dc7-8dbf-b5d5e8200974",
    ingredientName: "Lettuce",
    toWriteOffAt: "2025-04-04T10:33:00.000Z",
    writtenOffAt: "2025-04-09T09:45:00.000Z",
    createdAt: "2025-08-01T22:33:00.000Z",
  },
  {
    id: "85161253-3d9a-4d5a-b2c6-d9796a7be5bd",
    ingredientName: "Garlic",
    toWriteOffAt: "2025-04-18T12:21:00.000Z",
    writtenOffAt: null,
    createdAt: "2025-06-20T09:24:00.000Z",
  },
  {
    id: "59a00d82-fc14-42d5-a49c-880252235ee9",
    ingredientName: "Cabbage",
    toWriteOffAt: "2025-05-02T20:51:00.000Z",
    writtenOffAt: null,
    createdAt: "2025-06-18T05:25:00.000Z",
  },
  {
    id: "73cefb71-2a7a-4fa0-9224-e48aeeb72281",
    ingredientName: "Potato",
    toWriteOffAt: "2025-06-11T07:51:00.000Z",
    writtenOffAt: "2025-04-23T00:06:00.000Z",
    createdAt: "2025-07-28T17:14:00.000Z",
  },
  {
    id: "da16fc35-156d-4097-a1e5-d63b7db2490e",
    ingredientName: "Chili",
    toWriteOffAt: "2025-06-01T04:43:00.000Z",
    writtenOffAt: "2025-04-29T04:08:00.000Z",
    createdAt: "2025-07-09T01:56:00.000Z",
  },
  {
    id: "9a295deb-aac7-4a18-a490-ce9e3e0c1e39",
    ingredientName: "Garlic",
    toWriteOffAt: "2025-05-18T11:53:00.000Z",
    writtenOffAt: null,
    createdAt: "2025-07-18T06:56:00.000Z",
  },
  {
    id: "277b9332-77b8-4d7e-b9cd-4f4cb8bc06a8",
    ingredientName: "Eggplant",
    toWriteOffAt: "2025-05-30T04:07:00.000Z",
    writtenOffAt: null,
    createdAt: "2025-07-22T11:08:00.000Z",
  },
  {
    id: "d4d4f326-1e29-482e-8f88-2ce2437bceb5",
    ingredientName: "Spinach",
    toWriteOffAt: "2025-03-15T16:28:00.000Z",
    writtenOffAt: null,
    createdAt: "2025-05-21T01:00:00.000Z",
  },
  {
    id: "80fa15ba-e5cf-4826-ba05-af823adde78a",
    ingredientName: "Chili",
    toWriteOffAt: "2025-06-17T03:01:00.000Z",
    writtenOffAt: "2025-06-08T12:05:00.000Z",
    createdAt: "2025-07-22T13:35:00.000Z",
  },
  {
    id: "0983c8e4-90b1-4874-a906-92bad867d253",
    ingredientName: "Eggplant",
    toWriteOffAt: "2025-05-24T17:10:00.000Z",
    writtenOffAt: null,
    createdAt: "2025-04-20T05:07:00.000Z",
  },
  {
    id: "283761c9-f419-45c5-933d-e1ca8db2c45c",
    ingredientName: "Mushroom",
    toWriteOffAt: "2025-04-13T22:44:00.000Z",
    writtenOffAt: null,
    createdAt: "2025-05-05T04:35:00.000Z",
  },
  {
    id: "70b572a7-646b-441b-8f5d-0ebda2c2a8bb",
    ingredientName: "Pumpkin",
    toWriteOffAt: "2025-08-03T14:17:00.000Z",
    writtenOffAt: null,
    createdAt: "2025-05-28T13:31:00.000Z",
  },
  {
    id: "52440085-a18a-42c1-b708-ab75096925f5",
    ingredientName: "Potato",
    toWriteOffAt: "2025-06-24T18:38:00.000Z",
    writtenOffAt: "2025-08-22T06:35:00.000Z",
    createdAt: "2025-07-18T00:50:00.000Z",
  },
  {
    id: "6ef476ac-ef6c-4340-8b8d-9e17d384314b",
    ingredientName: "Cucumber",
    toWriteOffAt: "2025-02-27T11:52:00.000Z",
    writtenOffAt: null,
    createdAt: "2025-05-05T15:36:00.000Z",
  },
  {
    id: "9f86b17c-23db-49aa-bcde-94a04de85af8",
    ingredientName: "Cauliflower",
    toWriteOffAt: "2025-04-05T06:40:00.000Z",
    writtenOffAt: "2025-07-24T00:09:00.000Z",
    createdAt: "2025-03-08T22:34:00.000Z",
  },
  {
    id: "fdcd8ebf-bb7d-4acf-b6db-c5541f1a924e",
    ingredientName: "Cucumber",
    toWriteOffAt: "2025-03-04T03:03:00.000Z",
    writtenOffAt: null,
    createdAt: "2025-04-23T21:31:00.000Z",
  },
  {
    id: "4411c5e4-0ed2-4713-b406-716f9bdb8581",
    ingredientName: "Eggplant",
    toWriteOffAt: "2025-06-09T09:59:00.000Z",
    writtenOffAt: "2025-06-16T13:37:00.000Z",
    createdAt: "2025-07-10T01:18:00.000Z",
  },
  {
    id: "b73ca039-41a2-475c-8887-5a3bd5f9a46d",
    ingredientName: "Potato",
    toWriteOffAt: "2025-08-05T12:25:00.000Z",
    writtenOffAt: "2025-06-11T03:51:00.000Z",
    createdAt: "2025-08-14T15:36:00.000Z",
  },
  {
    id: "bf6487c0-bf86-49e6-9b8b-cbd77dbee691",
    ingredientName: "Garlic",
    toWriteOffAt: "2025-03-17T10:57:00.000Z",
    writtenOffAt: null,
    createdAt: "2025-06-05T20:46:00.000Z",
  },
  {
    id: "c3d25c44-3205-4183-900b-d20d28c5ace0",
    ingredientName: "Potato",
    toWriteOffAt: "2025-04-15T01:09:00.000Z",
    writtenOffAt: "2025-07-14T16:07:00.000Z",
    createdAt: "2025-07-15T03:39:00.000Z",
  },
  {
    id: "cf97a01d-551d-46c0-af2b-32a4751d69c0",
    ingredientName: "Tomato",
    toWriteOffAt: "2025-08-18T19:52:00.000Z",
    writtenOffAt: "2025-08-14T05:41:00.000Z",
    createdAt: "2025-05-01T05:12:00.000Z",
  },
  {
    id: "394c0ee5-3333-48fa-94df-658cd7cc5e4c",
    ingredientName: "Cabbage",
    toWriteOffAt: "2025-04-30T23:01:00.000Z",
    writtenOffAt: null,
    createdAt: "2025-08-06T02:58:00.000Z",
  },
];

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const filterDate = query.date as string | undefined; // expected in 'YYYY-MM-DD' format

  const filtered = filterDate
    ? ingredientWriteOffs.filter(
        (item) => item.toWriteOffAt.slice(0, 10) === filterDate
      )
    : ingredientWriteOffs;

  return { ingredientWriteOffs: filtered };
});

function randomDateISO() {
  const now = new Date();
  const offset = Math.floor(Math.random() * 180) - 90; // -90 to +90 days
  now.setDate(now.getDate() + offset);
  now.setHours(
    Math.floor(Math.random() * 24),
    Math.floor(Math.random() * 60),
    0,
    0
  );
  return now.toISOString();
}
