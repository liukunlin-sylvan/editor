import { storeKeyEnum } from '../../../components/const';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const mockImg = {
      emptyImg:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLEySXEIcK1QatZRmZYRh4vIfmnB43NBh8DA&s',
      tart: 'https://img.taste.com.au/18AXPnQk/w1200-h630-cfill/taste/2016/11/mango-and-pineapple-tart-104743-1.jpeg',
      mochi:
        'https://img.bestrecipes.com.au/aaV-foHf/w643-h428-cfill-q90/br/2017/03/annes-cake-recipe-520563-1.jpg',
      fruitTart:
        'https://richanddelish.com/wp-content/uploads/2023/05/mini-fruit-tarts-2.jpg',
      eggTart:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5dfqB5pKHcWmWRxkPUM0WIJJcy5nGXyFFzA&s',
      logo: 'https://hommdesserts.com.au/wp-content/uploads/2024/03/homm-dessert-at-heart-logo-plain-red.svg#383',
      '50%Off':
        'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhMJymGGJXChoGE6DIly5LxUrb8yHt2__yvHsD_2Mkzrhfmq2T74hNHWrDaNyp_hYoqwAgcWKHToJ-ZE_-fSeGtuxq0007mXXGOVal4H-pPx_lEvQgS3KmWFK2dSVoHMNOCqlTR9wSlvklA/s160/percent_50.png',
    };

    const coupons = [
      {
        id: 0,
        name: 'Pie',
        validDate: new Date().toISOString(),
        img: mockImg.eggTart,
        isEmpty: false,
      },
      {
        id: 1,
        name: 'Free Mochi',
        validDate: new Date().toISOString(),
        img: mockImg.mochi,
        isEmpty: false,
      },
      {
        id: 2,
        name: '50% OFF',
        validDate: new Date().toISOString(),
        img: mockImg['50%Off'],
        isEmpty: false,
      },
      {
        id: 3,
        name: 'Free  Mooncake',
        validDate: new Date().toISOString(),
        img: mockImg.tart,
        isEmpty: false,
      },
      {
        id: 4,
        name: 'Tart',
        validDate: new Date().toISOString(),
        img: mockImg.fruitTart,
        isEmpty: false,
      },
    ];

    return new Response(JSON.stringify({ coupons }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


export async function PUT(req) {
  try {
    const body = await req.json();
    const { type, key } = body;

    if (!type || !key) {
      return new Response(JSON.stringify({ error: 'Missing required fields: type or key' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const selectedCoupons = await prisma.couponConfig.findMany({
      where: {
        hashId: key,
        quantity: {
          gt: 0
        }
      }
    });

    let drawnCoupon;

    switch (type) {
      case storeKeyEnum.gacha:
        const configGacha = await prisma.hash.findFirst({
          where: { key },
        });

        if (!configGacha) {
          throw new Error("Config not found for the given key");
        }

        const { emptyPrizeWeight, emptyPrizeDisplayText } = JSON.parse(configGacha.value);
        drawnCoupon = weightedRandomSelection(selectedCoupons, emptyPrizeWeight, emptyPrizeDisplayText);

        if (!drawnCoupon.isEmpty) {
          await prisma.couponConfig.update({
            where: { id: drawnCoupon.id },
            data: {
              quantity: drawnCoupon.quantity - 1,
            },
          });
        }
        break;

      case storeKeyEnum.luckyDraw:
        const configLuckyDraw = await prisma.hash.findFirst({
          where: { key },
        });

        if (!configLuckyDraw) {
          throw new Error('Config not found for the given key');
        }

        const { emptyPrizeWeight: luckyDrawEmptyWeight, emptyPrizeDisplayText: luckyDrawEmptyText } = JSON.parse(configLuckyDraw.value);
        // const validIndices = [0, 1, 2, 5, 8, 7, 6, 3];

        // let weights = selectedCoupons.map(item => Number(item.weight));
        drawnCoupon = weightedRandomSelection(selectedCoupons, luckyDrawEmptyWeight, luckyDrawEmptyText);
        // let finalIndex = 
        //   console.log({ weights, finalIndex })
        // drawnCoupon = selectedCoupons[finalIndex] || { name: luckyDrawEmptyText, weight: luckyDrawEmptyWeight, isEmpty: true };
        if (!drawnCoupon.isEmpty) {
          await prisma.couponConfig.update({
            where: { id: drawnCoupon.id },
            data: { quantity: drawnCoupon.quantity - 1 },
          });
        }
        break;

      default:
        return new Response(JSON.stringify({ error: 'Invalid type' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
    }

    // Return the response only once
    return new Response(JSON.stringify({ drawnCoupon }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const weightedRandomSelection = (coupons, emptyPrizeWeight, emptyPrizeDisplayText) => {
  if (!coupons.length) {
    return { name: emptyPrizeDisplayText, weight: emptyPrizeWeight, isEmpty: true };
  }

  const totalWeight = coupons.reduce((sum, c) => sum + Number(c.weight), Number(emptyPrizeWeight));
  let randomNum = Math.random() * totalWeight;
  let accumulatedWeight = 0;

  for (const coupon of coupons) {
    accumulatedWeight += Number(coupon.weight);
    if (randomNum < accumulatedWeight) {
      return coupon;
    }
  }

  return { name: emptyPrizeDisplayText, weight: emptyPrizeWeight, isEmpty: true };
};
