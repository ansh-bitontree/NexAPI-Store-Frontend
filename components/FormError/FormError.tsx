interface FormErrorProps {
  message?: string;
}

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return <p className="form-error">{message}</p>;
};

export default FormError;
