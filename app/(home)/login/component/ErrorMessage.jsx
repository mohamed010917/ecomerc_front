export default function ErrorMessage({ message }) {
    return message ? <p className="text-red-500 text-sm mt-1">{message}</p> : null;
  }
  