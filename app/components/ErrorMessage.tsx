type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <p role="alert" className="text-body text-red">
    {message}
  </p>
);

export default ErrorMessage;
