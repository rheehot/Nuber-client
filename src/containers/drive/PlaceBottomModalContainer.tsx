import React from 'react';
import { useSelector } from 'react-redux';
import PlaceBottomModal from '../../components/drive/PlaceBottomModal';
import { RootState } from '../../modules';

interface PlaceBottomModalContainerProps {}
const PlaceBottomModalContainer: React.FC<PlaceBottomModalContainerProps> = () => {
  const { address } = useSelector((state: RootState) => state.place);
  return <PlaceBottomModal visible={!!address} address={address} />;
};

export default PlaceBottomModalContainer;
