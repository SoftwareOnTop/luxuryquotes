import { View, FlatList, StyleSheet, Dimensions, ViewToken } from 'react-native';
import { Colors } from '../../constants/Colors';
import ReelItem from '../../components/ReelItem';
import { useState, useRef } from 'react';

const { height } = Dimensions.get('window');

const DATA = [
  {
    id: '1',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    title: 'The Estate',
    description: 'Morning mist over the family grounds.',
  },
  {
    id: '2',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    title: 'The Journey',
    description: 'Travels through the highlands.',
  },
  {
    id: '3',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    title: 'The Leisure',
    description: 'Afternoon ride.',
  },
];

export default function ReelsScreen() {
  const [activeId, setActiveId] = useState(DATA[0].id);
  
  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setActiveId(viewableItems[0].item.id);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <ReelItem item={item} isActive={item.id === activeId} />
        )}
        keyExtractor={item => item.id}
        pagingEnabled
        vertical
        showsVerticalScrollIndicator={false}
        snapToInterval={height - 80} // Adjust based on tab bar
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.britishRacingGreen,
  },
});
