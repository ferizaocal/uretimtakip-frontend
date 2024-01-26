import FabricHistoryResponse from '../dto/Response/FabricHistoryResponse';
import CutSvg from '../svg/CutSvg';

export const goNavigate = (navigation: any, route: any) => {
  navigation.navigate(route as never);
};
export const calculateTax = (price: any, tax: any) => {
  let total = price + (price * tax) / 100;
  return total;
};

export const objectToCheckReturnBoolean = (obj: any) => {
  var result = false;
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'string') {
      if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
        result = true;
      }
    }
    if (typeof obj[key] === 'boolean') {
      if (obj[key] === false) {
        result = true;
      }
    }
  });
  return result;
};
export const getOperationIcon = (operationName: string, h?: any, w?: any) => {
  switch (operationName) {
    case 'Kesim':
      return <CutSvg h={h} w={w} />;
    default:
      break;
  }
};
export const ValidationFields = {
  email: {
    regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },
  password: {
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
  },
};
