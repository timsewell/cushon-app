import { Fund } from '../../api/types';
import { FundDescriptionProps } from './FundDescription.types';

export const FundDescription: React.FC<FundDescriptionProps> = ({
  fund,
  multiple,
}) => {
  const introduction: Fund = {
    name: 'NatWest Cushon Fund Investment Selector',
    id: 0,
    description: multiple
      ? 'You can use this tool to select funds and register your desired investment level in each.'
      : 'You can use this tool to select a fund and register your desired investment level.',
  };

  const content = fund ?? introduction;
  const { name, description } = content;

  return (
    <div className='fund-description'>
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
};
