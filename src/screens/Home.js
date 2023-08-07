import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { bannerImage, products } from '../SampleData';

const { width: screenWidth } = Dimensions.get('window'); // Get the screen width

const Home = ({ handleAddCartItem, cartItems }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const [data, setData] = useState([]);

  const handleAutoSlide = () => {
    const newIndex = (currentIndex + 1) % bannerImage.length;
    setCurrentIndex(newIndex);
    flatListRef.current.scrollToIndex({ animated: true, index: newIndex });
  };

  useEffect(() => {
    const timer = setTimeout(handleAutoSlide, 2500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const renderItem = ({ item }) => (
    <View style={[styles.bannerContainer, { width: screenWidth }]}>
      <Image source={item.image} style={styles.bannerImage} />
    </View>
  );

  const handleAddToCart = (item) => {
    handleAddCartItem(item);
  };

  const addToCartButton = (item) => {
    const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (cartItem) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (selectedTab === 0) {
      setData(products.filter((item) => item.category === 'Electronics'));
    } else if (selectedTab === 1) {
      setData(products.filter((item) => item.category === 'Clothing'));
    } else if (selectedTab === 2) {
      setData(products.filter((item) => item.category === 'Sports'));
    }
  }, [selectedTab]);

  return (
    <View style={{ flex: 1, backgroundColor: '#e9ede8', marginBottom: 70 }}>
      {/* header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 14,
          backgroundColor: 'white',
          elevation: 3,
          alignItems: 'center',
        }}
      >
        <Text style={styles.brandLogo}>ViksCart</Text>
        <Icon name='bars' size={24} />
      </View>

      {/* banner image */}
      <View>
        <FlatList
          ref={flatListRef}
          data={bannerImage}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.floor(
              event.nativeEvent.contentOffset.x /
                event.nativeEvent.layoutMeasurement.width
            );
            setCurrentIndex(newIndex);
          }}
        />
      </View>

      {/* categories tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tabs,
            {
              backgroundColor: selectedTab === 0 ? '#512899' : 'white',
            },
          ]}
          onPress={() => setSelectedTab(0)}
        >
          <Text
            style={[
              styles.tabsText,
              {
                color: selectedTab === 0 ? 'white' : 'black',
              },
            ]}
          >
            Electronics
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabs,
            {
              backgroundColor: selectedTab === 1 ? '#512899' : 'white',
            },
          ]}
          onPress={() => setSelectedTab(1)}
        >
          <Text
            style={[
              styles.tabsText,
              {
                color: selectedTab === 1 ? 'white' : 'black',
              },
            ]}
          >
            Clothing
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabs,
            {
              backgroundColor: selectedTab === 2 ? '#512899' : 'white',
            },
          ]}
          onPress={() => setSelectedTab(2)}
        >
          <Text
            style={[
              styles.tabsText,
              {
                color: selectedTab === 2 ? 'white' : 'black',
              },
            ]}
          >
            Sports
          </Text>
        </TouchableOpacity>
      </View>

      {/* products */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                margin: 10,
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 10,
                elevation: 2,
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  height: 120,
                  width: '100%',
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginTop: 10,
                }}
              >
                {item.name.length > 25
                  ? `${item.name.slice(0, 22)}...`
                  : item.name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: 'grey',
                  marginTop: 10,
                }}
              >
                ₹{item.price}
              </Text>

              {/* add to cart button */}
              <TouchableOpacity
                style={[
                  styles.cartButton,
                  {
                    backgroundColor: addToCartButton(item)
                      ? '#4a4d4b'
                      : '#353436',
                  },
                ]}
                onPress={() => handleAddToCart(item)}
                disabled={addToCartButton(item) ? true : false}
              >
                <Icon name='shopping-cart' size={20} color='white' />
                <Text style={styles.cartText}>
                  {addToCartButton(item) ? 'Added to Cart' : 'Add to Cart'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  brandLogo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  bannerContainer: {
    flex: 1,
  },
  bannerImage: {
    height: 200,
    width: '100%',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 14,
  },
  tabs: {
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  tabsText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  cartButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginTop: 10,
    gap: 10,
    borderRadius: 5,
  },
  cartText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Home;
