import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './Home';
import Cart from './Cart';
import Profile from './Profile';
import Settings from './Settings';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const handleAddCartItem = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeItemFomCart = (item) => {
    const newCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(newCartItems);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* show screens based on active tabs */}
      {selectedTab === 0 ? (
        <Home cartItems={cartItems} handleAddCartItem={handleAddCartItem} />
      ) : selectedTab === 1 ? (
        <Cart
          cartItems={cartItems}
          setCartItems={setCartItems}
          removeItemFomCart={removeItemFomCart}
        />
      ) : selectedTab === 2 ? (
        <Profile />
      ) : (
        <Settings />
      )}

      {/* bottom tabs */}
      <View style={styles.bottomTabsContainer}>
        <TouchableOpacity style={styles.tabs} onPress={() => setSelectedTab(0)}>
          <Icon
            name='home'
            size={29}
            style={{ color: selectedTab === 0 ? '#512899' : '#353436' }}
          />
          <Text
            style={[
              styles.text,
              {
                color: selectedTab === 0 ? '#512899' : '#353436',
                fontWeight: selectedTab === 0 ? 'bold' : 'normal',
              },
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabs} onPress={() => setSelectedTab(1)}>
          <Icon
            name='shopping-cart'
            size={29}
            style={{ color: selectedTab === 1 ? '#512899' : '#353436' }}
          />
          <Text
            style={[
              styles.text,
              {
                color: selectedTab === 1 ? '#512899' : '#353436',
                fontWeight: selectedTab === 1 ? 'bold' : 'normal',
              },
            ]}
          >
            Cart
          </Text>
          {/* show cart items count */}
          {cartItems.length > 0 && (
            <Text style={styles.cartNumber}>{cartItems.length}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabs} onPress={() => setSelectedTab(2)}>
          <Icon
            name='user'
            size={29}
            style={{ color: selectedTab === 2 ? '#512899' : '#353436' }}
          />
          <Text
            style={[
              styles.text,
              {
                color: selectedTab === 2 ? '#512899' : '#353436',
                fontWeight: selectedTab === 2 ? 'bold' : 'normal',
              },
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabs} onPress={() => setSelectedTab(3)}>
          <Icon
            name='gear'
            size={29}
            style={{ color: selectedTab === 3 ? '#512899' : '#353436' }}
          />
          <Text
            style={[
              styles.text,
              {
                color: selectedTab === 3 ? '#512899' : '#353436',
                fontWeight: selectedTab === 3 ? 'bold' : 'normal',
              },
            ]}
          >
            Settings
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomTabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 12,
  },
  tabs: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
  },
  cartNumber: {
    position: 'absolute',
    top: -6,
    right: -12,
    backgroundColor: 'red',
    borderRadius: 50,
    color: 'white',
    fontSize: 10,
    height: 19,
    width: 19,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
});

export default Dashboard;
