import { randomBytes } from 'crypto';
import prisma from '../../../../prisma/client';

export async function POST(request) {
  const body = await request.json();
  const { value, selectedCoupons, restaurantId, preview } = body;
  if (!value) {
    return new Response(JSON.stringify({ error: 'Value is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    let hashKey;
    let isUnique = false;

    while (!isUnique) {
      hashKey = randomBytes(12).toString('hex');
      const existingHash = await prisma.hash.findUnique({
        where: { key: hashKey },
      });
      if (!existingHash) {
        isUnique = true;
      }
    }

    const serializedValue = JSON.stringify(value);

    const hash = await prisma.hash.create({
      data: { key: hashKey, value: serializedValue, restaurantId, preview },
    });

    const updatedCoupons = selectedCoupons.map(({ id, ...coupon }) => ({
      ...coupon,
      weight: Number(coupon.weight),
      quantity: Number(coupon.quantity),
      hashId: hashKey,
    }));

    await prisma.couponConfig.createMany({
      data: updatedCoupons,
    });

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
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (!key) {
    return new Response(JSON.stringify({ error: 'Key is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const hash = await prisma.hash.findUnique({ where: { key } });
    const coupons = await prisma.couponConfig.findMany({ where: { hashId: key } });
    const sortedCoupons = coupons.sort((a, b) => a.order - b.order);
    if (!hash) {
      return new Response(JSON.stringify({ error: 'Key not found.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const deserializedValue = JSON.parse(hash.value);

    return new Response(JSON.stringify({ ...hash, coupons: sortedCoupons, value: deserializedValue }), {
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
