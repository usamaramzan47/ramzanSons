import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchOrderDetailById } from '../../features/orders/orderDetailSlice'
import { useDispatch, useSelector } from "react-redux";
import useNetworkStatus from "../../hooks/useNetworkStatus";
import ListLoading from "../../components/global/loading/ListLoading";
import { toast } from "react-toastify";
function OrderDetail() {

    const location = useLocation();
    const orderId = location.state?.orderId;
    const dispatch = useDispatch();
    const isOnline = useNetworkStatus();
    const orderDetail = useSelector((state) => state.orderDetail.ordersDetailData);
    const orderDetailStatus = useSelector((state) => state.orderDetail.status);
    const orderDetailError = useSelector((state) => state.orderDetail.error);

    useEffect(() => {
        if (isOnline) {
            dispatch(fetchOrderDetailById({ orderId: orderId }));
        }
    }, [dispatch, isOnline, orderId])


    if (orderDetailStatus === 'loading') {
        <ListLoading />
    }

    if (orderDetailError !== '') {
        toast.error(orderDetailError);
    }
    console.log(orderDetail, 'order Detail')
    return (
        <div>
            <span>abcdef</span>
            {orderDetail?.map((order, index) => {
                <div key={index} className="wrap">
                    <span>abc</span>
                    < span >{order.shop_name}</span>
                </div>
            })
            }
        </div >
    )
}

export default OrderDetail
