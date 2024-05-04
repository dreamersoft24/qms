import React, { useState } from "react";
import DatePicker from 'react-date-picker';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const DatePIcker = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div>
      <DatePicker onChange={()=>onChange} value={value} />
    </div>
  );
};

export default DatePicker;
