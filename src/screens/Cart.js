import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const Cart = ({ cartItems, setCartItems, removeItemFomCart }) => {
  const handleRemoveFomCart = (item) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from cart?',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Remove',
          onPress: () => removeItemFomCart(item),
        },
      ]
    );
  };

  const totalPrice = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * (item.quantity ? item.quantity : 1);
    });
    return total.toLocaleString('en-IN');
  };

  const addQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        if (!item.quantity) {
          item.quantity = 1;
        }
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const removeQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        if (!item.quantity) {
          item.quantity = 1;
        }
        return {
          ...item,
          // dont let quantity go below 1
          quantity: item.quantity > 1 ? item.quantity - 1 : 1,
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  return (
    <ScrollView
      style={{ marginBottom: 90 }}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
    >
      {/* header */}
      <View
        style={{
          padding: 14,
          backgroundColor: 'white',
          elevation: 3,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={styles.cartHeaderText}>My Cart</Text>
          <Text>Total Price - ₹{totalPrice()}</Text>
        </View>
      </View>

      {/* product */}
      {cartItems.length ? (
        <View>
          {cartItems.map((item) => (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                backgroundColor: 'white',
                alignItems: 'center',
                paddingVertical: 10,
              }}
              key={item.id}
            >
              {/* product-image */}
              <View style={{ flex: 2 }}>
                <Image
                  source={{ uri: item.image }}
                  style={{ height: 150, width: 130, resizeMode: 'center' }}
                />
              </View>

              {/* product-details */}
              <View style={{ flex: 3, marginHorizontal: 20 }}>
                {/* name */}
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                  {item.name}
                </Text>

                {/* price */}
                <Text
                  style={{
                    fontSize: 12,
                    color: 'grey',
                    marginTop: 10,
                  }}
                >
                  ₹{item.price}
                </Text>

                {/* quantity */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 8,
                  }}
                >
                  <Text style={{ fontSize: 12 }}>Quantity: </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#512899',
                        paddingVertical: 1,
                        paddingHorizontal: 6,
                        borderRadius: 5,
                      }}
                      onPress={() => addQuantity(item.id)}
                    >
                      <Text style={{ color: 'white' }}>+</Text>
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center' }}>
                      {item.quantity ? item.quantity : 1}
                    </Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#512899',
                        paddingVertical: 1,
                        paddingHorizontal: 6,
                        borderRadius: 5,
                      }}
                      onPress={() => removeQuantity(item.id)}
                    >
                      <Text style={{ color: 'white' }}>-</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* remove from cart */}
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 15,
                    justifyContent: 'center',
                    borderRadius: 5,
                    gap: 8,
                    paddingVertical: 5,
                    backgroundColor: '#353436',
                  }}
                  onPress={() => handleRemoveFomCart(item)}
                >
                  <Icon name='trash' size={18} color='white' />
                  <Text style={{ fontSize: 12, color: 'white' }}>
                    Remove from Cart
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View>
          {/* show center of the page */}
          <Text
            style={{
              textAlign: 'center',
              marginTop: 50,
              fontSize: 16,
            }}
          >
            No items in cart
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cartHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    paddingRight: 25,
  },
});

export default Cart;
