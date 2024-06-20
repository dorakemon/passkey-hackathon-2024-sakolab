import QRCodeComponent from "react-qr-code";

type QRCodeProps = {
  value: string;
  width: number;
  height: number;
};

export const QRCode = ({ value, width, height }: QRCodeProps) => {
  return <QRCodeComponent value={value} width={width} height={height} />;
};
