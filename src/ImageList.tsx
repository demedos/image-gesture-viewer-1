import { FlatList, ListRenderItemInfo, useWindowDimensions } from 'react-native';
import React from 'react';
import Image from './Image';

type ImageListProps = {
  sources: string[];
};

const ImageList = (props: ImageListProps) => {
  const { sources } = props;
  const { width, height } = useWindowDimensions();

  const renderItem = ({ item }: ListRenderItemInfo<string>) => {
    return <Image uri={item} width={width} height={height} />;
  };

  return <FlatList data={sources} renderItem={renderItem} horizontal={true} snapToAlignment="center" pagingEnabled={true} />;
};

export default ImageList;
