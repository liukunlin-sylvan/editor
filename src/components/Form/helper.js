import axios from 'axios';

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

  const goItem = { id: 999, name: 'GO!', order: null }; // Add order field to the GO item

  selectCouponsWithEmptyCoupon.push(
    ...Array(8 - selectedCoupons.length)
      .fill(null)
      .map(() => ({ ...emptyCouponObj }))
  );

  selectCouponsWithEmptyCoupon = shuffleArray(selectCouponsWithEmptyCoupon);

  selectCouponsWithEmptyCoupon.splice(4, 0, goItem);

  selectCouponsWithEmptyCoupon = selectCouponsWithEmptyCoupon.map((coupon, index) => {
    return {
      ...coupon,
      order: index,
    };
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    if (onChange) {
      onChange(data.imageUrl);
    }
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};


export const createGame = async (payload, type) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hash`,
      payload
    );

    if (data?.key) {
      const previewUrl = `${process.env.NEXT_PUBLIC_GAME_URL}/${type}?key=${encodeURIComponent(data.key)}`;
      window.open(previewUrl, '_blank'); // Opens the URL in a new tab/window
    } else {
      console.error('Key not found in response');
    }
  } catch (error) {
    console.error('Error fetching preview key:', error);
  }
};