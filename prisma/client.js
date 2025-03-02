import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const gachaponDemoObj = {
  key: 'gachaponDemo',
  value: {
    backgroundColor: 'rgba(84, 67, 67, 1)',
    machineLogo:
      'https://hommdesserts.com.au/wp-content/uploads/2024/03/homm-dessert-at-heart-logo-plain-red.svg#383',
    gameType: 'gachapon',
    emptyPrizeWeight: 10,
    emptyPrizeDisplayText: 'No Prize this time, Try again!',
  },
  restaurantId: 1,
  preview: false,
};

const luckyDrawDemoObj = {
  key: 'luckyDrawDemo',
  value: {
    backgroundColor: 'rgba(139, 87, 42, 1)',
    lightboxColor: 'rgba(199, 178, 178, 1)',
    lightBulbColor: 'rgba(215, 154, 154, 1)',
    machineLogo:
      'https://hommdesserts.com.au/wp-content/uploads/2024/03/homm-dessert-at-heart-logo-plain-red.svg#383',
    emptyLogo:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLEySXEIcK1QatZRmZYRh4vIfmnB43NBh8DA&s',
    gameType: 'luckyDraw',
    emptyPrizeWeight: 10,
    emptyPrizeDisplayText: 'No Prize this time, Try again!',
  },
  restaurantId: 1,
  preview: false,
};

const slotMachineDemoObj = {
  key: "slotMachineDemo",
  value: {
    backgroundColor: "rgba(213, 80, 80, 1)",
    lightboxColor: "rgba(87, 38, 38, 1)",
    lightBulbColor: "rgba(233, 106, 106, 1)",
    machineLogo: 'https://hommdesserts.com.au/wp-content/uploads/2024/03/homm-dessert-at-heart-logo-plain-red.svg#383',
    gameType: "slotMachine",
    emptyPrizeWeight: 10,
    emptyPrizeDisplayText: 'No Prize this time, Try again!',
  },
  restaurantId: 1,
  preview: true,
  createdAt: "2025-02-10T22:18:31.472Z",
  deletedAt: null,
};

const couponConifgDemo = [
  {
    name: 'Pie',
    validDate: '2025-02-05T11:00:19.408Z',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5dfqB5pKHcWmWRxkPUM0WIJJcy5nGXyFFzA&s',
    isEmpty: false,
    weight: 5,
    quantity: 237,
    hashId: "gachaponDemo",
  },
  {
    name: 'Free Mooncake',
    validDate: '2025-02-05T11:00:19.408Z',
    img: 'https://img.taste.com.au/18AXPnQk/w1200-h630-cfill/taste/2016/11/mango-and-pineapple-tart-104743-1.jpeg',
    isEmpty: false,
    weight: 5,
    quantity: 421,
    hashId: "gachaponDemo"
  },
  {
    name: 'Free Mochi',
    validDate: '2025-02-05T11:00:19.408Z',
    img: 'https://img.bestrecipes.com.au/aaV-foHf/w643-h428-cfill-q90/br/2017/03/annes-cake-recipe-520563-1.jpg',
    isEmpty: false,
    weight: 10,
    quantity: 75,
    hashId: "gachaponDemo"

  },
  {
    name: '50% OFF',
    validDate: '2025-02-05T11:00:19.408Z',
    img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhMJymGGJXChoGE6DIly5LxUrb8yHt2__yvHsD_2Mkzrhfmq2T74hNHWrDaNyp_hYoqwAgcWKHToJ-ZE_-fSeGtuxq0007mXXGOVal4H-pPx_lEvQgS3KmWFK2dSVoHMNOCqlTR9wSlvklA/s160/percent_50.png',
    isEmpty: false,
    weight: 70,
    quantity: 356,
    hashId: "gachaponDemo"
  },
  {
    name: 'Tart',
    validDate: '2025-02-05T11:00:19.408Z',
    img: 'https://richanddelish.com/wp-content/uploads/2023/05/mini-fruit-tarts-2.jpg',
    isEmpty: false,
    weight: 10,
    quantity: 189,
    hashId: "gachaponDemo"
  },

  {
    name: '',
    validDate: null,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLEySXEIcK1QatZRmZYRh4vIfmnB43NBh8DA&s',
    isEmpty: true,
    weight: 5,
    order: 0,
    hashId: "luckyDrawDemo"

  },
  {
    name: 'Free Mochi',
    validDate: '2025-02-06T04:30:45.593Z',
    img: 'https://img.bestrecipes.com.au/aaV-foHf/w643-h428-cfill-q90/br/2017/03/annes-cake-recipe-520563-1.jpg',
    isEmpty: false,
    weight: 55,
    quantity: 412,
    order: 1,
    hashId: "luckyDrawDemo"
  },
  {
    name: 'Tart',
    validDate: '2025-02-06T04:30:45.593Z',
    img: 'https://richanddelish.com/wp-content/uploads/2023/05/mini-fruit-tarts-2.jpg',
    isEmpty: false,
    weight: 10,
    quantity: 158,
    order: 2,
    hashId: "luckyDrawDemo"

  },
  {
    name: '50% OFF',
    validDate: '2025-02-06T04:30:45.593Z',
    img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhMJymGGJXChoGE6DIly5LxUrb8yHt2__yvHsD_2Mkzrhfmq2T74hNHWrDaNyp_hYoqwAgcWKHToJ-ZE_-fSeGtuxq0007mXXGOVal4H-pPx_lEvQgS3KmWFK2dSVoHMNOCqlTR9wSlvklA/s160/percent_50.png',
    isEmpty: false,
    weight: 10,
    quantity: 325,
    order: 3,
    hashId: "luckyDrawDemo"

  },
  {
    name: 'GO!',
    hashId: "luckyDrawDemo",
    order: 4,
  },
  {
    name: 'Pie',
    validDate: '2025-02-06T04:30:45.593Z',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5dfqB5pKHcWmWRxkPUM0WIJJcy5nGXyFFzA&s',
    isEmpty: false,
    weight: 5,
    quantity: 276,
    order: 5,
    hashId: "luckyDrawDemo"
  },
  {
    name: '',
    validDate: null,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLEySXEIcK1QatZRmZYRh4vIfmnB43NBh8DA&s',
    isEmpty: true,
    weight: 5,
    order: 6,
    hashId: "luckyDrawDemo"

  },
  {
    name: 'Free Mooncake',
    validDate: '2025-02-06T04:30:45.593Z',
    img: 'https://img.taste.com.au/18AXPnQk/w1200-h630-cfill/taste/2016/11/mango-and-pineapple-tart-104743-1.jpeg',
    isEmpty: false,
    weight: 5,
    quantity: 489,
    order: 7,
    hashId: "luckyDrawDemo"

  },
  {
    name: '',
    validDate: null,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLEySXEIcK1QatZRmZYRh4vIfmnB43NBh8DA&s',
    isEmpty: true,
    weight: 5,
    order: 8,
    hashId: "luckyDrawDemo"
  },
  {
    name: "Pie",
    validDate: "2025-02-10T22:17:51.944Z",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5dfqB5pKHcWmWRxkPUM0WIJJcy5nGXyFFzA&s",
    isEmpty: false,
    weight: 20,
    quantity: 50,
    order: 9,
    hashId: "slotMachineDemo",

  },
  {
    name: "Free Mochi",
    validDate: "2025-02-10T22:17:51.944Z",
    img: "https://img.bestrecipes.com.au/aaV-foHf/w643-h428-cfill-q90/br/2017/03/annes-cake-recipe-520563-1.jpg",
    isEmpty: false,
    weight: 50,
    quantity: 40,
    hashId: "slotMachineDemo",

  },
  {
    name: "50% OFF",
    validDate: "2025-02-10T22:17:51.944Z",
    img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhMJymGGJXChoGE6DIly5LxUrb8yHt2__yvHsD_2Mkzrhfmq2T74hNHWrDaNyp_hYoqwAgcWKHToJ-ZE_-fSeGtuxq0007mXXGOVal4H-pPx_lEvQgS3KmWFK2dSVoHMNOCqlTR9wSlvklA/s160/percent_50.png",
    isEmpty: false,
    weight: 10,
    quantity: 100,
    hashId: "slotMachineDemo",
  },

]

async function injectDefaultData() {
  try {
    await prisma.couponConfig.deleteMany({
      where: {
        hashId: {
          in: ['gachaponDemo', 'luckyDrawDemo', 'slotMachineDemo']
        }
      }
    });
    await prisma.couponConfig.createMany({
      data: couponConifgDemo,
    });
    console.log(`✅ Inserted couponConfig`);

    const demoObjects = [slotMachineDemoObj, gachaponDemoObj, luckyDrawDemoObj];

    await Promise.all(
      demoObjects.map(async (demoObj) => {
        const existingEntry = await prisma.hash.findUnique({
          where: { key: demoObj.key },
        });

        if (!existingEntry) {
          await prisma.hash.create({
            data: {
              key: demoObj.key,
              value: JSON.stringify(demoObj.value),
              restaurantId: demoObj.restaurantId,
              preview: demoObj.preview,
              createdAt: new Date(),
              deletedAt: null,
            },
          });
          console.log(`✅ Inserted ${demoObj.key}`);
        } else {
          console.log(`✅ ${demoObj.key} already exists`);
        }
      })
    );

  } catch (error) {
    console.error('Error connecting to database:', error)

  }
}

injectDefaultData()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });

export default prisma;
