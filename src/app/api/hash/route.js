// editor/src/app/api/hash/route.js
const ALLOW_WRITE = process.env.ALLOW_WRITE === 'true';
import { randomBytes } from 'crypto';
import prisma from '../../../../prisma/client';
// 让代码同时兼容 prisma.couponConfig 和 prisma.coupon_config
const couponModel = () => prisma.couponConfig ?? prisma.coupon_config;
// 同理，如果你有用到 draw log，兼容两种命名
const drawLogModel = () => prisma.drawLog ?? prisma.draw_log;

// POST：前端现在用的是 POST；只读模式下我们把它当“读取”来处理，避免 500。
export async function POST(request) {
  try {
    const body = await request.json();
    const { key, value, selectedCoupons = [], restaurantId, preview } = body || {};

    // ===== 只读模式：直接查现有记录并返回，不做任何写库 =====
    if (!ALLOW_WRITE) {
      if (!key) {
        return new Response(JSON.stringify({ error: 'Read-only mode: key is required.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      const hash = await prisma.hash.findUnique({ where: { key } });
      if (!hash) {
        return new Response(JSON.stringify({ error: 'Not found (read-only mode).' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      const coupons = await prisma.couponConfig.findMany({ where: { hashId: key } });
      const sortedCoupons = coupons.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      const valueObj = typeof hash.value === 'string' ? JSON.parse(hash.value) : hash.value;
      return new Response(JSON.stringify({ ...hash, coupons: sortedCoupons, value: valueObj }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // ===== 可写模式：创建/更新 =====
    if (!value) {
      return new Response(JSON.stringify({ error: 'Value is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 生成唯一 key
    let hashKey;
    for (;;) {
      hashKey = randomBytes(12).toString('hex');
      const exists = await prisma.hash.findUnique({ where: { key: hashKey } });
      if (!exists) break;
    }

    // 类型对齐：value 是 Json；preview 在库里是 String；restaurantId 是 UUID 字符串
    const valueObj = typeof value === 'string' ? JSON.parse(value) : value;
    const previewStr = preview == null ? null : String(preview);
    const restaurantIdStr = restaurantId ? String(restaurantId) : null;

    const hash = await prisma.hash.create({
      data: { key: hashKey, value: valueObj, restaurantId: restaurantIdStr, preview: previewStr },
    });

    if (selectedCoupons.length) {
      const data = selectedCoupons.map(({ id, ...coupon }) => ({
        ...coupon,
        weight: Number(coupon.weight) || 0,
        quantity: Number(coupon.quantity) || 0,
        hashId: hashKey,
      }));
      await prisma.couponConfig.createMany({ data });
    }

    return new Response(JSON.stringify(hash), {
      status: 201,
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

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (!key) {
      return new Response(JSON.stringify({ error: 'Key is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const hash = await prisma.hash.findUnique({ where: { key } });
    if (!hash) {
      return new Response(JSON.stringify({ error: 'Key not found.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 兼容 prisma.couponConfig 与 prisma.coupon_config
    const model = prisma.couponConfig ?? prisma.coupon_config;
    if (!model) {
      console.error('Prisma client has neither couponConfig nor coupon_config.');
      return new Response(JSON.stringify({ error: 'Coupon model not found in Prisma client' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const coupons = await model.findMany({ where: { hashId: key } });

    // 你的表里没有 order 字段时兜底
    const sortedCoupons = (coupons || []).sort(
      (a, b) => ((a && a.order != null ? a.order : 0) - (b && b.order != null ? b.order : 0))
    );

    // value 在库里是 Json：如果已经是对象就不要再 JSON.parse
    const valueObj = typeof hash.value === 'string' ? JSON.parse(hash.value) : hash.value;

    return new Response(JSON.stringify({ ...hash, coupons: sortedCoupons, value: valueObj }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('GET /api/hash error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
// const ALLOW_WRITE = process.env.ALLOW_WRITE === 'true';
// import { randomBytes } from 'crypto';
// import prisma from '../../../../prisma/client';
//
// export async function POST(request) {
//   const body = await request.json();
//   const { value, selectedCoupons, restaurantId, preview } = body;
//   if (!value) {
//     return new Response(JSON.stringify({ error: 'Value is required.' }), {
//       status: 400,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
//
//   try {
//     let hashKey;
//     let isUnique = false;
//
//     while (!isUnique) {
//       hashKey = randomBytes(12).toString('hex');
//       const existingHash = await prisma.hash.findUnique({
//         where: { key: hashKey },
//       });
//       if (!existingHash) {
//         isUnique = true;
//       }
//     }
//
//     const serializedValue = JSON.stringify(value);
//
//     const hash = await prisma.hash.create({
//       data: { key: hashKey, value: serializedValue, restaurantId, preview },
//     });
//
//     const updatedCoupons = selectedCoupons.map(({ id, ...coupon }) => ({
//       ...coupon,
//       weight: Number(coupon.weight),
//       quantity: Number(coupon.quantity),
//       hashId: hashKey,
//     }));
//
//     await prisma.couponConfig.createMany({
//       data: updatedCoupons,
//     });
//
//     return new Response(JSON.stringify(hash), {
//       status: 201,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }
//
// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const key = searchParams.get('key');
//
//   if (!key) {
//     return new Response(JSON.stringify({ error: 'Key is required.' }), {
//       status: 400,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
//
//   try {
//     const hash = await prisma.hash.findUnique({ where: { key } });
//     const coupons = await prisma.couponConfig.findMany({ where: { hashId: key } });
//     const sortedCoupons = coupons.sort((a, b) => a.order - b.order);
//     if (!hash) {
//       return new Response(JSON.stringify({ error: 'Key not found.' }), {
//         status: 404,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }
//
//     const deserializedValue = JSON.parse(hash.value);
//
//     return new Response(JSON.stringify({ ...hash, coupons: sortedCoupons, value: deserializedValue }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }
