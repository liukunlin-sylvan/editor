import axios from 'axios';

// ========= 新增：集中使用的环境变量 =========
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;   // 例: http://localhost:3000
const GAME_URL    = process.env.NEXT_PUBLIC_GAME_URL;      // 例: http://localhost:5173
const READ_ONLY   = process.env.NEXT_PUBLIC_ALLOW_WRITE !== 'true';
const DEFAULT_KEY = process.env.NEXT_PUBLIC_DEFAULT_KEY || '';

export const luckyDrawFactory = ({
                                   selectedCoupons,
                                   emptyLogo,
                                   emptyPrizeWeight,
                                   emptyPrizeDisplayText
                                 }) => {
  let selectCouponsWithEmptyCoupon = [...selectedCoupons];
  const emptyCouponObj = {
    id: 99,
    name: emptyPrizeDisplayText,
    validDate: null,
    img: emptyLogo,
    isEmpty: true,
    weight: emptyPrizeWeight,
    order: null,
  };

  const goItem = { id: 999, name: 'GO!', order: null };

  selectCouponsWithEmptyCoupon.push(
    ...Array(8 - selectedCoupons.length)
      .fill(null)
      .map(() => ({ ...emptyCouponObj }))
  );

  selectCouponsWithEmptyCoupon = shuffleArray(selectCouponsWithEmptyCoupon);
  selectCouponsWithEmptyCoupon.splice(4, 0, goItem);

  selectCouponsWithEmptyCoupon = selectCouponsWithEmptyCoupon.map((coupon, index) => {
    return { ...coupon, order: index };
  });
  return selectCouponsWithEmptyCoupon;
};

const shuffleArray = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

export const imageUpload = async (e, onChange) => {
  const selectedFile = e.target.files[0];
  if (!selectedFile) return;

  const formData = new FormData();
  formData.append('file', selectedFile);

  try {
    const { data } = await axios.post(
      `${BACKEND_URL}/api/upload`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    onChange?.(data.imageUrl);
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};

/**
 * 创建或预览游戏：
 * - 只读模式(READ_ONLY=true)：不写库，使用已有 key 打开预览
 *   key 来源：优先取 createGame 的第三个参数，其次取 payload.key，再次取 .env 里 DEFAULT_KEY
 *   （会先用 GET /api/hash?key=... 校验 key 是否存在）
 * - 可写模式：POST /api/hash 创建，后端返回新 key，再打开预览
 */
export const createGame = async (payload, type, keyFromUI) => {
  try {
    if (READ_ONLY) {
      const key = keyFromUI || payload?.key || DEFAULT_KEY;
      if (!key) {
        alert('只读模式需要提供一个有效的 key（可在 .env 里设置 NEXT_PUBLIC_DEFAULT_KEY）');
        return;
      }

      // 可选：校验 key 是否存在
      try {
        await axios.get(`${BACKEND_URL}/api/hash`, { params: { key } });
      } catch (e) {
        alert('该 key 在数据库里不存在，请换一个有效 key');
        return;
      }

      const previewUrl = `${GAME_URL}/${type}?key=${encodeURIComponent(key)}`;
      window.open(previewUrl, '_blank');
      return;
    }

    // 可写模式：正常创建
    const { data } = await axios.post(`${BACKEND_URL}/api/hash`, payload);
    if (data?.key) {
      const previewUrl = `${GAME_URL}/${type}?key=${encodeURIComponent(data.key)}`;
      window.open(previewUrl, '_blank');
    } else {
      console.error('Key not found in response');
    }
  } catch (error) {
    console.error('Error creating/fetching preview key:', error);
  }
};

// import axios from 'axios';
//
// export const luckyDrawFactory = ({
//   selectedCoupons,
//   emptyLogo,
//   emptyPrizeWeight,
//   emptyPrizeDisplayText
// }) => {
//
//   let selectCouponsWithEmptyCoupon = [...selectedCoupons];
//   const emptyCouponObj = {
//     id: 99,
//     name: emptyPrizeDisplayText,
//     validDate: null,
//     img: emptyLogo,
//     isEmpty: true,
//     weight: emptyPrizeWeight,
//     order: null,
//   };
//
//   const goItem = { id: 999, name: 'GO!', order: null }; // Add order field to the GO item
//
//   selectCouponsWithEmptyCoupon.push(
//     ...Array(8 - selectedCoupons.length)
//       .fill(null)
//       .map(() => ({ ...emptyCouponObj }))
//   );
//
//   selectCouponsWithEmptyCoupon = shuffleArray(selectCouponsWithEmptyCoupon);
//
//   selectCouponsWithEmptyCoupon.splice(4, 0, goItem);
//
//   selectCouponsWithEmptyCoupon = selectCouponsWithEmptyCoupon.map((coupon, index) => {
//     return {
//       ...coupon,
//       order: index,
//     };
//   });
//   return selectCouponsWithEmptyCoupon;
// };
//
//
// const shuffleArray = (array) => {
//   return array
//     .map((value) => ({ value, sort: Math.random() }))
//     .sort((a, b) => a.sort - b.sort)
//     .map(({ value }) => value);
// };
//
// export const imageUpload = async (e, onChange) => {
//   const selectedFile = e.target.files[0];
//   if (!selectedFile) return;
//
//   const formData = new FormData();
//   formData.append('file', selectedFile);
//
//   try {
//     const { data } = await axios.post(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload`,
//       formData,
//       {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       }
//     );
//
//     if (onChange) {
//       onChange(data.imageUrl);
//     }
//   } catch (error) {
//     console.error('Error uploading image:', error);
//   }
// };
//
//
// export const createGame = async (payload, type) => {
//   try {
//     const { data } = await axios.post(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hash`,
//       payload
//     );
//
//     if (data?.key) {
//       const previewUrl = `${process.env.NEXT_PUBLIC_GAME_URL}/${type}?key=${encodeURIComponent(data.key)}`;
//       window.open(previewUrl, '_blank'); // Opens the URL in a new tab/window
//     } else {
//       console.error('Key not found in response');
//     }
//   } catch (error) {
//     console.error('Error fetching preview key:', error);
//   }
// };