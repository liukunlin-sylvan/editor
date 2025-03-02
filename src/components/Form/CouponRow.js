import React from 'react'
import styled from 'styled-components';
export default function CouponRow({ isSelected, coupon, selectedCoupon, handleWeightChange, handleQuantityChange, toggleCouponSelection }) {

    return (
        <div key={coupon.id} className="flex gap-[20px] items-center">
            <Coupon
                isSelected={isSelected}
                onClick={() => toggleCouponSelection(coupon)}
            >
                <div className="w-[100px]">
                    <img src={coupon.img} alt={coupon.name} />
                </div>
                <h1>{coupon.name}</h1>
            </Coupon>
            {isSelected && (
                <div className="flex gap-[20px] text-xs items-center">
                    <div className='flex gap-[10px] items-center'>
                        <label>Weight</label>
                        <input
                            type="number"
                            value={selectedCoupon.weight ?? 0}
                            onChange={(e) =>
                                handleWeightChange(coupon.id, e.target.value)
                            }
                            className="w-[70px] h-[30px] border border-gray-300 rounded-md p-2"
                            min={0}
                        />
                    </div>
                    <div className='flex gap-[10px] items-center'>
                        <label>Quantity</label>
                        <input
                            type="number"
                            value={selectedCoupon.quantity ?? 0}
                            onChange={(e) =>
                                handleQuantityChange(coupon.id, e.target.value)
                            }
                            className="w-[70px] h-[30px] border border-gray-300 rounded-md p-2"
                            min={0}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

const Coupon = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isSelected',
})`
    display: flex;
    gap: 20px;
    background: ${(props) => (props.isSelected ? '#87CEEB' : '#F7F8FA')};
    border-radius: 10px;
    align-items: start;
    cursor: pointer;
    border: 1px solid #e5e7eb;
    width: 50%;
  `;

