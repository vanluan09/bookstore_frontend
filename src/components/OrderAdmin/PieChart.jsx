import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { convertPrice } from '../../utils';

const BarChartComponent = (props) => {
  
  const monthlyRevenue = {};
  props.data.forEach(order => {
    const orderDate = new Date(order.createdAt);
    const month = orderDate.getMonth() + 1; // Lấy tháng từ ngày tạo đơn
    const year = orderDate.getFullYear(); // Lấy năm từ ngày tạo đơn
    const monthYear = `${month}/${year}`; // Kết hợp tháng và năm để tạo khóa
    monthlyRevenue[monthYear] = (monthlyRevenue[monthYear] || 0) + order.totalPrice; // Tính tổng doanh thu của tháng đó
  });

  // Chuyển đổi dữ liệu thành mảng các đối tượng thể hiện doanh thu hàng tháng
  const data = Object.keys(monthlyRevenue).map(monthYear => {
    const [month, year] = monthYear.split('/'); // Tách tháng và năm từ khóa
    return {
      month: `Tháng ${month}/${year}`,
      value: monthlyRevenue[monthYear],
      formattedValue: convertPrice(monthlyRevenue[monthYear]), // Chuyển đổi giá trị thành định dạng tiền tệ dễ đọc
    };
  });

  // Tooltip tùy chỉnh để hiển thị giá trị doanh thu dưới dạng định dạng tiền tệ
  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label" style={{fontSize:'18px'}}>{`${label} : ${payload[0].payload.formattedValue}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="90%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="month" tick={{ fontSize: 16 }} />
        <YAxis tick={{ fontSize: 16 }} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" fill="#e59906" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarChartComponent;
