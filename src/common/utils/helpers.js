
export const processErrors = (e) => {
  console.log(e);
  
  const errors = Object.values(e?.response?.data?.errors || {});
  const messages = errors.flatMap((group) => group).filter(Boolean);

  if (messages.length > 0) return [...new Set(messages)];

  const fallback =
    e?.response?.data?.errors || e?.response?.data?.message || e?.message || "خطایی رخ داده است";

  return [fallback];
};

export const fileValidate = (file, props) => {
  const errors = [];
  const ext = '.' + file.name.split('.').pop().toLowerCase();
  const is_valid_type = props.accepted.includes(ext);
  const is_valid_size = file.size <= props.max * 1024 * 1024;

  if (!is_valid_size) {
    const message = `${ file.name }: نوع فایل نامعتبر است (${ ext })`;
    errors.push(message);
  }

  if (!is_valid_type) {
    const message = `${ file.name } فایل بیش از (${ props.max }MB) است`;
    errors.push(message);
  }

  return errors;
}

export const generateFileObject = (file) => ({
  name: file.name,
  size: file.size,
  file,
  is_image: file.type.startsWith('image/'),
  preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
});

export const fileSizeFormater = (bytes) => {
  if (bytes < 1024) return bytes + 'B';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + 'KB';
  else return (bytes / 1048576).toFixed(1) + 'MB';
}


export const isEmpty = (obj) => {
  return obj !== null && typeof obj === 'object' && Object.keys(obj).length === 0;
}

export const handleIndex = (index) => {
  const i = index + 1;
  return i < 10 ? `0${i}` : i;
}