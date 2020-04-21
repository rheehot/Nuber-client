import React from 'react';
import PlaceBottomModal from '../../components/drive/PlaceBottomModal';

interface PlaceBottomModalContainerProps {}
const PlaceBottomModalContainer: React.FC<PlaceBottomModalContainerProps> = props => {
  return <PlaceBottomModal visible={false} />;
};

export default PlaceBottomModalContainer;
