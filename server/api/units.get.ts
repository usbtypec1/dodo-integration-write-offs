export default defineEventHandler((event) => {
  const units = [
    {
      id: "2c55ad28-4c41-407f-8c93-5809d6cd62c0",
      name: "Москва 4-1",
    },
    {
      id: "3d66ad28-4c41-407f-8c93-5809d6cd62c1",
      name: "Санкт-Петербург 3-2",
    },
    {
      id: "4e77ad28-4c41-407f-8c93-5809d6cd62c2",
      name: "Новосибирск 5-3",
    },
    {
      id: "5f88ad28-4c41-407f-8c93-5809d6cd62c3",
      name: "Екатеринбург 2-1",
    },
  ];
  return { units };
});
